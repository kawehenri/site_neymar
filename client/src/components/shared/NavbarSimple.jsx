import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

const PAGES = [
  { label: 'Início', to: '/' },
  { label: 'Artigo', to: '/artigo' },
  { label: 'Especial', to: '/especial' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Contato', to: '/contato' },
]

export default function NavbarSimple() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav aria-label="Navegação principal"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'bg-dark/95 backdrop-blur-md border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-oswald text-xl font-semibold text-white tracking-wide hover:text-gold transition-colors">
          <img src="/logo_Neymar.png" alt="" width="34" height="34" className="rounded-full opacity-90" />
          <span>NJR <span className="text-gold">10</span></span>
        </Link>
        <div className="hidden md:flex items-center gap-7">
          {PAGES.map(page => (
            <NavLink
              key={page.to}
              to={page.to}
              className={({ isActive }) => `font-inter text-xs uppercase tracking-[0.18em] transition-colors ${
                isActive ? 'text-gold' : 'text-gray-400 hover:text-white'
              }`}
            >
              {page.label}
            </NavLink>
          ))}
        </div>
        <button
          type="button"
          className="grid h-10 w-10 place-items-center border border-white/10 md:hidden"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen(value => !value)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-white/5 bg-dark px-5 py-7 md:hidden">
          <div className="flex flex-col gap-5">
            {PAGES.map(page => (
              <NavLink
                key={page.to}
                to={page.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `font-inter text-sm uppercase tracking-[0.18em] ${
                  isActive ? 'text-gold' : 'text-gray-300'
                }`}
              >
                {page.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
