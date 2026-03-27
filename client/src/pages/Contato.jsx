import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import NavbarSimple from '../components/shared/NavbarSimple'
import FooterSimple from '../components/shared/FooterSimple'

const FIELD_CLASS = `
  w-full bg-dark-300 border border-white/15 text-white font-inter text-sm px-4 py-3
  placeholder:text-gray-600 focus:outline-none focus:border-gold
  transition-colors duration-300
`.trim()

export default function Contato() {
  const [status, setStatus] = useState({ type: '', msg: '' })
  const [sending, setSending] = useState(false)
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setStatus({ type: '', msg: '' })

    const data = Object.fromEntries(new FormData(e.target))

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (json.ok) {
        setStatus({ type: 'ok', msg: json.message })
        formRef.current?.reset()
      } else {
        setStatus({ type: 'err', msg: json.error || 'Erro ao enviar mensagem.' })
      }
    } catch {
      setStatus({ type: 'err', msg: 'Erro de conexão. Tente novamente.' })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="bg-dark text-white min-h-screen flex flex-col">
      <NavbarSimple />

      <main className="flex-1 max-w-lg mx-auto w-full px-5 md:px-0 pt-28 pb-20">
        <p className="font-inter text-xs tracking-[0.35em] uppercase text-gold mb-2">Fale comigo</p>
        <h1 className="font-oswald text-4xl md:text-5xl font-semibold text-white mb-4">Contato</h1>
        <p className="font-inter text-gray-400 text-sm leading-relaxed mb-8">
          Use o formulário abaixo para enviar uma mensagem. Ela chegará por e-mail.
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
          {/* Honeypot */}
          <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
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
          <strong className="text-gray-500">Nota:</strong> o envio só funciona quando o site é aberto pelo servidor do projeto
          (ver <code className="text-gold/70 text-[11px]">server/README.md</code>).
          Em hospedagem estática sem API, configure o servidor ou use outro serviço de formulário.
        </p>
      </main>

      <FooterSimple links={[
        { label: 'Início', to: '/' },
        { label: 'Sobre',  to: '/sobre' },
      ]} />
    </div>
  )
}
