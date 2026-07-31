import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import NavbarSimple from '../components/shared/NavbarSimple'
import FooterSimple from '../components/shared/FooterSimple'
import DualLayerImg from '../components/shared/DualLayerImg'
import ResponsiveImage from '../components/shared/ResponsiveImage'
import PageMeta from '../components/shared/PageMeta'

/* ── Hero ── */
function EspHero() {
  return (
    <header className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-dark-300 via-dark to-dark-100">
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-radial from-gold/8 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 py-32 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <span className="font-inter text-xs tracking-[0.35em] uppercase text-gold mb-4 block">PÁGINA ESPECIAL</span>
          <h1 className="font-oswald text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
            O Lado B<br />
            <span className="text-gold">do Rei</span>
          </h1>
          <p className="font-inter text-gray-300 text-base md:text-lg max-w-md leading-relaxed mb-8">
            Além dos gols, dos dribles e dos títulos — o cara que dança, ri, chora e inspira.
          </p>
          <a
            href="#carisma"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-dark font-inter font-semibold text-sm uppercase tracking-[0.15em] hover:bg-gold-light transition-colors duration-300"
          >
            Explorar
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
            </svg>
          </a>
        </div>
        <div className="w-full max-w-sm flex-shrink-0">
          <ResponsiveImage
            src="/generated/especial-arte-01-600.jpg"
            sources={[
              { type: 'image/avif', srcSet: '/generated/especial-arte-01-400.avif 400w, /generated/especial-arte-01-600.avif 600w, /generated/especial-arte-01-800.avif 800w' },
              { type: 'image/webp', srcSet: '/generated/especial-arte-01-400.webp 400w, /generated/especial-arte-01-600.webp 600w, /generated/especial-arte-01-800.webp 800w' },
            ]}
            alt="Retrato editorial de Neymar Jr."
            className="aspect-[3/4] rounded-editorial border border-gold/20 shadow-gold"
            width="600"
            height="800"
            loading="eager"
          />
        </div>
      </div>
    </header>
  )
}

/* ── Pillars ── */
const PILLARS = [
  {
    title: 'Brincalhão de verdade',
    desc: 'Não é pose. Em treinos, câmeras escondidas, vestiários — Neymar é o primeiro a fazer graça e o último a parar de rir.',
  },
  {
    title: 'Família em primeiro lugar',
    desc: 'O Pai Neymar, a Rafaella, o Davi Lucca, a Mavie — ele nunca escondeu o quanto os seus são sua base e sua motivação.',
  },
  {
    title: 'Espontâneo e autêntico',
    desc: 'Dança depois do gol, manda áudio de WhatsApp, faz live no meio da madrugada. Sem filtro, sem roteiro — só ele mesmo.',
  },
  {
    title: 'Intenso em tudo',
    desc: 'O mesmo cara que dribla três zagueiros também sente cada falta no corpo, torce pelo amigo e celebra como se fosse a última vez.',
  },
]

function CarismaSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section className="py-20 md:py-28 bg-dark" id="carisma">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="font-inter text-xs tracking-[0.35em] uppercase text-gold block mb-2">Personalidade</span>
          <h2 className="font-oswald text-3xl md:text-5xl font-semibold text-white mb-4">
            Mais que talento:<br />é carisma puro
          </h2>
          <p className="font-inter text-gray-400 text-base max-w-xl leading-relaxed">
            Fora das quatro linhas, Neymar Jr. é daqueles caras que iluminam qualquer ambiente que entra. Não tenta ser perfeito — e talvez seja exatamente isso que faz tanta gente se identificar tanto com ele.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.09 }}
              className="bg-dark-200 border border-white/8 p-6 hover:border-gold/30 transition-colors duration-400"
            >
              <div className="font-oswald text-3xl font-bold text-gold/20 mb-3 leading-none">{String(i + 1).padStart(2, '0')}</div>
              <h4 className="font-oswald text-lg font-semibold text-white mb-2">{p.title}</h4>
              <p className="font-inter text-sm text-gray-400 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <blockquote className="border-l-2 border-gold pl-6 py-2">
          <p className="font-playfair italic text-xl md:text-2xl text-gray-200 leading-relaxed">
            "Ele decide o jogo grande… mas também faz piada no vestiário. Dribla o zagueiro e dança depois do gol. É o cara mais humano que o futebol produziu."
          </p>
          <footer className="font-inter text-sm text-gray-500 mt-3 not-italic">— Kawê Henrique</footer>
        </blockquote>
      </div>
    </section>
  )
}

