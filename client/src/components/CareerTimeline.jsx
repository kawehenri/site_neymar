import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { careerData } from '../data/career'

function TimelineCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isEven = index % 2 === 0

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="relative grid md:grid-cols-2 border-b border-white/8 last:border-0 overflow-hidden group"
    >
      <div
        className={`relative overflow-hidden h-64 md:h-auto min-h-[320px] ${
          isEven ? 'md:order-1' : 'md:order-2'
        }`}
      >
        <img
          src={item.image}
          alt={`${item.club} — ${item.period}`}
          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
          loading="lazy"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-r ${
            isEven
              ? 'from-transparent to-[#111111]/40'
              : 'from-[#111111]/40 to-transparent'
          }`}
        />

        <div className="absolute top-4 left-4 md:top-6 md:left-6">
          <span className="font-bebas text-5xl text-white/10 leading-none select-none">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div
        className={`relative flex flex-col justify-center px-8 md:px-14 py-12 md:py-16 bg-[#111111] ${
          isEven ? 'md:order-2' : 'md:order-1'
        }`}
      >
        <span className="font-inter text-xs text-gold tracking-[0.4em] uppercase">
          {item.country} · {item.period}
        </span>

        <h3 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white mt-2 tracking-wide leading-tight">
          {item.club}
        </h3>

        <div className="w-10 h-px bg-gold mt-5 mb-5 group-hover:w-16 transition-all duration-500" />

        <p className="font-inter text-gray-400 text-sm md:text-base leading-relaxed max-w-md">
          {item.description}
        </p>

        <div className="mt-8 flex items-start gap-10">
          <div>
            <span className="font-bebas text-4xl text-gold leading-none">
              {item.goals}
            </span>
            <span className="block font-inter text-[10px] text-gray-500 tracking-[0.25em] uppercase mt-1">
              Gols
            </span>
          </div>
          <div>
            <span className="font-bebas text-4xl text-gold leading-none">
              {item.assists}
            </span>
            <span className="block font-inter text-[10px] text-gray-500 tracking-[0.25em] uppercase mt-1">
              Assist.
            </span>
          </div>
          {item.titles.length > 0 && (
            <div>
              <span className="font-bebas text-4xl text-gold leading-none">
                {item.titles.length}
              </span>
              <span className="block font-inter text-[10px] text-gray-500 tracking-[0.25em] uppercase mt-1">
                Títulos
              </span>
            </div>
          )}
        </div>

        {item.titles.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {item.titles.map((title) => (
              <span
                key={title}
                className="font-inter text-[10px] px-2.5 py-1 border border-white/10 text-gray-500 tracking-wide"
              >
                {title}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  )
}

export default function CareerTimeline() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section id="carreira" className="bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-14 md:pb-20">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="font-inter text-xs text-gold tracking-[0.4em] uppercase">
            Trajetória
          </span>
          <h2 className="font-bebas text-4xl md:text-6xl text-white mt-2 tracking-wide">
            Uma Carreira de Conquistas
          </h2>
        </motion.div>
      </div>

      <div className="border-t border-white/8">
        {careerData.map((item, index) => (
          <TimelineCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  )
}
