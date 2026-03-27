import { motion } from 'framer-motion'

const FADE_UP = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen min-h-[600px] flex items-end overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/fundo_index.jpeg')" }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/65 to-[#0A0A0A]/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/75 via-[#0A0A0A]/20 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-20 md:pb-32">
        <motion.span
          {...FADE_UP(0.3)}
          className="block font-inter text-xs md:text-sm text-gold tracking-[0.4em] uppercase mb-5"
        >
          Neymar da Silva Santos Júnior — NJR 10
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-bebas text-[5rem] sm:text-[8rem] md:text-[11rem] lg:text-[14rem] xl:text-[16rem] leading-[0.85] text-white tracking-wide"
        >
          O<br />LEGADO
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.85 }}
          className="origin-left w-20 h-px bg-gold mt-7 mb-6"
        />

        <motion.p
          {...FADE_UP(1.0)}
          className="font-inter text-gray-300 text-sm md:text-base max-w-sm leading-relaxed"
        >
          De Mogi das Cruzes ao mundo. A trajetória do maior jogador brasileiro
          da sua geração.
        </motion.p>

        <motion.div
          {...FADE_UP(1.2)}
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <a
            href="#carreira"
            className="inline-block px-8 py-3.5 bg-gold text-black font-inter text-xs font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors duration-300"
          >
            Explorar Carreira
          </a>

          <a
            href="#momentos"
            className="group inline-flex items-center gap-3 font-inter text-xs text-gray-400 tracking-[0.2em] uppercase hover:text-white transition-colors duration-300"
          >
            <span className="block w-6 h-px bg-gray-500 group-hover:w-10 group-hover:bg-white transition-all duration-400" />
            Momentos Icônicos
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 right-8 md:right-12 hidden md:flex flex-col items-center gap-3"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-gold/60" />
        <span className="font-inter text-[10px] text-gray-500 tracking-[0.3em] uppercase">
          Scroll
        </span>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  )
}
