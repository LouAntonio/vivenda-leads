import { prisma } from '@/lib/prisma';
import ClientDashboard from './ClientDashboard';

export const revalidate = 0; // Disable cache so the dashboard always shows fresh leads

export default async function DashboardPage() {
	const leads = await prisma.lead.findMany({
		orderBy: {
			createdAt: 'desc',
		},
	});

	// Next.js components pass Dates weirdly across boundaries sometimes, but stringifying helps if needed
	// Prisma returns Date objects for createdAt, let's map it safely
	const serializedLeads = leads.map((lead: any) => ({
		...lead,
		createdAt: lead.createdAt.toISOString(),
	}));

	return (
		<div className="font-outfit bg-[#050505] text-white flex flex-col min-h-screen">
			<header className="relative border-b border-white/10 hero-bg">
				<div className="absolute inset-0 luxury-gradient pointer-events-none"></div>
				<div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10 w-full flex justify-between items-center">
					<div>
						<span className="text-[#C5A059] uppercase tracking-[0.3em] text-xs font-semibold mb-2 block animate-fade-in">
							Administração
						</span>
						<h1 className="text-3xl font-bold text-white animate-slide-up">Dashboard de Leads</h1>
					</div>
				</div>
			</header>
			<main className="flex-1 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 w-full animate-slide-up relative z-10">
				<ClientDashboard initialLeads={serializedLeads} />
			</main>
		</div>
	);
}
