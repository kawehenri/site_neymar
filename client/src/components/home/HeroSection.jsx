import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const BG_IMAGES = ['/fundo_index1.jpeg', '/fundo_index2.jpeg', '/fundo_index.jpeg']

export default function HeroSection() {
  const [bgIdx, setBgIdx] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const prefers = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefers) return
    BG_IMAGES.forEach(src => { const img = new Image(); img.src = src })
    const id = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setBgIdx(i => (i + 1) % BG_IMAGES.length)
        setFading(false)
      }, 700)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative h-screen min-h-[580px] flex items-center" id="inicio">
      {/* BG Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={BG_IMAGES[bgIdx]}
          alt="Neymar Jr"
          className={`w-full h-full object-cover object-center transition-opacity duration-700 ${fading ? 'opacity-0' : 'opacity-100'}`}
          fetchpriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-dark/60 to-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/70 via-dark/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="section-eyebrow mb-3"
        >
          O CRAQUE BRASILEIRO
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-oswald text-[4.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-bold leading-[0.9] text-white tracking-wider"
        >
          NEYMAR<br />
          <span className="text-gold">JR</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="font-inter text-gray-300 text-base md:text-lg mt-5 max-w-lg leading-relaxed"
        >
          Talento, ousadia e paixão pelo futebol — explore a incrível trajetória do camisa 10 do Brasil.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <a href="#carreira"
            className="inline-block px-7 py-3 bg-gold text-dark font-inter font-semibold text-sm uppercase tracking-[0.15em] hover:bg-gold-light transition-colors duration-300"
          >
            Ver Carreira
          </a>
          <a href="#timeline"
            className="inline-block px-7 py-3 border border-white/30 text-white font-inter text-sm uppercase tracking-[0.15em] hover:border-gold hover:text-gold transition-all duration-300"
          >
            Linha do Tempo
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#stats"
        aria-label="Rolar para baixo"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity"
      >
        <span className="block w-px h-8 bg-white/50" />
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" className="text-white animate-bounce">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
        </svg>
      </a>
    </section>
  )
}
