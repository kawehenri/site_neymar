import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import DualLayerImg from '../shared/DualLayerImg'
import { curiosidadesData } from '../../data/homeData'

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
    <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z" />
  </svg>
)

function CurioCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
      className={`rounded-editorial bg-dark-200 border border-white/8 p-7 hover:border-gold/30 transition-all duration-500 hover:-translate-y-1 ${
        item.video ? 'flex flex-col' : ''
      }`}
    >
      <div className="font-oswald text-3xl font-bold text-gold/20 mb-4 leading-none">{String(index + 1).padStart(2, '0')}</div>
      <h4 className="font-oswald text-lg font-semibold text-white mb-2">{item.title}</h4>
      <p className="font-inter text-sm text-gray-400 leading-relaxed flex-1">{item.desc}</p>

      {item.video && (
        <>
          <a
            href={item.video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 font-inter text-xs font-semibold uppercase tracking-[0.15em] text-gold hover:text-gold-light transition-colors duration-300 self-start"
          >
            <PlayIcon />
            Assistir no YouTube
          </a>
          <div className="mt-3 rounded overflow-hidden h-32">
            <DualLayerImg src={item.video.thumb} alt="Neymar pela Seleção" className="w-full h-full" />
          </div>
        </>
      )}
    </motion.div>
  )
}

export default function CuriosidadesSection() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section className="editorial-section bg-dark" id="curiosidades">
      <div className="editorial-container">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-eyebrow mb-2">SABIA QUE...</p>
          <h2 className="section-title-lg">Curiosidades</h2>
          <p className="font-inter text-gray-500 mt-3">Fatos incríveis sobre o maior camisa 10 do Brasil</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {curiosidadesData.map((item, i) => (
            <CurioCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
