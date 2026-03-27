import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { statsData } from '../data/stats'
import { useCountUp } from '../hooks/useCountUp'

function StatCard({ stat, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useCountUp(stat.value, 2400, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center px-6 py-12 md:py-16 border-t border-white/10 hover:border-gold/30 transition-colors duration-500 group"
    >
      <span className="font-bebas text-6xl md:text-7xl lg:text-8xl text-gold leading-none tracking-wide group-hover:text-gold-light transition-colors duration-300">
        {count}
        {stat.suffix}
      </span>
      <span className="font-inter text-white text-sm font-medium mt-4 tracking-wide">
        {stat.label}
      </span>
      <span className="font-inter text-gray-500 text-xs mt-1.5 tracking-wide">
        {stat.description}
      </span>
    </motion.div>
  )
}

export default function Stats() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section id="estatisticas" className="py-20 md:py-28 bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-18"
        >
          <span className="font-inter text-xs text-gold tracking-[0.4em] uppercase">
            Números
          </span>
          <h2 className="font-bebas text-4xl md:text-6xl text-white mt-2 tracking-wide">
            Uma Carreira em Dados
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-white/10">
          {statsData.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
