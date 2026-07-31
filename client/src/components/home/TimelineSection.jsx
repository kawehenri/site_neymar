import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import DualLayerImg from '../shared/DualLayerImg'
import ResponsiveImage from '../shared/ResponsiveImage'
import { timelineData } from '../../data/homeData'

function TimelineMedia({ entry }) {
  if (entry.year === '2016') {
    return (
      <ResponsiveImage
        src="/generated/timeline-2016-720.jpg"
        sources={[
          { type: 'image/avif', srcSet: '/generated/timeline-2016-480.avif 480w, /generated/timeline-2016-720.avif 720w, /generated/timeline-2016-960.avif 960w' },
          { type: 'image/webp', srcSet: '/generated/timeline-2016-480.webp 480w, /generated/timeline-2016-720.webp 720w, /generated/timeline-2016-960.webp 960w' },
        ]}
        sizes="(min-width: 768px) 42vw, 100vw"
        alt={entry.title}
        className="h-full w-full"
        width="720"
        height="540"
      />
    )
  }
  return <DualLayerImg src={entry.image} alt={entry.title} className="h-full w-full" />
}

function MobileTLItem({ entry, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="relative"
    >
      <div className="absolute -left-[2.35rem] top-6 w-4 h-4 rounded-full bg-gold border-2 border-dark" />
      <div className="bg-dark-200 border border-white/8 overflow-hidden">
        <div className="relative aspect-[4/3]">
          <TimelineMedia entry={entry} />
          <span className="absolute top-3 right-3 font-oswald text-sm font-bold px-2.5 py-0.5 bg-gold text-dark">
            {entry.year}
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-oswald text-lg font-semibold text-white mb-2">{entry.title}</h3>
          <p className="font-inter text-sm text-gray-400 leading-relaxed mb-2">{entry.desc}</p>
          <ul className="space-y-1">
            {entry.items.map(item => (
              <li key={item} className="font-inter text-xs text-gray-500 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

function TimelineEntry({ entry, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isLeft = entry.side === 'left'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex items-start gap-0 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Card */}
      <div className={`w-[calc(50%-2rem)] bg-dark-200 border border-white/8 overflow-hidden hover:border-gold/30 transition-colors duration-500 ${
        isLeft ? 'mr-8' : 'ml-8'
      }`}>
        <div className="relative aspect-[4/3]">
          <TimelineMedia entry={entry} />
          <div className={`absolute top-3 z-10 ${isLeft ? 'right-3' : 'left-3'}`}>
            <span className="font-oswald text-base font-bold px-3 py-1 bg-gold text-dark">
              {entry.year}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-oswald text-xl font-semibold text-white mb-2">{entry.title}</h3>
          <p className="font-inter text-sm text-gray-400 leading-relaxed mb-3">{entry.desc}</p>
          <ul className="space-y-1">
            {entry.items.map(item => (
              <li key={item} className="font-inter text-xs text-gray-500 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Center dot */}
      <div className="absolute left-1/2 top-8 -translate-x-1/2 flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-gold border-2 border-dark z-10" />
      </div>

      {/* Spacer for opposite side */}
      <div className="w-[calc(50%-2rem)]" />
    </motion.div>
  )
}

export default function TimelineSection() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section className="editorial-section bg-dark-100" id="timeline">
      <div className="editorial-container">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-eyebrow mb-2">HISTÓRIA</p>
          <h2 className="section-title-lg">Linha do Tempo</h2>
          <p className="font-inter text-gray-500 mt-3">Os capítulos mais marcantes de uma carreira lendária</p>
        </motion.div>

        {/* Desktop timeline */}
        <div className="hidden md:block relative">
          {/* Center axis */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-gold/30" />

          <div className="flex flex-col gap-10">
            {timelineData.map((entry, i) => (
              <TimelineEntry key={entry.year} entry={entry} index={i} />
            ))}
          </div>
        </div>

        {/* Mobile timeline */}
        <div className="md:hidden relative pl-8 border-l border-gold/30 flex flex-col gap-8">
          {timelineData.map((entry, i) => (
            <MobileTLItem key={entry.year} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
