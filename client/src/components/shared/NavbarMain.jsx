import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollSpy } from '../../hooks/useScrollSpy'

const NAV_LINKS = [
  { label: 'Início',        href: '#inicio' },
  { label: 'Carreira',      href: '#carreira' },
  { label: 'Linha do Tempo',href: '#timeline' },
  { label: 'Curiosidades',  href: '#curiosidades' },
  { label: 'Marcas',        href: '#marcas' },
]

const NAV_PAGES = [
  { label: 'Especial', to: '/especial' },
  { label: 'Sobre',    to: '/sobre' },
  { label: 'Contato',  to: '/contato' },
]

const SECTION_IDS = ['inicio', 'carreira', 'timeline', 'curiosidades', 'marcas']

export default function NavbarMain() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const activeSection             = useScrollSpy(SECTION_IDS, 0.4)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleAnchorClick = () => setMenuOpen(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? 'bg-dark/95 backdrop-blur-md border-b border-white/5 shadow-lg' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-2.5 group" onClick={handleAnchorClick}>
          <img
            src="/logo_Neymar.png"
            alt=""
            width="36"
            height="36"
            className="rounded-full opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <span className="font-oswald text-xl font-semibold text-white tracking-wide">
            NJR <span className="text-gold">10</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`font-inter text-xs tracking-[0.18em] uppercase transition-colors duration-300 relative group ${
                  activeSection === link.href.slice(1) ? 'text-gold' : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300 ${
                  activeSection === link.href.slice(1) ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </a>
            </li>
          ))}
          {NAV_PAGES.map(p => (
            <li key={p.to}>
              <Link
                to={p.to}
                className="font-inter text-xs tracking-[0.18em] uppercase text-gray-400 hover:text-white transition-colors duration-300"
              >
                {p.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/artigo"
              className="font-inter text-xs font-semibold tracking-[0.18em] uppercase px-4 py-2 border border-gold text-gold hover:bg-gold hover:text-dark transition-all duration-300"
            >
              Artigo
            </Link>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="lg:hidden flex flex-col justify-center gap-[5px] w-8 h-8 p-0.5"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          <span className={`block w-6 h-px bg-white origin-center transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-white origin-center transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden bg-dark/97 backdrop-blur-md border-t border-white/5"
          >
            <ul className="px-6 py-7 flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.li key={link.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                  <a href={link.href} onClick={handleAnchorClick}
                    className="font-inter text-sm tracking-[0.18em] uppercase text-gray-300 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              {NAV_PAGES.map((p, i) => (
                <motion.li key={p.to} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (NAV_LINKS.length + i) * 0.06 }}>
                  <Link to={p.to} onClick={() => setMenuOpen(false)}
                    className="font-inter text-sm tracking-[0.18em] uppercase text-gray-300 hover:text-gold transition-colors"
                  >
                    {p.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (NAV_LINKS.length + NAV_PAGES.length) * 0.06 }}>
                <Link to="/artigo" onClick={() => setMenuOpen(false)}
                  className="inline-block font-inter text-sm font-semibold tracking-[0.18em] uppercase px-5 py-2.5 border border-gold text-gold hover:bg-gold hover:text-dark transition-all duration-300"
                >
                  Artigo
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
