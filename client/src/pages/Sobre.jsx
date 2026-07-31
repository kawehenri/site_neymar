import { Link } from 'react-router-dom'
import NavbarSimple from '../components/shared/NavbarSimple'
import FooterSimple from '../components/shared/FooterSimple'
import ResponsiveImage from '../components/shared/ResponsiveImage'
import PageMeta from '../components/shared/PageMeta'

export default function Sobre() {
  return (
    <div className="bg-dark text-white min-h-screen flex flex-col">
      <PageMeta
        title="Sobre o projeto e o autor — NJR 10"
        description="Conheça Kawê Henrique e o processo por trás desta experiência editorial independente sobre Neymar Jr."
        path="/sobre"
        image="/perfil.jpeg"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Kawê Henrique',
          url: 'https://ousadiayalegria.site/sobre',
          sameAs: ['https://github.com/kawehenri', 'https://linkedin.com/in/kawehenri'],
        }}
      />
      <NavbarSimple />

      <main id="conteudo" className="editorial-container flex-1 pb-24 pt-32">
        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="relative">
            <ResponsiveImage
              src="/perfil.jpeg"
              alt="Kawê Henrique, desenvolvedor do projeto NJR 10"
              className="aspect-[4/5] rounded-editorial border border-gold/20 bg-dark-200 shadow-editorial"
              imgClassName="object-cover"
              position="center 18%"
              width="640"
              height="800"
              loading="eager"
            />
            <div className="absolute -bottom-5 -right-4 border border-gold/30 bg-dark px-5 py-3 font-inter text-xs uppercase tracking-[0.2em] text-gold">
              Frontend &amp; direção criativa
            </div>
          </div>
          <div>
            <p className="font-inter text-xs tracking-[0.35em] uppercase text-gold mb-3">Quem criou este site</p>
            <h1 className="font-oswald text-[clamp(3.5rem,8vw,7rem)] font-semibold leading-[0.85] tracking-[-0.035em] text-white mb-10">Código com<br />propósito.</h1>
            <div className="space-y-5">
          <p className="font-inter text-gray-300 text-base leading-relaxed">
            Olá! Sou <strong className="text-white">Kawê Henrique</strong>, técnico em desenvolvimento de sistemas e apaixonado por futebol.
            Este projeto nasceu da vontade de homenagear <strong className="text-white">Neymar Jr.</strong> — não só pelos números e títulos,
            mas pela alegria que ele coloca em campo e pela forma como inspira milhões de brasileiros.
          </p>
          <p className="font-inter text-gray-300 text-base leading-relaxed">
            Curto código, bom design e uma conversa honesta sobre o esporte. Flamenguista de coração, mas com respeito
            enorme por quem joga futebol arte — e o Ney, pra mim, é referência nisso.
          </p>
          <p className="font-inter text-gray-300 text-base leading-relaxed">
            Se quiser trocar uma ideia, sugerir melhoria no site ou só mandar um alô, use a página{' '}
            <Link to="/contato" className="text-gold hover:text-gold-light transition-colors">Contato</Link>. Valeu por visitar!
          </p>
            </div>

        {/* Social links */}
            <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="https://github.com/kawehenri"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-gray-300 font-inter text-sm hover:border-gold hover:text-gold transition-all duration-300"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.61-3.37-1.36-3.37-1.36-.45-1.17-1.1-1.48-1.1-1.48-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/>
            </svg>
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/kawehenri"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-gray-300 font-inter text-sm hover:border-gold hover:text-gold transition-all duration-300"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-inter text-sm text-gray-500 hover:text-white transition-colors px-2 py-2.5"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
            Voltar ao site
          </Link>
            </div>
          </div>
        </div>
      </main>

      <FooterSimple links={[
        { label: 'Início',  to: '/' },
        { label: 'Artigo',  to: '/artigo' },
        { label: 'Contato', to: '/contato' },
      ]} />
    </div>
  )
}
