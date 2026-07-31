import { motion } from 'framer-motion'
import ResponsiveImage from '../shared/ResponsiveImage'

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[720px] items-end overflow-hidden md:h-screen md:min-h-[700px] md:items-center" id="inicio">
      {/* BG Image */}
      <div className="absolute inset-0 bg-dark">
        <ResponsiveImage
          src="/generated/hero-home-desktop-1440.jpg"
          mobileSrc="/generated/hero-home-mobile-720.jpg"
          sources={[
            {
              type: 'image/avif',
              srcSet: '/generated/hero-home-desktop-960.avif 960w, /generated/hero-home-desktop-1440.avif 1440w, /generated/hero-home-desktop-1920.avif 1920w',
            },
            {
              type: 'image/webp',
              srcSet: '/generated/hero-home-desktop-960.webp 960w, /generated/hero-home-desktop-1440.webp 1440w, /generated/hero-home-desktop-1920.webp 1920w',
            },
          ]}
          alt="Neymar Jr. no início da trajetória no Santos"
          className="h-full w-full"
          imgClassName="object-cover"
          width="1920"
          height="1080"
          loading="eager"
          fetchPriority="high"
          position="center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-dark/15 md:bg-gradient-to-r md:from-dark/45 md:via-transparent md:to-dark/10" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-dark to-transparent" />
      </div>

      {/* Content */}
      <div className="editorial-container relative z-10 pb-20 md:pb-0">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="section-eyebrow mb-5"
        >
          UMA HISTÓRIA BRASILEIRA
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="display-title text-white"
        >
          OUSADIA<br />
          <span className="text-gold">&amp; ALEGRIA</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-7 max-w-lg font-inter text-base leading-relaxed text-gray-300 md:text-lg"
        >
          Da Vila Belmiro ao mundo. Uma narrativa independente sobre o talento, a coragem e o impacto cultural de Neymar Jr.
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
