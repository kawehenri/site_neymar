/**
 * Formulário de contato
 * - Local (server/): POST /api/contact (SMTP)
 * - GitHub Pages / estático: FormSubmit.co (sem backend)
 */
(function () {
  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("formStatus");
  const btn = document.getElementById("btnSubmit");

  if (!form || !statusEl || !btn) return;

  /** E-mail que recebe as mensagens no FormSubmit (GitHub Pages) */
  const CONTACT_EMAIL = "kawehenri@gmail.com";

  const host = window.location.hostname;
  const useLocalApi =
    (typeof window.CONTACT_API_URL === "string" && window.CONTACT_API_URL) ||
    host === "localhost" ||
    host === "127.0.0.1";

  function showStatus(type, message) {
    statusEl.textContent = message;
    statusEl.className =
      "contact-form-status is-visible contact-form-status--" + type;
  }

  function hideStatus() {
    statusEl.className = "contact-form-status";
    statusEl.textContent = "";
  }

  async function sendViaLocalApi(payload) {
    const url =
      (typeof window.CONTACT_API_URL === "string" && window.CONTACT_API_URL) ||
      "/api/contact";
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || data.message || "Erro ao enviar.");
    }
    return data.message || "Mensagem enviada com sucesso! Obrigado.";
  }

  async function sendViaFormSubmit(payload) {
    const res = await fetch(
      "https://formsubmit.co/ajax/" + encodeURIComponent(CONTACT_EMAIL),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nome: payload.nome,
          email: payload.email,
          assunto: payload.assunto,
          mensagem: payload.mensagem,
          _replyto: payload.email,
          _subject: "[NJR10] " + payload.assunto,
          _template: "table",
          _captcha: "false",
        }),
      }
    );
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.success === "false" || data.success === false) {
      throw new Error(
        data.message || "Falha ao enviar. Confirme o e-mail no FormSubmit se for o 1º envio."
      );
    }
    return "Mensagem enviada com sucesso! Obrigado pelo contato.";
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideStatus();

    const honeypot = form.querySelector('[name="website"]');
    if (honeypot && honeypot.value) {
      showStatus("ok", "Mensagem recebida.");
      return;
    }

    const nome = (form.nome.value || "").trim();
    const email = (form.email.value || "").trim();
    const assunto = (form.assunto.value || "").trim();
    const mensagem = (form.mensagem.value || "").trim();

    if (!nome || !email || !assunto || !mensagem) {
      showStatus("err", "Preencha todos os campos obrigatórios.");
      return;
    }

    btn.disabled = true;
    btn.textContent = "Enviando…";

    try {
      const payload = { nome, email, assunto, mensagem };
      const msg = useLocalApi
        ? await sendViaLocalApi(payload)
        : await sendViaFormSubmit(payload);
      showStatus("ok", msg);
      form.reset();
    } catch (err) {
      showStatus(
        "err",
        err.message || "Não foi possível enviar. Tente novamente em instantes."
      );
    } finally {
      btn.disabled = false;
      btn.textContent = "Enviar mensagem";
    }
  });
})();