function GalleryItem({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 4) * 0.07 }}
      className="bg-dark-200 border border-white/8 overflow-hidden hover:border-gold/30 transition-colors duration-400"
    >
      <div className="aspect-[3/4]">
        {item.generated ? (
          <ResponsiveImage
            src={`/generated/${item.generated}-600.jpg`}
            sources={[
              { type: 'image/avif', srcSet: `/generated/${item.generated}-400.avif 400w, /generated/${item.generated}-600.avif 600w, /generated/${item.generated}-800.avif 800w` },
              { type: 'image/webp', srcSet: `/generated/${item.generated}-400.webp 400w, /generated/${item.generated}-600.webp 600w, /generated/${item.generated}-800.webp 800w` },
            ]}
            alt={item.title}
            className="h-full w-full"
            width="600"
            height="800"
          />
        ) : (
          <DualLayerImg src={item.src} alt={item.title} className="w-full h-full" />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-oswald text-base font-semibold text-white mb-1">{item.title}</h3>
        <p className="font-inter text-xs text-gray-500 leading-relaxed">{item.desc}</p>
      </div>
    </motion.article>
  )
}

/* ── Galeria ── */
const GALLERY_ITEMS = [
  { src: '/icon1.jpeg', title: 'O sorriso inconfundível',     desc: 'Não importa o momento — o sorriso é sempre genuíno.' },
  { src: '/icon2.jpeg', title: 'A dança é parte do jogo',     desc: 'Comemorar com alegria é a assinatura de quem ama o que faz.' },
  { src: '/icon3.jpeg', title: 'O líder do vestiário',        desc: 'Onde o Ney está, o clima muda. Energia que contagia a todos.' },
  { src: '/icon4.jpeg', title: 'Estilo próprio, sempre',       desc: 'Dentro ou fora do campo, o visual faz parte da identidade.' },
  { src: '/icon5.jpeg', generated: 'especial-arte-01', title: 'Presente em cada detalhe', desc: 'Os momentos mais autênticos acontecem quando a câmera é surpresa.' },
  { src: '/icon6.jpeg', generated: 'especial-arte-02', title: 'Sem filtro, sem script', desc: 'O cara mais real que o futebol produziu. Sem personagem.' },
  { src: '/icon7.jpeg', title: 'Uma geração inteira',         desc: 'Cada criança que sonhou ser jogador, sonhou ser Neymar.' },
  { src: '/icon8.jpg', generated: 'especial-arte-03', title: 'O capítulo não acaba aqui', desc: 'Talento, riso e coração — o Ney que a gente leva pra vida.' },
]

