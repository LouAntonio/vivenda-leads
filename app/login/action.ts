'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { createSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function loginAction(email: string, password: string): Promise<{ error?: string } | undefined> {
    if (!email || !password) {
        return { error: 'Por favor, preencha todos os campos.' };
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || !user.passwordHash) {
            return { error: 'As credenciais estão incorretas.' };
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);

        if (!isValid) {
            return { error: 'As credenciais estão incorretas.' };
        }

        await createSession(user.id);
        
        // Update lastLogin
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() }
        });

    } catch (err) {
        console.error('Login error:', err);
        return { error: 'Ocorreu um erro no servidor. Tente mais tarde.' };
    }

    redirect('/dashboard');
}
