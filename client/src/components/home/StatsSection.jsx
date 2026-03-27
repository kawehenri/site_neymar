import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { statsData } from '../../data/homeData'
import { useCountUp } from '../../hooks/useCountUp'

function StatItem({ stat, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const count = useCountUp(stat.count, 1600, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center justify-center text-center py-10 px-4 border border-white/5 hover:border-gold/30 transition-colors duration-500 group"
    >
      <span className="font-oswald text-5xl md:text-6xl font-bold text-gold leading-none group-hover:text-gold-light transition-colors duration-300">
        {count}{stat.suffix}
      </span>
      <span className="font-inter text-sm text-gray-400 mt-3 tracking-wide">
        {stat.label}
      </span>
    </motion.div>
  )
}

export default function StatsSection() {
  return (
    <section className="bg-dark-100" id="stats">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-4">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
