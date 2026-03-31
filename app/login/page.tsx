'use client';

import { useState } from 'react';
import { loginAction } from './action';
import { Lock, User } from 'lucide-react';

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const result = await loginAction(email, password);
            if (result?.error) {
                setError(result.error);
                setLoading(false);
            }
            // If successful, loginAction will redirect
        } catch (err: any) {
            setError(err.message || 'Ocorreu um erro ao tentar fazer login.');
            setLoading(false);
        }
    }

    return (
        <div className="font-outfit bg-[#050505] text-white min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 luxury-gradient pointer-events-none"></div>
            
            <div className="w-full max-w-md p-8 glass rounded-[2rem] shadow-2xl relative z-10 animate-slide-up">
                <div className="text-center mb-8">
                    <span className="text-[#C5A059] uppercase tracking-[0.3em] text-xs font-semibold mb-2 block">
                        Acesso Restrito
                    </span>
                    <h1 className="text-3xl font-bold">Administração</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm uppercase tracking-wider text-gray-500 font-semibold flex items-center gap-2">
                            <User className="w-4 h-4 text-[#C5A059]" /> E-mail
                        </label>
                        <input type="email" name="email" required
                            className="w-full px-6 py-4 rounded-xl bg-[rgba(255,255,255,0.05)] border border-white/10 focus:ring-[#C5A059] focus:border-[#C5A059] text-white placeholder-gray-500"
                            placeholder="Seu email de acesso" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm uppercase tracking-wider text-gray-500 font-semibold flex items-center gap-2">
                            <Lock className="w-4 h-4 text-[#C5A059]" /> Palavra-passe
                        </label>
                        <input type="password" name="password" required
                            className="w-full px-6 py-4 rounded-xl bg-[rgba(255,255,255,0.05)] border border-white/10 focus:ring-[#C5A059] focus:border-[#C5A059] text-white placeholder-gray-500"
                            placeholder="Sua palavra-passe" />
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm text-center bg-red-900/20 p-3 rounded-lg border border-red-500/20">
                            {error}
                        </p>
                    )}

                    <button type="submit" disabled={loading}
                        className="w-full bg-[#C5A059] text-black py-4 rounded-xl font-bold text-lg hover:bg-white transition-all shadow-xl shadow-[#C5A059]/20 disabled:opacity-70 disabled:cursor-not-allowed">
                        {loading ? 'A processar...' : 'Entrar no Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    );
}
