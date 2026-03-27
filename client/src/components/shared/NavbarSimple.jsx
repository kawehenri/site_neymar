import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function NavbarSimple({ backTo = '/', backLabel = 'Voltar ao site' }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark/95 backdrop-blur-md border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 flex items-center justify-between">
        <Link to="/" className="font-oswald text-xl font-semibold text-white tracking-wide hover:text-gold transition-colors">
          NJR <span className="text-gold">10</span>
        </Link>
        <Link
          to={backTo}
          className="flex items-center gap-1.5 font-inter text-xs text-gray-400 hover:text-white tracking-wide uppercase transition-colors duration-300"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          {backLabel}
        </Link>
      </div>
    </nav>
  )
}
