import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { highlightsData } from '../data/highlights'

function Modal({ item, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/92 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 12 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl bg-[#111111] border border-white/10 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-56 md:h-72 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
        </div>

        <div className="px-8 md:px-10 pt-6 pb-9">
          <span className="font-inter text-xs text-gold tracking-[0.4em] uppercase">
            {item.subtitle}
          </span>
          <h3 className="font-bebas text-4xl md:text-5xl text-white mt-1 mb-4 tracking-wide">
            {item.title}
          </h3>
          <p className="font-inter text-gray-400 text-sm md:text-base leading-relaxed">
            {item.description}
          </p>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-black/60 hover:bg-gold hover:text-black text-white text-xl leading-none transition-all duration-300"
          aria-label="Fechar"
        >
          ×
        </button>
      </motion.div>
    </motion.div>
  )
}

function HighlightCard({ item, onOpen, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: (index % 3) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative overflow-hidden cursor-pointer group aspect-[4/3] w-full text-left"
      onClick={() => onOpen(item)}
    >
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

      <div className="absolute inset-0 border border-transparent group-hover:border-gold/20 transition-colors duration-500" />

      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
        <span className="block font-inter text-[10px] text-gold tracking-[0.35em] uppercase mb-1">
          {item.subtitle}
        </span>
        <h4 className="font-bebas text-2xl text-white tracking-wide leading-tight">
          {item.title}
        </h4>
      </div>

      <div className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center border border-white/25 text-white text-base opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gold hover:border-gold hover:text-black">
        +
      </div>
    </motion.button>
  )
}

export default function Highlights() {
  const [selected, setSelected] = useState(null)
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section id="momentos" className="py-20 md:py-28 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-18"
        >
          <span className="font-inter text-xs text-gold tracking-[0.4em] uppercase">
            Memórias
          </span>
          <h2 className="font-bebas text-4xl md:text-6xl text-white mt-2 tracking-wide">
            Momentos Icônicos
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {highlightsData.map((item, index) => (
            <HighlightCard
              key={item.id}
              item={item}
              onOpen={setSelected}
              index={index}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <Modal item={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
