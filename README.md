# 🏡 Vivenda Leads

Sistema de captação e gestão de leads para imóveis de luxo em Luanda, Angola.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)

---

## 📋 Visão Geral

Uma aplicação web completa que combina uma **landing page de alta conversão** com um **painel administrativo protegido** para gerir leads de compradores de vivendas exclusivas em Luanda.

### Funcionalidades

| Módulo | Descrição |
|---|---|
| **Landing Page** | Página de captação com design premium (dark mode, glassmorphism, acentos dourados) e formulário de qualificação |
| **API de Leads** | Endpoint que guarda os dados no PostgreSQL e envia notificação por email via Resend |
| **Dashboard** | Painel protegido com listagem, filtragem e visualização detalhada dos leads |
| **Autenticação** | Sistema de login com JWT + cookies HTTP-only e middleware de proteção de rotas |

---

## 🏗️ Arquitectura

```
vivenda-leads/
├── app/
│   ├── page.tsx                 # Landing page (client component)
│   ├── layout.tsx               # Layout raiz
│   ├── globals.css              # Estilos globais (Tailwind v4)
│   ├── api/
│   │   └── send-form/route.ts   # API Route — salva lead + envia email
│   ├── dashboard/
│   │   ├── page.tsx             # Página do dashboard (server component)
│   │   └── ClientDashboard.tsx  # UI interactiva do dashboard (client component)
│   └── login/
│       ├── page.tsx             # Página de login
│       └── action.ts            # Server action de autenticação
├── lib/
│   ├── prisma.ts                # Instância singleton do Prisma (pg adapter)
│   └── auth.ts                  # Utilitários JWT (jose) + gestão de sessões
├── prisma/
│   ├── schema.prisma            # Modelos: User, Lead
│   └── migrations/              # Migrações da base de dados
├── scripts/
│   └── seed-admin.ts            # Script para criar utilizador administrador
└── proxy.ts                     # Middleware de protecção de rotas
```

---

## ⚙️ Stack Tecnológica

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19 + Tailwind CSS 4 + Lucide Icons
- **Base de Dados:** PostgreSQL (NeonDB) via Prisma 7 + adaptador `pg`
- **Autenticação:** JWT (HS256) com `jose` + `bcryptjs`
- **Email:** Resend API
- **Linguagem:** TypeScript 5

---

## 🚀 Instalação

### Pré-requisitos

- Node.js ≥ 18
- Base de dados PostgreSQL (recomendado: [NeonDB](https://neon.tech))
- Conta [Resend](https://resend.com) para envio de emails

### Passos

```bash
# 1. Clonar o repositório
git clone <url-do-repo>
cd vivenda-leads

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com as suas credenciais (ver secção abaixo)

# 4. Executar migrações da base de dados
npx prisma migrate deploy

# 5. Criar utilizador administrador
npx tsx scripts/seed-admin.ts

# 6. Iniciar o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em **http://localhost:3000**.

---

## 🔐 Variáveis de Ambiente

Criar um ficheiro `.env` na raiz do projecto com as seguintes variáveis:

```env
# Base de Dados
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# Resend (Email)
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL="Leads da Vivenda <no-reply@seudominio.com>"
RESEND_TO_EMAIL=destino@email.com

# Autenticação (opcional — tem valor por defeito)
JWT_SECRET=uma-chave-secreta-forte
```

---

## 📝 Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Iniciar servidor de produção |
| `npm run lint` | Verificar código com ESLint |
| `npx prisma migrate dev` | Criar/aplicar migrações em dev |
| `npx prisma studio` | Interface visual da base de dados |
| `npx tsx scripts/seed-admin.ts` | Criar utilizador administrador |

---

## 🔒 Autenticação

O dashboard é protegido por autenticação baseada em JWT:

1. O middleware (`proxy.ts`) intercepta todas as rotas `/dashboard/*`
2. Verifica a existência de um cookie `session` com um token JWT válido
3. Se não autenticado, redireciona para `/login`
4. Utilizadores autenticados em `/login` são redirecionados para `/dashboard`

Para criar o primeiro administrador, executar o seed script:

```bash
npx tsx scripts/seed-admin.ts
```

---

## 📧 Fluxo de Leads

```
Visitante preenche formulário → POST /api/send-form
                                      │
                              ┌───────┴───────┐
                              │               │
                        Prisma.lead       Resend API
                        .create()        (email HTML)
                              │               │
                              ▼               ▼
                        NeonDB (Lead)    Email de notificação
                              │          para o proprietário
                              ▼
                        Dashboard admin
                        (listagem + filtros)
```

---

## 📄 Licença

© 2026 Caxinda Divulga — Todos os direitos reservados.
