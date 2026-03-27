import { Link } from 'react-router-dom'

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.61-3.37-1.36-3.37-1.36-.45-1.17-1.1-1.48-1.1-1.48-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

export default function FooterMain() {
  return (
    <footer className="bg-dark-100 border-t border-white/5 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <img src="/logo_Neymar.png" alt="" width="44" height="44" className="rounded-full opacity-80" />
              <span className="font-oswald text-2xl text-white tracking-wide">
                NJR <span className="text-gold">10</span>
              </span>
            </div>
            <p className="font-inter text-sm text-gray-500 max-w-xs leading-relaxed">
              Momentos marcantes da carreira de Neymar Jr.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-7 gap-y-3">
            {[
              { label: 'Início',        href: '#inicio' },
              { label: 'Carreira',      href: '#carreira' },
              { label: 'Linha do Tempo',href: '#timeline' },
              { label: 'Curiosidades',  href: '#curiosidades' },
              { label: 'Marcas',        href: '#marcas' },
            ].map(l => (
              <a key={l.href} href={l.href}
                className="font-inter text-sm text-gray-400 hover:text-gold transition-colors duration-300"
              >{l.label}</a>
            ))}
            {[
              { label: 'Especial', to: '/especial' },
              { label: 'Sobre',    to: '/sobre' },
              { label: 'Contato',  to: '/contato' },
            ].map(l => (
              <Link key={l.to} to={l.to}
                className="font-inter text-sm text-gray-400 hover:text-gold transition-colors duration-300"
              >{l.label}</Link>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex gap-4">
            <a href="https://github.com/kawehenri" target="_blank" rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors duration-300" title="GitHub">
              <GitHubIcon />
            </a>
            <a href="https://linkedin.com/in/kawehenri" target="_blank" rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors duration-300" title="LinkedIn">
              <LinkedInIcon />
            </a>
          </div>
        </div>

        <div className="border-t border-white/5 pt-5 text-center">
          <p className="font-inter text-xs text-gray-600">
            Desenvolvido com paixão por <strong className="text-gray-500">Kawê Henrique</strong> — 2025
          </p>
        </div>
      </div>
    </footer>
  )
}
