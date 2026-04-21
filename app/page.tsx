'use client';

import { useState } from 'react';
import { Home, Briefcase, RefreshCcw, Flame, Clock, Search, DollarSign, Landmark, Users, Info, AlertTriangle, Check } from 'lucide-react';

export default function LandingPage() {
	const [status, setStatus] = useState<{ message: string; type: 'idle' | 'loading' | 'success' | 'error' }>({ message: '', type: 'idle' });
	const [showContent, setShowContent] = useState(false);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setStatus({ message: 'A enviar os seus dados...', type: 'loading' });

		const formData = new FormData(e.currentTarget);
		const payload = Object.fromEntries(formData.entries());

		try {
			const res = await fetch('/api/send-form', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});
			const result = await res.json();

			if (!res.ok) {
				throw new Error(result.error || 'Não foi possível enviar o formulário.');
			}
			setStatus({ message: 'Obrigado! Recebemos a sua candidatura. A nossa equipa entrará em contacto em breve.', type: 'success' });
			(e.target as HTMLFormElement).reset();
		} catch (error: any) {
			setStatus({ message: error.message || 'Ocorreu um erro ao enviar. Tente novamente.', type: 'error' });
		}
	}

	return (
		<div className="font-outfit bg-[#050505] text-white min-h-screen overflow-x-hidden">
			<header className="relative min-h-screen flex items-center justify-center hero-bg border-b border-white/10">
				<div className="absolute inset-0 luxury-gradient"></div>
				<div className="container mx-auto px-6 relative z-10 text-center animate-fade-in">
					<span className="text-[#C5A059] uppercase tracking-[0.3em] text-sm font-semibold mb-6 block">
						Exclusividade em Luanda
					</span>
					<h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
						Se procura conforto, segurança e um <span className="text-[#C5A059]">investimento sólido</span>
					</h1>
					<p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-light">
						Esta oportunidade em Luanda foi feita para si. Descubra a vivenda dos seus sonhos.
					</p>
					<a href="#form"
						onClick={(e) => {
							e.preventDefault();
							setShowContent(true);
							setTimeout(() => {
								document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
							}, 100);
						}}
						className="inline-block bg-[#C5A059] text-black px-12 py-5 rounded-full font-bold text-lg hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-[#C5A059]/20">
						Verificar Qualificação
					</a>
				</div>
			</header>

			{showContent && (
				<div className="animate-fade-in">
					<section id="form" className="py-24 relative overflow-hidden bg-[#0A0A0A]">
						<div className="container mx-auto px-6 max-w-4xl">
					<div className="text-center mb-16 animate-slide-up">
						<h2 className="text-3xl md:text-5xl font-bold mb-4">Primeiro Passo</h2>
						<p className="text-gray-400 text-lg">Antes de continuar, precisamos garantir que esta vivenda faz sentido para si.</p>
						<p className="text-[#C5A059] font-medium mt-4">Preencha as informações abaixo e veja se está qualificado para agendar uma visita.</p>
					</div>

					<div className="glass p-8 md:p-12 rounded-[2rem] shadow-2xl animate-slide-up">
						<form id="lead-form" className="space-y-8" onSubmit={handleSubmit}>
							<div className="grid md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<label className="text-sm uppercase tracking-wider text-gray-500 font-semibold" htmlFor="name">Nome completo</label>
									<input type="text" id="name" name="name" placeholder="Seu nome completo"
										className="w-full px-6 py-4 rounded-xl focus:ring-[#C5A059]" required />
								</div>
								<div className="space-y-2">
									<label className="text-sm uppercase tracking-wider text-gray-500 font-semibold" htmlFor="phone">Número de telefone (WhatsApp)</label>
									<input type="tel" id="phone" name="phone" placeholder="+244 000 000 000"
										className="w-full px-6 py-4 rounded-xl focus:ring-[#C5A059]" required />
								</div>
							</div>

							<div className="space-y-2">
								<label className="text-sm uppercase tracking-wider text-gray-500 font-semibold" htmlFor="email">E-mail</label>
								<input type="email" id="email" name="email" placeholder="seu-email@exemplo.com"
									className="w-full px-6 py-4 rounded-xl focus:ring-[#C5A059]" required />
							</div>

							<div className="space-y-4 pt-6 border-t border-white/5">
								<label className="text-lg font-semibold block">1. Qual é o seu principal objectivo com esta vivenda?</label>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									<label className="flex items-center p-4 glass rounded-xl cursor-pointer hover:border-[#C5A059] transition-all group">
										<input type="radio" name="goal" value="morar" className="w-5 h-5 accent-[#C5A059] mr-3" required />
										<span className="group-hover:text-[#C5A059] flex items-center gap-2">
											<Home className="text-[#C5A059] w-5 h-5" /> Morar
										</span>
									</label>
									<label className="flex items-center p-4 glass rounded-xl cursor-pointer hover:border-[#C5A059] transition-all group">
										<input type="radio" name="goal" value="investimento" className="w-5 h-5 accent-[#C5A059] mr-3" />
										<span className="group-hover:text-[#C5A059] flex items-center gap-2">
											<Briefcase className="text-[#C5A059] w-5 h-5" /> Investimento
										</span>
									</label>
									<label className="flex items-center p-4 glass rounded-xl cursor-pointer hover:border-[#C5A059] transition-all group">
										<input type="radio" name="goal" value="avaliar" className="w-5 h-5 accent-[#C5A059] mr-3" />
										<span className="group-hover:text-[#C5A059] flex items-center gap-2">
											<RefreshCcw className="text-[#C5A059] w-5 h-5" /> Avaliar opções
										</span>
									</label>
								</div>
							</div>

							<div className="space-y-4 pt-6 border-t border-white/5">
								<label className="text-lg font-semibold block">2. Em que fase está a sua decisão de compra?</label>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									<label className="flex items-center p-4 glass rounded-xl cursor-pointer hover:border-[#C5A059] transition-all group">
										<input type="radio" name="phase" value="pronto" className="w-5 h-5 accent-[#C5A059] mr-3" required />
										<span className="group-hover:text-[#C5A059] flex items-center gap-2">
											<Flame className="text-[#C5A059] w-5 h-5" /> Pronto (0–30 dias)
										</span>
									</label>
									<label className="flex items-center p-4 glass rounded-xl cursor-pointer hover:border-[#C5A059] transition-all group">
										<input type="radio" name="phase" value="decidir" className="w-5 h-5 accent-[#C5A059] mr-3" />
										<span className="group-hover:text-[#C5A059] flex items-center gap-2">
											<Clock className="text-[#C5A059] w-5 h-5" /> Decidir (1–3 meses)
										</span>
									</label>
									<label className="flex items-center p-4 glass rounded-xl cursor-pointer hover:border-[#C5A059] transition-all group">
										<input type="radio" name="phase" value="a pesquisar" className="w-5 h-5 accent-[#C5A059] mr-3" />
										<span className="group-hover:text-[#C5A059] flex items-center gap-2">
											<Search className="text-[#C5A059] w-5 h-5" /> Só a pesquisar
										</span>
									</label>
								</div>
							</div>

							<div className="space-y-4 pt-6 border-t border-white/5">
								<label className="text-lg font-semibold block">3. Qual é a sua forma de pagamento?</label>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									<label className="flex items-center p-4 glass rounded-xl cursor-pointer hover:border-[#C5A059] transition-all group">
										<input type="radio" name="payment" value="pronto" required className="w-5 h-5 accent-[#C5A059] mr-3" />
										<span className="group-hover:text-[#C5A059] flex items-center gap-2">
											<DollarSign className="text-[#C5A059] w-5 h-5" /> Pronto pagamento
										</span>
									</label>
									<label className="flex items-center p-4 glass rounded-xl cursor-pointer hover:border-[#C5A059] transition-all group">
										<input type="radio" name="payment" value="credito bancário" className="w-5 h-5 accent-[#C5A059] mr-3" />
										<span className="group-hover:text-[#C5A059] flex items-center gap-2">
											<Landmark className="text-[#C5A059] w-5 h-5" /> Crédito bancário
										</span>
									</label>
									<label className="flex items-center p-4 glass rounded-xl cursor-pointer hover:border-[#C5A059] transition-all group">
										<input type="radio" name="payment" value="a organizar" className="w-5 h-5 accent-[#C5A059] mr-3" />
										<span className="group-hover:text-[#C5A059] flex items-center gap-2">
											<Users className="text-[#C5A059] w-5 h-5" /> A organizar
										</span>
									</label>
								</div>
							</div>

							<div className="space-y-4 pt-6 border-t border-white/5">
								<label className="text-lg font-semibold block">4. Gostaria de agendar uma visita à vivenda?</label>
								<select id="schedule" name="schedule" className="w-full px-6 py-4 rounded-xl focus:ring-[#C5A059] cursor-pointer" required>
									<option value="sim">Sim, quero agendar visita</option>
									<option value="falar com consultor">Quero falar primeiro com um consultor</option>
									<option value="ainda não">Ainda não</option>
								</select>
								<p className="text-xs text-gray-500 mt-2 flex items-center gap-1 italic">
									<Info className="w-3 h-3" /> Selecione a opção que melhor se adapta a si.
								</p>
							</div>

							<div className="pt-8">
								<button type="submit" disabled={status.type === 'loading'}
									className="w-full bg-[#C5A059] text-black py-6 rounded-xl font-bold text-xl hover:bg-white transition-all shadow-xl shadow-[#C5A059]/20 disabled:opacity-70 disabled:cursor-not-allowed">
									Enviar e Verificar Qualificação
								</button>
								{status.message && (
									<p className={`text-sm mt-4 ${status.type === 'success' ? 'text-green-400' : status.type === 'error' ? 'text-red-400' : 'text-gray-400'}`} aria-live="polite">
										{status.message}
									</p>
								)}
							</div>

							<div className="mt-8 p-4 bg-red-900/20 border border-red-500/20 rounded-xl">
								<p className="text-red-400 text-sm flex items-start">
									<AlertTriangle className="mr-2 flex-shrink-0 mt-0.5 w-4 h-4" />
									<span>Esta vivenda pode ser vendida a qualquer momento. Estamos a priorizar apenas contactos de pessoas realmente interessadas.</span>
								</p>
							</div>
						</form>
					</div>
				</div>
			</section>

			<section className="py-24 bg-black">
				<div className="container mx-auto px-6">
					<div className="grid md:grid-cols-2 gap-12 items-center">
						<div className="animate-slide-up">
							<h3 className="text-3xl font-bold mb-6">Excelência em Luanda</h3>
							<p className="text-gray-400 mb-8 max-w-lg leading-relaxed">
								A nossa equipa irá analisar as suas respostas e, caso esteja qualificado, entraremos em contacto nas próximas horas para dar seguimento. Garantimos total discrição e o melhor acompanhamento para o seu próximo grande investimento.
							</p>
							<div className="glass p-6 rounded-2xl flex items-center space-x-4">
								<div className="w-12 h-12 bg-[#C5A059]/20 rounded-full flex items-center justify-center">
									<Check className="text-[#C5A059] w-6 h-6" />
								</div>
								<div>
									<p className="font-bold">Interesse Priorizado</p>
									<p className="text-sm text-gray-500">Contactos analisados em até 24h</p>
								</div>
							</div>
						</div>
						<div className="relative group">
							<div className="absolute inset-0 bg-[#C5A059]/10 blur-3xl rounded-full group-hover:bg-[#C5A059]/20 transition-all"></div>
							<div className="relative z-10 rounded-[2rem] shadow-2xl border border-white/10 p-10 glass min-h-[280px] flex items-center justify-center text-center">
								<p className="text-gray-300 leading-relaxed">
									Atendimento premium para apresentar cada detalhe da propriedade, esclarecer condicoes de compra e acompanhar todo o processo com transparência.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<footer className="py-12 border-t border-white/5 text-center bg-[#0A0A0A]">
				<p className="text-gray-600 text-sm">
					© 2026 Caxinda Divulga - Todos os direitos reservados.<br />
					Obrigado pelo seu interesse!
				</p>
			</footer>
				</div>
			)}
		</div>
	);
}