function GaleriaSection() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section className="py-20 md:py-28 bg-dark-100" id="galeria">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="font-inter text-xs tracking-[0.35em] uppercase text-gold block mb-2">Galeria</span>
          <h2 className="font-oswald text-3xl md:text-5xl font-semibold text-white mb-3">
            Momentos que<br />contam a história
          </h2>
          <p className="font-inter text-gray-500 text-base">Cada imagem guarda um pedaço do Ney que os gols sozinhos não mostram.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {GALLERY_ITEMS.map((item, i) => (
            <GalleryItem key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Inspiração ── */
const INSP_LIST = [
  { text: 'Acreditar no próprio estilo quando todos pedem mudança' },
  { text: 'Aguentar pressão, críticas e lesões sem perder a essência' },
  { text: 'Continuar sendo você mesmo no topo do mundo' },
  { text: 'Transformar dificuldade em combustível' },
]

function InspiracaoSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 md:py-28 bg-dark" id="inspiracao">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-inter text-xs tracking-[0.35em] uppercase text-gold block mb-2">Inspiração real</span>
            <h2 className="font-oswald text-3xl md:text-5xl font-semibold text-white mb-5">
              A história dele<br />não é só futebol
            </h2>
            <p className="font-inter text-gray-300 text-base leading-relaxed mb-4">
              É sobre acreditar no próprio estilo quando o mundo inteiro pede que você mude. É sobre aguentar a pressão, as críticas, as lesões — e continuar sendo você mesmo mesmo no topo.
            </p>
            <p className="font-inter text-gray-300 text-base leading-relaxed mb-6">
              Por isso, pra muita gente, Neymar não é só um craque. É prova de que ser autêntico, de verdade, é o drible mais difícil que existe.
            </p>
            <ul className="space-y-3">
              {INSP_LIST.map(item => (
                <li key={item.text} className="flex items-start gap-3 font-inter text-sm text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-1.5" />
                  {item.text}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-dark-200 border border-white/8 overflow-hidden">
              <div className="h-72">
                <DualLayerImg src="/neymar1.jpg" alt="Neymar Jr" className="w-full h-full" />
              </div>
              <div className="p-5 border-t border-gold/20">
                <p className="font-playfair italic text-base text-gray-300">
                  "Pra muita gente, Neymar não é só um craque. É inspiração."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── Videos ── */
function VideosSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section className="py-20 md:py-28 bg-dark-100" id="videos">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="font-inter text-xs tracking-[0.35em] uppercase text-gold block mb-2">Memórias em vídeo</span>
          <h2 className="font-oswald text-3xl md:text-5xl font-semibold text-white mb-3">
            Momentos que<br />nunca saem da cabeça
          </h2>
          <p className="font-inter text-gray-500 text-base">
            Alguns vídeos marcam não pelo que mostram — mas pelo que fazem sentir.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Video 1 */}
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-dark-200 border border-white/8 overflow-hidden hover:border-white/15 transition-colors duration-400"
          >
            <div className="bg-black">
              <video
                src="/video/simplesmente_craque.mp4"
                controls
                preload="metadata"
                className="w-full max-h-56 object-contain"
                aria-label="Vídeo: narração clássica de Neymar no Santos"
              />
            </div>
            <div className="p-6">
              <span className="font-inter text-xs font-semibold text-gold uppercase tracking-widest block mb-2">
                Narração histórica
              </span>
              <h3 className="font-oswald text-xl font-semibold text-white mb-3">A narração que eternizou um talento</h3>
              <p className="font-inter text-sm text-gray-400 leading-relaxed mb-3">
                Num jogo do Santos contra o Internacional, aconteceu algo raro: um narrador rival esqueceu de ser rival. A cada drible, a cada jogada impossível, a surpresa virava admiração involuntária — ao vivo, para o Brasil inteiro ouvir.
              </p>
              <p className="font-inter text-sm text-gray-400 leading-relaxed mb-4">
                Foi ali que o país percebeu: Neymar não era só mais uma promessa. Era algo <strong className="text-gray-200">fora do comum</strong>.
              </p>
              <div className="flex items-start gap-3 p-3 bg-dark-300 border border-white/5">
                <span className="w-0.5 h-full min-h-[1rem] bg-gold flex-shrink-0 rounded-full" />
                <p className="font-inter text-xs text-gray-500">
                  Quando até o narrador do adversário não consegue esconder a admiração, você sabe que está diante de algo especial.
                </p>
              </div>
            </div>
          </motion.article>

          {/* Video 2 */}
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-dark-200 border border-white/8 overflow-hidden hover:border-white/15 transition-colors duration-400"
          >
            <div className="bg-black">
              <video
                src="/video/trava.mp4"
                controls
                preload="metadata"
                className="w-full max-h-56 object-contain"
                aria-label="Vídeo: áudio viral da trava de chuteira"
              />
            </div>
            <div className="p-6">
              <span className="font-inter text-xs font-semibold text-gold uppercase tracking-widest block mb-2">
                Áudio viral
              </span>
              <h3 className="font-oswald text-xl font-semibold text-white mb-3">"Trava de chuteira na panturrilha…"</h3>
              <p className="font-inter text-sm text-gray-400 leading-relaxed mb-3">
                Indignado, meio desacreditado, com aquela voz inconfundível — Neymar descrevendo uma falta sofrida virou meme, áudio de WhatsApp, conteúdo nas redes. Mas escuta com atenção: por trás da zoeira, tem algo real.
              </p>
              <p className="font-inter text-sm text-gray-400 leading-relaxed mb-4">
                É o lado humano de quem está dentro de campo, sentindo cada dividida no corpo, mas <strong className="text-gray-200">continuando mesmo assim</strong>.
              </p>
              <div className="flex items-start gap-3 p-3 bg-dark-300 border border-white/5">
                <span className="w-0.5 h-full min-h-[1rem] bg-gold flex-shrink-0 rounded-full" />
                <p className="font-inter text-xs text-gray-500">
                  Esse áudio mostra o quanto ele vive o jogo com intensidade. Cada entrada é sentida. Cada falta é real.
                </p>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  )
}

/* ── Main ── */
export default function Especial() {
  return (
    <div className="bg-dark text-white min-h-screen">
      <PageMeta
        title="O lado B do Rei — Especial NJR 10"
        description="Carisma, autenticidade e inspiração: uma experiência visual sobre Neymar Jr. além das quatro linhas."
        path="/especial"
        image="/generated/especial-arte-01-800.jpg"
      />
      <NavbarSimple />
      <main id="conteudo">
        <EspHero />
        <CarismaSection />
        <GaleriaSection />
        <InspiracaoSection />
        <VideosSection />
      </main>
      <FooterSimple links={[
        { label: 'Início',   to: '/' },
        { label: 'Carreira', href: '/#carreira' },
        { label: 'Artigo',   to: '/artigo' },
        { label: 'Sobre',    to: '/sobre' },
        { label: 'Contato',  to: '/contato' },
      ]} />
    </div>
  )
}
