/**
 * Servidor: site estático + POST /api/contact (envio por e-mail via SMTP)
 * Uso: na pasta server → npm install → npm start
 * Configure .env (copie de .env.example)
 */

require("dotenv").config({ path: require("path").join(__dirname, ".env") });

const path = require("path");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const nodemailer = require("nodemailer");

const PORT = Number(process.env.PORT) || 3000;
const ROOT = path.join(__dirname, "..");

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(express.json({ limit: "48kb" }));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX) || 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Muitas tentativas. Tente de novo em alguns minutos." },
});

function isValidEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function stripTags(s) {
  return String(s).replace(/<[^>]*>/g, "").trim();
}

app.post("/api/contact", contactLimiter, async (req, res) => {
  const { nome, email, assunto, mensagem, website } = req.body || {};

  if (website) {
    return res.json({ ok: true, message: "Mensagem recebida." });
  }

  const n = stripTags(nome || "").slice(0, 100);
  const em = stripTags(email || "").slice(0, 254).toLowerCase();
  const a = stripTags(assunto || "").slice(0, 200);
  const m = stripTags(mensagem || "").slice(0, 5000);

  if (!n || !em || !a || !m) {
    return res.status(400).json({ ok: false, error: "Preencha nome, e-mail, assunto e mensagem." });
  }
  if (!isValidEmail(em)) {
    return res.status(400).json({ ok: false, error: "E-mail inválido." });
  }

  const mailTo = process.env.MAIL_TO;
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!mailTo || !smtpHost || !smtpUser || !smtpPass) {
    console.error("[contact] SMTP ou MAIL_TO não configurados no .env");
    return res.status(503).json({
      ok: false,
      error:
        "Servidor de e-mail não configurado. Copie server/.env.example para server/.env e preencha SMTP.",
    });
  }

  const smtpPort = Number(process.env.SMTP_PORT) || 587;
  const smtpSecure = String(process.env.SMTP_SECURE).toLowerCase() === "true";
  const mailFrom = process.env.MAIL_FROM || `Contato NJR10 <${smtpUser}>`;

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const ip = req.ip || req.socket.remoteAddress || "";
  const htmlBody = `
    <h2>Nova mensagem — NJR 10</h2>
    <p><strong>Nome:</strong> ${escapeHtml(n)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(em)}</p>
    <p><strong>Assunto:</strong> ${escapeHtml(a)}</p>
    <hr>
    <pre style="font-family:system-ui,sans-serif;white-space:pre-wrap;">${escapeHtml(m)}</pre>
    <hr>
    <p style="font-size:12px;color:#666;">IP: ${escapeHtml(ip)} · ${new Date().toISOString()}</p>
  `;

  try {
    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      replyTo: em,
      subject: `[NJR10] ${a}`,
      text: `Nome: ${n}\nE-mail: ${em}\nAssunto: ${a}\n\n${m}\n\n---\nIP: ${ip}`,
      html: htmlBody,
    });
    return res.json({ ok: true, message: "Mensagem enviada com sucesso! Obrigado pelo contato." });
  } catch (err) {
    console.error("[contact] nodemailer:", err.message);
    return res.status(500).json({
      ok: false,
      error: "Falha ao enviar e-mail. Verifique as credenciais SMTP no servidor.",
    });
  }
});

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

app.use(express.static(ROOT, { index: ["index.html"], extensions: ["html"] }));

app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ ok: false, error: "Não encontrado." });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`NJR 10 → http://localhost:${PORT}`);
  console.log(`API contato → POST http://localhost:${PORT}/api/contact`);
});
