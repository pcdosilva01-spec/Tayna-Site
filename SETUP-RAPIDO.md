# 🚀 Setup Rápido - 5 Minutos

## ⚡ Comandos Rápidos

Execute estes comandos na ordem:

```bash
# 1. Instalar dependências (2 min)
npm install

# 2. Gerar Prisma Client (30 seg)
npx prisma generate

# 3. Criar tabelas no Supabase (30 seg)
npx prisma db push

# 4. Popular banco com dados (10 seg)
npm run db:seed

# 5. Iniciar servidor (10 seg)
npm run dev
```

## ✅ Checklist Antes de Começar

- [ ] Arquivo `.env` existe na raiz do projeto
- [ ] Senha do Supabase está no `.env` (substitua `[SUA-SENHA]`)
- [ ] Token do Resend está completo no `.env`

## 🔧 Se Algo Der Errado

### Erro: "Can't reach database server"

```bash
# Verifique a senha do Supabase no .env
# Depois rode:
npx prisma db push
```

### Erro: "Module not found"

```bash
# Reinstale as dependências
rm -rf node_modules
npm install
```

### Erro no Prisma

```bash
# Force reset
npx prisma db push --force-reset
npm run db:seed
```

## 🎯 Acesso Rápido

Depois de rodar `npm run dev`:

- **Homepage:** http://localhost:3000
- **Login:** http://localhost:3000/login
- **Admin:** http://localhost:3000/admin
- **Produtos:** http://localhost:3000/produtos

**Credenciais Admin:**
- Email: `admin@taynaboutique.com`
- Senha: `admin123`

## 📊 Ver Banco de Dados

```bash
# Abrir Prisma Studio
npx prisma studio
```

Acesse: http://localhost:5555

## 🎉 Pronto!

Se tudo funcionou, você verá:

```
✓ Ready in 2.5s
○ Local:        http://localhost:3000
```

Agora é só desenvolver! 🚀
