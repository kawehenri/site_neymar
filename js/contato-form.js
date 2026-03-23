/**
 * Formulário de contato → POST /api/contact (mesma origem quando servido pelo server/)
 */
(function () {
  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("formStatus");
  const btn = document.getElementById("btnSubmit");

  if (!form || !statusEl || !btn) return;

  const API_URL =
    (typeof window.CONTACT_API_URL === "string" && window.CONTACT_API_URL) ||
    "/api/contact";

  function showStatus(type, message) {
    statusEl.textContent = message;
    statusEl.className =
      "contact-form-status is-visible contact-form-status--" + type;
  }

  function hideStatus() {
    statusEl.className = "contact-form-status";
    statusEl.textContent = "";
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
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, assunto, mensagem }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || data.message || "Erro ao enviar.");
      }

      showStatus("ok", data.message || "Mensagem enviada com sucesso! Obrigado.");
      form.reset();
    } catch (err) {
      const msg =
        err.message ||
        "Não foi possível enviar. Verifique se o servidor está rodando e o e-mail configurado.";
      showStatus("err", msg);
    } finally {
      btn.disabled = false;
      btn.textContent = "Enviar mensagem";
    }
  });
})();
