# Servidor — site + API de contato

Este servidor faz duas coisas:

1. **Serve o site** (HTML, CSS, JS, imagens) em `http://localhost:3000`
2. **Recebe o formulário** em `POST /api/contact` e envia **e-mail real** via SMTP

## Por que precisa disso?

Formulários em HTML **não enviam e-mail sozinhos**. É preciso um backend (este script) ou um serviço externo (Formspree, etc.). Aqui usamos **Node.js + Nodemailer**, padrão em muitos projetos.

## Passo a passo

```bash
cd server
npm install
copy .env.example .env
# Edite .env com MAIL_TO, SMTP_USER, SMTP_PASS (Gmail = senha de app)
npm start
```

Abra **http://localhost:3000/contato.html** e teste o envio.

### Gmail

1. Ative verificação em 2 etapas na conta Google  
2. Crie uma **Senha de app**: [Google → Segurança → Senhas de app](https://myaccount.google.com/apppasswords)  
3. Use essa senha em `SMTP_PASS` (não a senha normal da conta)

### Produção

- Hospede o Node em um VPS, Railway, Render, Fly.io, etc.  
- Defina `PORT` e variáveis de ambiente no painel do provedor  
- Aponte o domínio para esse servidor **ou** use reverse proxy (Nginx)

### Segurança

- Arquivo `.env` **não** deve ir para o Git  
- Limite de taxa: 8 envios / 15 min por IP (ajuste `RATE_LIMIT_MAX`)  
- Campo oculto **honeypot** no formulário reduz bots simples
