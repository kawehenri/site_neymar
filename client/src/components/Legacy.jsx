import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const INSTITUTE_STATS = [
  { value: '3.000+', label: 'Crianças atendidas' },
  { value: '1.800m²', label: 'Complexo esportivo' },
  { value: '2014', label: 'Ano de fundação' },
]

export default function Legacy() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="legado"
      ref={ref}
      className="relative py-28 md:py-44 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/neymar1.jpg')" }}
      />
      <div className="absolute inset-0 bg-[#0A0A0A]/88" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-inter text-xs text-gold tracking-[0.4em] uppercase"
        >
          Legado
        </motion.span>

        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-bebas text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white mt-5 leading-[1.05] tracking-wide text-balance"
        >
          "Não existe nada melhor do que ver uma criança sorrir"
        </motion.blockquote>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="origin-center w-14 h-px bg-gold mx-auto mt-9 mb-9"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.65 }}
          className="font-inter text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
        >
          Além das quatro linhas, Neymar Jr. construiu um legado humano através
          do Instituto Projeto Neymar Jr., que atende milhares de crianças e
          adolescentes em situação de vulnerabilidade social em Praia Grande,
          São Paulo. O compromisso com a próxima geração é a maior das suas
          conquistas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.8 }}
          className="mt-14 grid grid-cols-3 gap-6 max-w-sm mx-auto"
        >
          {INSTITUTE_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="font-bebas text-3xl md:text-4xl text-gold leading-none">
                {stat.value}
              </span>
              <span className="block font-inter text-[10px] text-gray-500 mt-1.5 tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
