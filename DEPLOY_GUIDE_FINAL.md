# 🚀 BUILD CONTROL - GUIA COMPLETO DE DEPLOY

## ✅ CÓDIGO 100% PRONTO!

- **GitHub:** https://github.com/max-dchesque/build-control
- **Commits:** 3 (Inicial, MVP, Docs)
- **Status:** Build funcionando localmente

---

## 🎯 3 FORMAS DE DEPLOY

### 1️⃣ VERCEL WEB (RECOMENDADO - 2 min) ⭐

**Passo a passo:**

1. Acessar https://vercel.com/new
2. Fazer login com GitHub (conta: max-dchesque)
3. Clicar em "Import Git Repository"
4. Selecionar: `max-dchesque/build-control`
5. Configurar:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
6. Clicar "Deploy"
7. **URL gerada:** `https://build-control-xxx.vercel.app`

✅ **Vantagens:**
- Deploy automático a cada push
- SSL automático
- CDN global
- Preview URLs para branches

---

### 2️⃣ NETLIFY (3-4 min)

**Passo a passo:**

1. Acessar https://app.netlify.com/start
2. Fazer login com GitHub
3. Clicar "New site from Git"
4. Selecionar: `max-dchesque/build-control`
5. Configurar:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
6. Clicar "Deploy site"
7. **URL gerada:** `https://xxx.netlify.app`

---

### 3️⃣ RAILWAY (5 min)

**Passo a passo:**

1. Acessar https://railway.app/new
2. Fazer login com GitHub
3. Clicar "Deploy from GitHub repo"
4. Selecionar: `max-dchesque/build-control`
5. Configurar:
   - **Root:** `./`
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
6. Deploy automático
7. **URL gerada:** `https://xxx.up.railway.app`

---

## 🔗 URLs FINAIS

**Após deploy, você terá:**

- **Vercel:** `https://build-control-xxx.vercel.app`
- **Netlify:** `https://build-control-xxx.netlify.app`
- **Railway:** `https://build-control.up.railway.app`

---

## 📝 VARIÁVEIS DE AMBIENTE

**Configurar no painel:**

```env
NEXT_PUBLIC_SUPABASE_URL=seu-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave
NEXT_PUBLIC_APP_URL=https://sua-url-vercel.app
```

---

## 🎉 SUCESSO!

Após o deploy, você terá:

✅ URL pública funcional
✅ Deploy automático (git push)
✅ SSL/HTTPS automático
✅ CDN global
✅ Preview URLs

---

**Escolha: Vercel Web (opção 1)** - mais rápido e simples!

🚀 **Deploy em 2 minutos!**
