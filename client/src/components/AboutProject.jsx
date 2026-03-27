import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const TECHNOLOGIES = [
  'React 18',
  'Vite 5',
  'TailwindCSS 3',
  'Framer Motion 11',
  'IntersectionObserver API',
  'CSS Grid',
  'Custom Hooks',
  'Lazy Loading',
  'JavaScript ES2023',
  'Node.js / Express',
]

const CHALLENGES = [
  {
    title: 'Animações performáticas',
    description:
      'Implementar animações baseadas em scroll sem comprometer a fluidez em dispositivos móveis, utilizando IntersectionObserver e Framer Motion de forma eficiente e sem re-renders desnecessários.',
  },
  {
    title: 'Hierarquia visual coesa',
    description:
      'Manter identidade visual consistente entre seções de natureza completamente diferente — hero dramático, timeline estruturada, grid de imagens — dentro de um sistema de design único.',
  },
  {
    title: 'Tipografia responsiva de impacto',
    description:
      'Adaptar títulos de grande porte (Bebas Neue em tamanhos extremos) sem perder impacto em telas pequenas, usando escala fluida de rem e breakpoints criteriosos.',
  },
]

const LEARNINGS = [
  'Framer Motion — animações compostas, whileInView e AnimatePresence para modais',
  'Arquitetura de componentes em React com separação clara de dados, lógica e UI',
  'Design system com TailwindCSS — tokens de cor, tipografia e espaçamento customizados',
  'Hooks personalizados para contadores animados com requestAnimationFrame',
  'Princípios de UX de alto nível — hierarquia visual, ritmo, contraste e foco',
  'Mobile-first design com layouts complexos adaptáveis via CSS Grid',
]

export default function AboutProject() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <footer
      ref={ref}
      className="py-24 md:py-32 bg-[#0F0F0F] border-t border-white/8"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <span className="font-inter text-xs text-gold tracking-[0.4em] uppercase">
            Portfólio
          </span>
          <h2 className="font-bebas text-4xl md:text-6xl text-white mt-2 tracking-wide">
            Sobre o Desenvolvimento
          </h2>
          <p className="font-inter text-gray-400 text-sm md:text-base mt-4 max-w-xl leading-relaxed">
            Projeto desenvolvido para demonstrar domínio em front-end moderno —
            React, animações fluidas, design system coeso e código organizado.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-inter text-[10px] text-gold tracking-[0.35em] uppercase mb-7">
              Tecnologias
            </h3>
            <div className="flex flex-wrap gap-2">
              {TECHNOLOGIES.map((tech) => (
                <span
                  key={tech}
                  className="font-inter text-xs px-3 py-1.5 border border-white/12 text-gray-400 hover:border-gold/40 hover:text-white transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-inter text-[10px] text-gold tracking-[0.35em] uppercase mb-7">
              Desafios Enfrentados
            </h3>
            <div className="space-y-6">
              {CHALLENGES.map((c) => (
                <div key={c.title}>
                  <span className="font-inter text-sm text-white font-medium">
                    {c.title}
                  </span>
                  <p className="font-inter text-gray-500 text-xs leading-relaxed mt-1.5">
                    {c.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-inter text-[10px] text-gold tracking-[0.35em] uppercase mb-7">
              O que Foi Aprendido
            </h3>
            <ul className="space-y-3.5">
              {LEARNINGS.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 font-inter text-gray-400 text-xs leading-relaxed"
                >
                  <span className="text-gold mt-0.5 flex-shrink-0 select-none">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 pt-8 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-5"
        >
          <a
            href="#home"
            className="font-bebas text-2xl text-gold tracking-widest hover:text-gold-light transition-colors duration-300"
          >
            NJR 10
          </a>
          <span className="font-inter text-xs text-gray-600 text-center">
            Projeto de portfólio · React + Vite + TailwindCSS ·{' '}
            {new Date().getFullYear()}
          </span>
          <a
            href="#home"
            className="font-inter text-xs text-gray-500 hover:text-white tracking-[0.2em] uppercase transition-colors duration-300"
          >
            Voltar ao topo
          </a>
        </motion.div>
      </div>
    </footer>
  )
}
