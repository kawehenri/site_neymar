import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import DualLayerImg from '../shared/DualLayerImg'
import { marcaCards, marcasData, networkNodes } from '../../data/homeData'

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" aria-hidden="true">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
)

function MarcaModal({ modalId, onClose }) {
  const d = marcasData[modalId]
  if (!d) return null

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg bg-dark-200 border border-white/10 overflow-hidden"
        style={{ '--modal-accent': d.color }}
        onClick={e => e.stopPropagation()}
      >
        {/* Accent top bar */}
        <div className="h-1 w-full" style={{ background: d.color }} />

        <div className="p-7">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="w-3 h-3 rounded-full mb-3" style={{ background: d.color }} />
              <span className="font-inter text-xs px-2.5 py-1 border rounded-full" style={{ borderColor: d.color, color: d.color }}>
                {d.badge}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 rounded transition-all"
              aria-label="Fechar"
            >
              <CloseIcon />
            </button>
          </div>

          <h3 className="font-oswald text-2xl font-semibold text-white mb-3">{d.title}</h3>

          {/* Media */}
          <div className="h-44 mb-4 rounded overflow-hidden">
            <DualLayerImg src={d.image} alt={d.title} className="w-full h-full" />
          </div>

          <p className="font-inter text-sm text-gray-400 leading-relaxed mb-4">{d.desc}</p>

          <ul className="space-y-2 mb-4">
            {d.details.map(t => (
              <li key={t} className="flex items-start gap-2 font-inter text-xs text-gray-300">
                <span className="text-gold mt-0.5 flex-shrink-0">✦</span>
                {t}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {d.tags.map(tag => (
              <span key={tag} className="font-inter text-xs px-2.5 py-1 bg-white/8 text-gray-400 rounded">{tag}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function NetworkViz({ onNodeClick }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div ref={ref} className="mt-20 text-center">
      <p className="section-eyebrow mb-2">CONEXÃO DAS MARCAS</p>
      <h3 className="font-oswald text-2xl font-semibold text-white mb-1">NR Sports — O Hub Central</h3>
      <p className="font-inter text-sm text-gray-500 mb-10">Todas as marcas convergem para um único ecossistema</p>

      <div
        id="marcasNetwork"
        className={`relative w-72 h-72 md:w-80 md:h-80 mx-auto ${inView ? 'net-visible' : ''}`}
      >
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 360" aria-hidden="true">
          {networkNodes.map(node => (
            <line
              key={node.id}
              className="net-line"
              x1="180" y1="180"
              x2={node.svgX} y2={node.svgY}
              stroke={node.color}
              strokeWidth="1.5"
              strokeOpacity=".65"
            />
          ))}
          {networkNodes.map(node => (
            <circle key={node.id} className="net-dot" cx={node.svgX} cy={node.svgY} r="5" fill={node.color} />
          ))}
        </svg>

        {/* Center */}
        <div className="net-center z-10">
          <div className="w-16 h-16 rounded-full bg-dark-300 border border-gold/40 flex flex-col items-center justify-center relative z-10">
            <span className="font-oswald text-lg font-bold text-white leading-none">NJR</span>
            <span className="font-oswald text-sm text-gold font-bold">10</span>
          </div>
          <span className="net-ring r1 absolute" />
          <span className="net-ring r2 absolute" />
        </div>

        {/* Peripheral nodes */}
        {networkNodes.map(node => (
          <button
            key={node.id}
            className={`absolute flex flex-col items-center gap-1.5 group
              ${node.pos === 'n-top'    ? 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 flex-col' : ''}
              ${node.pos === 'n-right'  ? 'right-0 top-1/2 -translate-y-1/2 translate-x-1/4 flex-col' : ''}
              ${node.pos === 'n-bottom' ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 flex-col-reverse' : ''}
              ${node.pos === 'n-left'   ? 'left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 flex-col' : ''}
            `}
            onClick={() => onNodeClick(node.id)}
            aria-label={`Ver ${node.label}`}
          >
            <div
              className="w-12 h-12 rounded-full overflow-hidden border-2 transition-all duration-300 group-hover:scale-110"
              style={{ borderColor: node.color }}
            >
              <img src={node.image} alt={node.label} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <p className="font-inter text-xs text-gray-400 group-hover:text-white transition-colors">{node.label}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function MarcasSection() {
  const [modalId, setModalId] = useState(null)
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section className="py-20 md:py-28 bg-dark-100" id="marcas">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        {/* Hero banner */}
        <div className="relative overflow-hidden rounded-lg p-10 md:p-16 mb-16 text-center border border-gold/15 bg-gradient-to-br from-dark-300 to-dark-100">
          <div className="absolute inset-0 bg-gradient-radial from-gold/5 to-transparent" />
          <div className="relative z-10">
            <img src="/logo_Neymar.png" alt="" width="64" height="64" className="mx-auto mb-4 rounded-full opacity-80" loading="lazy" />
            <p className="section-eyebrow mb-2">UNIVERSO NJR</p>
            <h2 className="font-oswald text-3xl md:text-5xl font-semibold text-white mb-3">Muito além do futebol</h2>
            <p className="font-inter text-gray-400 text-base max-w-lg mx-auto">
              Conheça o universo de marcas que constroem o legado de Neymar Jr.
            </p>
          </div>
        </div>

        {/* Cards grid */}
        <div ref={headerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {marcaCards.map((card, i) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.09 }}
              className="bg-dark-200 border border-white/8 overflow-hidden hover:border-white/20 transition-colors duration-400 flex flex-col"
            >
              {/* Accent bar */}
              <div className="h-0.5 w-full" style={{ background: card.accentColor }} />

              {/* Image */}
              <div className="h-40">
                <DualLayerImg src={card.image} alt={card.title} className="w-full h-full" />
              </div>

              <div className="p-5 flex flex-col flex-1">
                <span className="font-inter text-xs text-gray-500 mb-1">{card.badge}</span>
                <h3 className="font-oswald text-xl font-semibold text-white mb-1">{card.title}</h3>
                <div className="flex flex-wrap gap-1.5 my-2">
                  {card.tags.map(tag => (
                    <span key={tag} className="font-inter text-[10px] px-2 py-0.5 bg-white/8 text-gray-500 rounded">{tag}</span>
                  ))}
                </div>
                <button
                  onClick={() => setModalId(card.id)}
                  className="mt-auto inline-flex items-center gap-1.5 font-inter text-xs font-semibold uppercase tracking-[0.15em] text-gold hover:text-gold-light transition-colors duration-300 self-start"
                >
                  Ver Detalhes <ChevronIcon />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Network visualization */}
        <NetworkViz onNodeClick={setModalId} />
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalId && <MarcaModal modalId={modalId} onClose={() => setModalId(null)} />}
      </AnimatePresence>
    </section>
  )
}
