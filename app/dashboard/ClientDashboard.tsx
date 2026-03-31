'use client';

import { useState } from 'react';
import { Eye, X } from 'lucide-react';

type Lead = {
	id: string;
	name: string;
	phone: string;
	email: string;
	goal: string;
	phase: string;
	payment: string;
	schedule: string;
	createdAt: string;
};

export default function ClientDashboard({ initialLeads }: { initialLeads: Lead[] }) {
	const [leads] = useState<Lead[]>(initialLeads);
	const [filterGoal, setFilterGoal] = useState('');
	const [filterPhase, setFilterPhase] = useState('');
	const [filterPayment, setFilterPayment] = useState('');
	const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

	const filteredLeads = leads.filter(lead => {
		if (filterGoal && lead.goal !== filterGoal) return false;
		if (filterPhase && lead.phase !== filterPhase) return false;
		if (filterPayment && lead.payment !== filterPayment) return false;
		return true;
	});

	return (
		<div className="space-y-8">
			{/* Filters */}
			<div className="glass p-6 md:p-8 rounded-[2rem] shadow-2xl">
				<h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
					<span className="w-8 h-8 rounded-full bg-[#C5A059]/20 flex items-center justify-center">
						<Eye className="w-4 h-4 text-[#C5A059]" />
					</span>
					Filtros de Pesquisa
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="space-y-2">
						<label className="text-sm uppercase tracking-wider text-gray-500 font-semibold block">Objetivo</label>
						<select className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.05)] border border-white/10 text-white focus:ring-[#C5A059] focus:border-[#C5A059] cursor-pointer outline-none"
							value={filterGoal} onChange={e => setFilterGoal(e.target.value)}>
							<option value="">Todos os objectivos</option>
							<option value="morar">Morar</option>
							<option value="investimento">Investimento</option>
							<option value="avaliar">Avaliar opções</option>
						</select>
					</div>
					<div className="space-y-2">
						<label className="text-sm uppercase tracking-wider text-gray-500 font-semibold block">Fase</label>
						<select className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.05)] border border-white/10 text-white focus:ring-[#C5A059] focus:border-[#C5A059] cursor-pointer outline-none"
							value={filterPhase} onChange={e => setFilterPhase(e.target.value)}>
							<option value="">Todas as fases</option>
							<option value="pronto">Pronto (0-30 dias)</option>
							<option value="decidir">Decidir (1-3 meses)</option>
							<option value="a pesquisar">Só a pesquisar</option>
						</select>
					</div>
					<div className="space-y-2">
						<label className="text-sm uppercase tracking-wider text-gray-500 font-semibold block">Pagamento</label>
						<select className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.05)] border border-white/10 text-white focus:ring-[#C5A059] focus:border-[#C5A059] cursor-pointer outline-none"
							value={filterPayment} onChange={e => setFilterPayment(e.target.value)}>
							<option value="">Todas as opções</option>
							<option value="pronto">Pronto pagamento</option>
							<option value="credito bancário">Crédito bancário</option>
							<option value="a organizar">A organizar</option>
						</select>
					</div>
				</div>
			</div>

			{/* Table */}
			<div className="glass rounded-[2rem] shadow-2xl overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-white/10">
						<thead className="bg-[#0A0A0A]/50">
							<tr>
								<th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-500 font-semibold">Nome</th>
								<th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-500 font-semibold">Telefone</th>
								<th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-500 font-semibold">Objetivo</th>
								<th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-500 font-semibold">Fase</th>
								<th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-500 font-semibold">Data</th>
								<th className="px-6 py-4 text-right text-xs uppercase tracking-wider text-gray-500 font-semibold">Ações</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-white/10 text-gray-300">
							{filteredLeads.length === 0 ? (
								<tr>
									<td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
										<p className="text-lg mb-2">Sem resultados</p>
										Nenhum lead encontrado com estes filtros.
									</td>
								</tr>
							) : (
								filteredLeads.map((lead) => (
									<tr key={lead.id} className="hover:bg-white/5 transition-colors">
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{lead.name}</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm">{lead.phone}</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm capitalize">{lead.goal}</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm capitalize">{lead.phase}</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm">
											{new Date(lead.createdAt).toLocaleDateString('pt-PT')}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<button onClick={() => setSelectedLead(lead)} className="text-[#C5A059] hover:text-white transition-colors bg-[#C5A059]/10 p-2 rounded-lg">
												<Eye className="w-5 h-5" />
											</button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* Modal */}
			{selectedLead && (
				<div className="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
					<div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
						<div className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" aria-hidden="true" onClick={() => setSelectedLead(null)}></div>
						<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
						<div className="inline-block align-bottom glass rounded-[2rem] text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full border border-white/10">
							<div className="p-8 text-white relative">
								<button onClick={() => setSelectedLead(null)} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full">
									<X className="w-6 h-6" />
								</button>
								
								<div className="mb-6">
									<h3 className="text-2xl font-bold text-white mb-2" id="modal-title">Detalhes do Contacto</h3>
									<p className="text-[#C5A059] text-sm tracking-wider uppercase">Lead recebida a {new Date(selectedLead.createdAt).toLocaleDateString('pt-PT')}</p>
								</div>
								
								<div className="space-y-6 pt-6 border-t border-white/10">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Nome Completo</p>
											<p className="font-medium text-lg">{selectedLead.name}</p>
										</div>
										<div>
											<p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Telefone / WhatsApp</p>
											<p className="font-medium text-lg">{selectedLead.phone}</p>
										</div>
										<div className="md:col-span-2">
											<p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Email</p>
											<p className="font-medium text-lg">{selectedLead.email}</p>
										</div>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-[#0A0A0A]/50 rounded-xl border border-white/5">
										<div>
											<p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Objetivo</p>
											<p className="font-medium capitalize">{selectedLead.goal}</p>
										</div>
										<div>
											<p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Fase</p>
											<p className="font-medium capitalize">{selectedLead.phase}</p>
										</div>
										<div>
											<p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Pagamento</p>
											<p className="font-medium capitalize">{selectedLead.payment}</p>
										</div>
										<div>
											<p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Interesse em Visita</p>
											<p className="font-medium capitalize">{selectedLead.schedule}</p>
										</div>
									</div>
								</div>
							</div>
							<div className="p-6 bg-[#050505]/50 border-t border-white/10 sm:flex sm:flex-row-reverse">
								<button type="button" onClick={() => setSelectedLead(null)} className="w-full inline-flex justify-center rounded-xl border border-transparent px-6 py-3 bg-[#C5A059] text-base font-bold text-black hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#050505] focus:ring-[#C5A059] sm:ml-3 sm:w-auto sm:text-sm shadow-xl shadow-[#C5A059]/20">
									Fechar Resumo
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
