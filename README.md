# 🏗️ BuildControl

**Gestão Inteligente de Orçamento de Obras Residenciais**

---

## 📋 Sobre

BuildControl é uma web application elegante e intuitiva que permite proprietários e construtores rastrearem, em tempo real, cada centavo gasto em suas obras residenciais.

---

## 🚀 Stack Tecnológica

- **Frontend:** Next.js 14+ (App Router)
- **UI:** Tailwind CSS 4.0 + shadcn/ui
- **Backend:** Supabase (PostgreSQL + Auth + Storage + Realtime)
- **Forms:** React Hook Form + Zod
- **State:** Zustand
- **Charts:** Recharts
- **Language:** TypeScript

---

## 🎨 Design System

- **Primary:** #1E3A5F (Azul Profundo)
- **Secondary:** #FF8C42 (Laranja Vibrante)
- **Success:** #22C55E (Verde)
- **Warning:** #EAB308 (Amarelo)
- **Danger:** #EF4444 (Vermelho)
- **Font:** Inter + Plus Jakarta Sans

---

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/build-control.git
cd build-control

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais do Supabase

# Execute o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000)

---

## 🔧 Configuração do Supabase

### 1. Criar Projeto

Vá para [supabase.com](https://supabase.com) e crie um novo projeto.

### 2. Executar Migrations

No SQL Editor do Supabase, execute:

```sql
-- Tabela: obras
CREATE TABLE obras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500),
  total_m2 DECIMAL(10, 2),
  total_budget DECIMAL(15, 2) NOT NULL,
  spent DECIMAL(15, 2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'in_progress',
  start_date DATE,
  expected_end_date DATE,
  created_at TIMESTAMP DEFAULT now()
);

-- Tabela: fases
CREATE TABLE fases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  obra_id UUID NOT NULL REFERENCES obras(id),
  name VARCHAR(255) NOT NULL,
  budgeted_amount DECIMAL(15, 2),
  spent DECIMAL(15, 2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'not_started'
);

-- Tabela: gastos
CREATE TABLE gastos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  obra_id UUID NOT NULL REFERENCES obras(id),
  fase_id UUID NOT NULL REFERENCES fases(id),
  description VARCHAR(500) NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  expense_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
```

### 3. Configurar Row Level Security (RLS)

```sql
-- Habilitar RLS
ALTER TABLE obras ENABLE ROW LEVEL SECURITY;
ALTER TABLE fases ENABLE ROW LEVEL SECURITY;
ALTER TABLE gastos ENABLE ROW LEVEL SECURITY;

-- Criar policies
CREATE POLICY "Usuários veem apenas suas obras"
ON obras FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuários inserem apenas suas obras"
ON obras FOR INSERT WITH CHECK (auth.uid() = user_id);
```

---

## 📱 Funcionalidades

### MVP (v1.0)

- ✅ Autenticação (email/password)
- ✅ Criar/editar/deletar obras
- ✅ Registrar gastos com foto da nota
- ✅ Dashboard com orçamento vs realizado
- ✅ Gestão de fases (6 fases padrão)
- ✅ Alertas básicos
- ✅ Relatório em PDF
- ✅ Mobile responsivo

---

## 📂 Estrutura do Projeto

```
build-control/
├── app/
│   ├── api/
│   │   ├── obras/route.ts
│   │   └── gastos/route.ts
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── dashboard/
│   │   └── DashboardOverview.tsx
│   ├── forms/
│   │   └── GastoForm.tsx
│   └── ui/ (shadcn/ui)
├── lib/
│   └── supabase/
│       └── client.ts
├── types/
│   └── index.ts
└── package.json
```

---

## 🧪 Desenvolvimento

```bash
# Development server
npm run dev

# Build
npm run build

# Start production
npm start

# Lint
npm run lint

# Type check
npm run type-check
```

---

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables

Configure no dashboard da Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 📄 Licença

MIT

---

**Versão:** 1.0.0  
**Data:** Janeiro 2026  
**Author:** Driano Cheski
