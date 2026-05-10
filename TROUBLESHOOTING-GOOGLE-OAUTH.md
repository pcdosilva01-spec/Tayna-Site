# 🔧 Troubleshooting - Google OAuth

## ❌ Erro: "Origem inválida: não é permitido que URIs de origem contenham um caminho ou terminem com /"

### O que significa?

O Google OAuth está reclamando que você colocou uma **barra `/` no final da URL** ou colocou um **caminho** (como `/login`) na origem.

### ✅ Solução Rápida

1. Acesse: https://console.cloud.google.com
2. Selecione seu projeto
3. Vá em **APIs & Services** > **Credentials**
4. Clique no seu OAuth Client ID
5. Verifique as duas seções:

#### ✅ Authorized JavaScript origins (Origens JavaScript autorizadas)

**CORRETO:**
```
http://localhost:3000
https://seusite.com
```

**ERRADO:**
```
http://localhost:3000/          ❌ (tem barra no final)
http://localhost:3000/login     ❌ (tem caminho)
http://localhost:3000/api       ❌ (tem caminho)
```

#### ✅ Authorized redirect URIs (URIs de redirecionamento autorizadas)

**CORRETO:**
```
http://localhost:3000/api/auth/callback/google
https://seusite.com/api/auth/callback/google
```

**ERRADO:**
```
http://localhost:3000/api/auth/callback/google/    ❌ (barra no final)
http://localhost:3000                              ❌ (falta o caminho)
```

### 📝 Passo a Passo Completo

1. **Apague todas as URLs** que estão lá
2. **Adicione APENAS estas URLs:**

**Authorized JavaScript origins:**
```
http://localhost:3000
```

**Authorized redirect URIs:**
```
http://localhost:3000/api/auth/callback/google
```

3. Clique em **Save** (Salvar)
4. **Aguarde 5 minutos** (o Google precisa propagar as mudanças)
5. Teste novamente

### 🎯 Checklist de Verificação

- [ ] Nenhuma URL termina com `/`
- [ ] JavaScript origins NÃO tem caminhos (só domínio)
- [ ] Redirect URIs tem o caminho completo `/api/auth/callback/google`
- [ ] Salvou as alterações
- [ ] Aguardou 5 minutos

### 🔍 Exemplo Visual

```
┌─────────────────────────────────────────────────┐
│ Authorized JavaScript origins                   │
├─────────────────────────────────────────────────┤
│ http://localhost:3000                     ✅    │
│                                                 │
│ [+ ADD URI]                                     │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Authorized redirect URIs                        │
├─────────────────────────────────────────────────┤
│ http://localhost:3000/api/auth/callback/google ✅│
│                                                 │
│ [+ ADD URI]                                     │
└─────────────────────────────────────────────────┘
```

### 🚀 Para Produção

Quando for fazer deploy, adicione também:

**Authorized JavaScript origins:**
```
http://localhost:3000
https://taynaboutique.com
https://www.taynaboutique.com
```

**Authorized redirect URIs:**
```
http://localhost:3000/api/auth/callback/google
https://taynaboutique.com/api/auth/callback/google
https://www.taynaboutique.com/api/auth/callback/google
```

### ⚠️ Outros Erros Comuns

#### "redirect_uri_mismatch"

**Problema:** A URL de callback não está cadastrada

**Solução:**
1. Copie a URL exata do erro
2. Adicione ela em "Authorized redirect URIs"
3. Certifique-se que está EXATAMENTE igual (sem espaços, sem `/` extra)

#### "Access blocked: This app's request is invalid"

**Problema:** OAuth consent screen não configurado

**Solução:**
1. Vá em **OAuth consent screen**
2. Preencha todos os campos obrigatórios
3. Adicione seu email em "Test users" (se estiver em modo teste)

#### "The OAuth client was not found"

**Problema:** Client ID ou Secret incorretos

**Solução:**
1. Verifique o `.env`
2. Copie novamente o Client ID e Secret do Google Cloud
3. Reinicie o servidor: `npm run dev`

### 🧪 Testar se Funcionou

1. Acesse: http://localhost:3000/login
2. Clique em "Login com Google" (se tiver o botão)
3. Deve abrir popup do Google
4. Selecione sua conta
5. Deve redirecionar de volta para o site logado

### 📞 Ainda não funcionou?

Verifique:

1. **Arquivo `.env` está correto?**
```env
GOOGLE_CLIENT_ID="123456789-abc.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-abc123..."
```

2. **Reiniciou o servidor?**
```bash
# Pare o servidor (Ctrl+C)
npm run dev
```

3. **Aguardou 5 minutos após salvar no Google Cloud?**
- As mudanças não são instantâneas
- Tome um café e tente novamente

4. **Está usando o projeto correto no Google Cloud?**
- Verifique o nome do projeto no topo da tela
- Certifique-se que está no projeto certo

### 💡 Dica Pro

Se quiser testar sem Google OAuth por enquanto:

1. Comente as linhas no `.env`:
```env
# GOOGLE_CLIENT_ID="..."
# GOOGLE_CLIENT_SECRET="..."
```

2. O site funcionará normalmente, mas sem login do Google
3. Use login com email/senha normal

### ✅ Configuração Final Correta

```
Google Cloud Console
└── Seu Projeto (Tayna Boutique)
    └── APIs & Services
        └── Credentials
            └── OAuth 2.0 Client ID
                ├── Authorized JavaScript origins
                │   └── http://localhost:3000
                └── Authorized redirect URIs
                    └── http://localhost:3000/api/auth/callback/google
```

---

🎉 **Pronto! Agora deve funcionar!**

Se ainda tiver problemas, verifique o console do navegador (F12) para ver o erro exato.
