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
      className="group flex min-h-44 flex-col items-center justify-center border border-white/10 bg-gradient-to-b from-white/[0.035] to-transparent px-4 py-10 text-center transition duration-500 hover:-translate-y-1 hover:border-gold/30"
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
      <div className="editorial-container py-5">
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {statsData.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
