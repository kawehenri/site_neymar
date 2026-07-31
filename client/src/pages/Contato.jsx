import { useState, useRef } from 'react'
import NavbarSimple from '../components/shared/NavbarSimple'
import FooterSimple from '../components/shared/FooterSimple'
import PageMeta from '../components/shared/PageMeta'

/** FormSubmit — funciona no GitHub Pages e em produção sem backend */
const CONTACT_EMAIL = import.meta.env.VITE_FORM_EMAIL || 'kawehenri@gmail.com'
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`

const FIELD_CLASS = `
  w-full bg-dark-300/80 border border-white/15 text-white font-inter text-sm px-4 py-3.5
  placeholder:text-gray-600 focus:outline-none focus:border-gold
  transition-colors duration-300
`.trim()

async function sendViaFormSubmit(payload) {
  const res = await fetch(FORMSUBMIT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      nome: payload.nome,
      email: payload.email,
      assunto: payload.assunto,
      mensagem: payload.mensagem,
      _replyto: payload.email,
      _subject: `[NJR10] ${payload.assunto}`,
      _template: 'table',
      _captcha: 'false',
    }),
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok || json.success === 'false' || json.success === false) {
    throw new Error(
      json.message ||
        'Falha ao enviar. Confirme o e-mail no FormSubmit se for o 1º envio.'
    )
  }
  return 'Mensagem enviada com sucesso! Obrigado pelo contato.'
}

async function sendViaLocalApi(payload) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok || !json.ok) {
    throw new Error(json.error || 'Erro ao enviar mensagem.')
  }
  return json.message || 'Mensagem enviada com sucesso! Obrigado pelo contato.'
}

async function sendContact(data) {
  const payload = {
    nome: String(data.nome || '').trim(),
    email: String(data.email || '').trim(),
    assunto: String(data.assunto || '').trim(),
    mensagem: String(data.mensagem || '').trim(),
  }

  // FormSubmit é o canal principal (GitHub Pages / produção).
  // Em localhost, tenta a API local e, se falhar, usa FormSubmit.
  const host = typeof window !== 'undefined' ? window.location.hostname : ''
  const isLocal = host === 'localhost' || host === '127.0.0.1'

  if (isLocal) {
    try {
      return await sendViaLocalApi(payload)
    } catch {
      return await sendViaFormSubmit(payload)
    }
  }

  return sendViaFormSubmit(payload)
}

export default function Contato() {
  const [status, setStatus] = useState({ type: '', msg: '' })
  const [sending, setSending] = useState(false)
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setStatus({ type: '', msg: '' })

    const data = Object.fromEntries(new FormData(e.target))
    if (data.website) {
      setStatus({ type: 'ok', msg: 'Mensagem recebida.' })
      setSending(false)
      return
    }

    const nome = String(data.nome || '').trim()
    const email = String(data.email || '').trim()
    const assunto = String(data.assunto || '').trim()
    const mensagem = String(data.mensagem || '').trim()

    if (!nome || !email || !assunto || !mensagem) {
      setStatus({ type: 'err', msg: 'Preencha todos os campos obrigatórios.' })
      setSending(false)
      return
    }

    try {
      const msg = await sendContact(data)
      setStatus({ type: 'ok', msg })
      formRef.current?.reset()
    } catch (err) {
      setStatus({
        type: 'err',
        msg: err.message || 'Erro de conexão. Tente novamente.',
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="bg-dark text-white min-h-screen flex flex-col">
      <PageMeta
        title="Contato — NJR 10"
        description="Envie uma mensagem, sugestão ou oportunidade sobre o projeto NJR 10."
        path="/contato"
      />
      <NavbarSimple />

      <main id="conteudo" className="editorial-container flex-1 pt-32 pb-24">
        <div className="max-w-2xl rounded-editorial border border-white/10 bg-gradient-to-br from-dark-200 to-dark p-6 shadow-editorial md:p-10">
          <p className="font-inter text-xs tracking-[0.35em] uppercase text-gold mb-2">Fale comigo</p>
          <h1 className="font-oswald text-4xl md:text-5xl font-semibold text-white mb-4">Contato</h1>
          <p className="font-inter text-gray-400 text-sm leading-relaxed mb-8">
            Use o formulário abaixo para enviar uma mensagem. Ela chegará por e-mail via FormSubmit.
            Resposta em dias úteis, quando possível.
          </p>

          {status.msg && (
            <div
              role="status"
              aria-live="polite"
              className={`mb-6 px-4 py-3 border font-inter text-sm ${
                status.type === 'ok'
                  ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/5'
                  : 'border-red-500/40 text-red-400 bg-red-500/5'
              }`}
            >
              {status.msg}
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            {/* Honeypot anti-spam */}
            <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div>
              <label htmlFor="nome" className="font-inter text-xs text-gray-400 uppercase tracking-[0.15em] block mb-2">
                Nome
              </label>
              <input
                type="text" id="nome" name="nome"
                required maxLength={100} autoComplete="name"
                placeholder="Seu nome"
                className={FIELD_CLASS}
              />
            </div>

            <div>
              <label htmlFor="email" className="font-inter text-xs text-gray-400 uppercase tracking-[0.15em] block mb-2">
                E-mail
              </label>
              <input
                type="email" id="email" name="email"
                required maxLength={254} autoComplete="email"
                placeholder="seu@email.com"
                className={FIELD_CLASS}
              />
            </div>

            <div>
              <label htmlFor="assunto" className="font-inter text-xs text-gray-400 uppercase tracking-[0.15em] block mb-2">
                Assunto
              </label>
              <input
                type="text" id="assunto" name="assunto"
                required maxLength={200}
                placeholder="Ex.: Sugestão para o site"
                className={FIELD_CLASS}
              />
            </div>

            <div>
              <label htmlFor="mensagem" className="font-inter text-xs text-gray-400 uppercase tracking-[0.15em] block mb-2">
                Mensagem
              </label>
              <textarea
                id="mensagem" name="mensagem"
                required maxLength={5000} rows={5}
                placeholder="Escreva sua mensagem aqui…"
                className={`${FIELD_CLASS} resize-y min-h-[120px]`}
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="px-8 py-3.5 bg-gold text-dark font-inter font-semibold text-sm uppercase tracking-[0.2em] hover:bg-gold-light disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300 self-start"
            >
              {sending ? 'Enviando…' : 'Enviar mensagem'}
            </button>
          </form>

          <p className="font-inter text-xs text-gray-600 mt-8 leading-relaxed">
            As mensagens são enviadas para <span className="text-gray-500">{CONTACT_EMAIL}</span> via FormSubmit.
          </p>
        </div>
      </main>

      <FooterSimple />
    </div>
  )
}
