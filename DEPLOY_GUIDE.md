# BUILD CONTROL - GUIA DE DEPLOY

## Opção 1: Vercel (RECOMENDADO)

```bash
cd /data/.openclaw/workspace-neo/projects/build-control

# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# URL gerada: https://build-control-xxx.vercel.app
```

## Opção 2: Netlify

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod

# URL gerada: https://xxx.netlify.app
```

## Opção 3: Railway

```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login
railway login

# Init
railway init

# Deploy
railway up
```

## Opção 4: Render.com

1. Acessar https://render.com
2. Conectar GitHub
3. New Web Service
4. Build: `npm run build`
5. Start: `npm start`

## Opção 5: Easypanel (VPS)

1. Acessar Easypanel (porta 3000 ou domínio)
2. Criar novo projeto
3. Build + Deploy

---

**RECOMENDAÇÃO:** Use Vercel - mais rápido e simples!
