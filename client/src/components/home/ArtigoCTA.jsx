import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function ArtigoCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-16 bg-dark border-t border-white/5">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65 }}
        className="max-w-7xl mx-auto px-5 md:px-10"
      >
        <div className="bg-gradient-to-r from-dark-300 via-dark-200 to-dark-300 border border-gold/20 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="inline-block font-inter text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3 px-3 py-1 border border-gold/30">
              Leitura Especial
            </span>
            <h2 className="font-oswald text-2xl md:text-4xl font-semibold text-white mb-3">
              A História Completa do Príncipe
            </h2>
            <p className="font-inter text-gray-400 text-sm md:text-base leading-relaxed max-w-xl">
              Da infância humilde em Mogi das Cruzes ao topo do futebol mundial — leia o artigo completo e apaixonado sobre Neymar Jr., escrito por Kawê Henrique.
            </p>
          </div>
          <Link
            to="/artigo"
            className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-gold text-dark font-inter font-semibold text-sm uppercase tracking-[0.15em] hover:bg-gold-light transition-colors duration-300 whitespace-nowrap"
          >
            Ler Artigo Completo
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
