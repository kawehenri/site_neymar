import { Link } from 'react-router-dom'

export default function FooterSimple({ links = [] }) {
  return (
    <footer className="bg-dark-100 border-t border-white/5 py-7">
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="font-oswald text-xl text-white tracking-wide hover:text-gold transition-colors">
          NJR <span className="text-gold">10</span>
        </Link>

        {links.length > 0 && (
          <nav className="flex gap-6">
            {links.map(l => (
              l.to
                ? <Link key={l.to} to={l.to} className="font-inter text-sm text-gray-400 hover:text-gold transition-colors">{l.label}</Link>
                : <a key={l.href} href={l.href} className="font-inter text-sm text-gray-400 hover:text-gold transition-colors">{l.label}</a>
            ))}
          </nav>
        )}

        <p className="font-inter text-xs text-gray-600">
          Desenvolvido por <strong className="text-gray-500">Kawê Henrique</strong> — 2025
        </p>
      </div>
    </footer>
  )
}
