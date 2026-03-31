import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assumes @/ resolves to root, if not we will fix

const RESEND_URL = "https://api.resend.com/emails";

function escapeHtml(value = "") {
	return String(value)
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
	const apiKey = process.env.RESEND_API_KEY;

	if (!apiKey) {
		return NextResponse.json(
			{ error: "RESEND_API_KEY nao configurada." },
			{ status: 500 },
		);
	}

	let body;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json(
			{ error: "JSON invalido no corpo da requisicao." },
			{ status: 400 },
		);
	}

	const name = String(body.name || "").trim();
	const phone = String(body.phone || "").trim();
	const email = String(body.email || "").trim();
	const goal = String(body.goal || "").trim();
	const phase = String(body.phase || "").trim();
	const payment = String(body.payment || "").trim();
	const schedule = String(body.schedule || "").trim();

	if (!name || !phone || !email || !goal || !phase || !payment || !schedule) {
		return NextResponse.json(
			{ error: "Preencha todos os campos obrigatorios." },
			{ status: 400 },
		);
	}

	// 1. Salvar no Banco de Dados via Prisma
	try {
		await prisma.lead.create({
			data: { name, phone, email, goal, phase, payment, schedule }
		});
	} catch (dbError) {
		console.error("Erro ao salvar lead no Prisma:", dbError);
		return NextResponse.json(
			{ error: "Erro ao salvar os dados no sistema." },
			{ status: 500 }
		);
	}

	// 2. Enviar email via Resend
	const from = process.env.RESEND_FROM_EMAIL || "Leads da Vivenda <no-reply@ecopacks-ao.com>";
	const to = process.env.RESEND_TO_EMAIL || "domum.construcao.moveis@gmail.com";

	const html = `
		<h2>Novo lead recebido</h2>
		<p><strong>Nome:</strong> ${escapeHtml(name)}</p>
		<p><strong>Telefone:</strong> ${escapeHtml(phone)}</p>
		<p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
		<p><strong>Objetivo:</strong> ${escapeHtml(goal)}</p>
		<p><strong>Fase:</strong> ${escapeHtml(phase)}</p>
		<p><strong>Pagamento:</strong> ${escapeHtml(payment)}</p>
		<p><strong>Visita:</strong> ${escapeHtml(schedule)}</p>
  `;

	const resendResponse = await fetch(RESEND_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`,
		},
		body: JSON.stringify({
			from,
			to: [to],
			subject: `Novo lead de Imóvel Luanda: ${name}`,
			html,
		}),
	});

	const resendData = await resendResponse.json().catch(() => ({}));

	if (!resendResponse.ok) {
		console.error("Erro Resend:", resendData);
		return NextResponse.json(
			{
				error: "Falha ao enviar email, tente mais tarde!",
				details: resendData,
			},
			{ status: 502 },
		);
	}

	return NextResponse.json({ ok: true }, { status: 200 });
}
