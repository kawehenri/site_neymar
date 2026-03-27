import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { careerCards } from '../../data/homeData'

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
    <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z" />
  </svg>
)

function CareerCard({ card, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className={`career-card ${card.featured ? 'md:col-span-2 lg:col-span-2' : ''}`}
    >
      {/* Dual layer images */}
      <img src={card.image} alt="" className="img-bg" aria-hidden="true" decoding="async" loading="lazy" />
      <img src={card.image} alt={card.title} className="img-main" decoding="async" loading="lazy" />

      {/* Overlay */}
      <div className="career-overlay">
        <div className="w-full px-5 pb-5">
          <span className={`inline-block font-inter text-xs font-semibold px-3 py-1 rounded mb-2 ${
            card.featured ? 'bg-gold text-dark' : 'bg-white/15 text-white'
          } backdrop-blur-sm`}>
            {card.badge}
          </span>
          <h3 className="font-oswald text-2xl font-semibold text-white mb-1.5">{card.title}</h3>
          <p className="font-inter text-sm text-gray-300 leading-relaxed mb-4 line-clamp-3">{card.desc}</p>
          <a
            href={card.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 font-inter text-xs font-semibold uppercase tracking-[0.15em] px-4 py-2.5 transition-all duration-300 ${
              card.featured
                ? 'bg-gold text-dark hover:bg-gold-light'
                : 'border border-white/40 text-white hover:border-gold hover:text-gold'
            }`}
          >
            <PlayIcon />
            {card.featured ? 'Ver Documentário' : 'Ver no YouTube'}
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function CareerSection() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section className="py-20 md:py-28 bg-dark" id="carreira">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-eyebrow mb-2">TRAJETÓRIA</p>
          <h2 className="section-title-lg">Momentos da Carreira</h2>
          <p className="font-inter text-gray-500 mt-3">Dos campos do Santos aos maiores estádios do mundo</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[350px]">
          {careerCards.map((card, i) => (
            <CareerCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
