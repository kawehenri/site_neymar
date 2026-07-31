import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import NavbarSimple from '../components/shared/NavbarSimple'
import FooterSimple from '../components/shared/FooterSimple'
import Carousel from '../components/shared/Carousel'
import DualLayerImg from '../components/shared/DualLayerImg'
import ResponsiveImage from '../components/shared/ResponsiveImage'
import PageMeta from '../components/shared/PageMeta'

/* ── TOC ── */
const TOC_ITEMS = [
  { href: '#infancia',         label: 'Infância e Origem' },
  { href: '#santos',           label: 'Santos FC' },
  { href: '#barcelona',        label: 'FC Barcelona' },
  { href: '#psg',              label: 'PSG' },
  { href: '#outras-fases',     label: 'Al-Hilal & Santos' },
  { href: '#selecao',          label: 'Seleção Brasileira' },
  { href: '#instituto',        label: 'Instituto Neymar Jr.' },
  { href: '#familia',          label: 'Família' },
  { href: '#estilo',           label: 'Estilo & Personalidade' },
  { href: '#estatisticas',     label: 'Estatísticas' },
  { href: '#timeline-resumida',label: 'Linha do Tempo' },
  { href: '#conclusao',        label: 'Conclusão' },
]

function ArticleHero() {
  return (
    <header className="relative flex min-h-[640px] items-end overflow-hidden md:h-[82vh]">
      <ResponsiveImage
        src="/generated/hero-artigo-1440.jpg"
        sources={[
          { type: 'image/avif', srcSet: '/generated/hero-artigo-960.avif 960w, /generated/hero-artigo-1440.avif 1440w, /generated/hero-artigo-1920.avif 1920w' },
          { type: 'image/webp', srcSet: '/generated/hero-artigo-960.webp 960w, /generated/hero-artigo-1440.webp 1440w, /generated/hero-artigo-1920.webp 1920w' },
        ]}
        sizes="100vw"
        alt="Neymar Jr. em retrato editorial"
        className="absolute inset-0 h-full w-full"
        width="1920"
        height="1080"
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/50 to-transparent" />

      <div className="editorial-container relative z-10 pb-14 md:pb-20">
        <span className="inline-block font-inter text-xs font-semibold uppercase tracking-[0.25em] text-gold px-3 py-1 border border-gold/40 mb-4">
          Artigo Especial
        </span>
        <h1 className="max-w-4xl font-oswald text-[clamp(3.25rem,8vw,7.5rem)] font-bold leading-[0.88] tracking-[-0.035em] text-white mb-5">
          Neymar Jr:<br />
          <em className="font-playfair font-normal italic text-gray-200">O Legado de um Príncipe</em>
        </h1>
        <p className="font-inter text-gray-300 text-base max-w-xl leading-relaxed mb-5">
          Da infância humilde em Mogi das Cruzes ao topo do futebol mundial — a história mais emocionante do esporte brasileiro
        </p>
        <div className="flex flex-wrap items-center gap-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
              <img src="/perfil.jpeg" alt="Kawê Henrique" className="w-full h-full object-cover" />
            </div>
            <div>
              <strong className="font-inter text-sm text-white block">Kawê Henrique</strong>
              <span className="font-inter text-xs text-gray-400">Técnico em Desenvolvimento de Sistemas · Fã declarado do Ney</span>
            </div>
          </div>
          <span className="font-inter text-xs text-gray-500">Leitura: ~12 min</span>
        </div>
      </div>
    </header>
  )
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-white/5" aria-hidden="true">
      <div className="h-full bg-gold" style={{ width: `${progress}%` }} />
    </div>
  )
}

/* ── Section label ── */
function SectionLabel({ number, tag }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-oswald text-4xl font-bold text-white/10 leading-none">{number}</span>
      <span className="font-inter text-xs font-semibold uppercase tracking-[0.25em] text-gold px-2.5 py-0.5 border border-gold/30">
        {tag}
      </span>
    </div>
  )
}

/* ── Quote ── */
function Quote({ text, author, variant = 'default' }) {
  return (
    <blockquote className={`my-8 pl-5 border-l-2 ${
      variant === 'green' ? 'border-emerald-500' :
      variant === 'gold-lg' ? 'border-gold' : 'border-gold'
    }`}>
      <p className={`font-playfair italic leading-relaxed text-gray-200 ${
        variant === 'gold-lg' ? 'text-xl md:text-2xl' : 'text-lg'
      }`}>"{text}"</p>
      <footer className="font-inter text-sm text-gray-500 mt-2 not-italic">— {author}</footer>
    </blockquote>
  )
}

/* ── Stats mini ── */
function StatsMini({ items }) {
  return (
    <div className="grid grid-cols-3 gap-3 my-8 p-5 bg-dark-300 border border-white/8">
      {items.map(item => (
        <div key={item.label} className="text-center">
          <span className="font-oswald text-2xl md:text-3xl font-bold text-gold block leading-none">{item.value}</span>
          <span className="font-inter text-xs text-gray-500 mt-1.5 block">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

/* ── Mini timeline ── */
const MINI_TL = [
  { year: '1992', title: 'Nasce Neymar Jr.', desc: '5 de fevereiro, em Mogi das Cruzes, São Paulo' },
  { year: '2003', title: 'Santos FC — Categorias de Base', desc: 'Começa a jornada no clube que o revelaria ao mundo' },
  { year: '2009', title: 'Estreia Profissional', desc: '7 de março — 17 anos e uma promessa que virou realidade instantânea' },
  { year: '2011', title: 'Libertadores da América', desc: 'Conquista o maior título do futebol sul-americano pelo Santos' },
  { year: '2013', title: 'FC Barcelona + Copa das Confederações', desc: 'Transferência para a Catalunha e o MSN. Melhor jogador da Copa das Confederações' },
  { year: '2015', title: 'Champions League', desc: 'MSN vence a Juventus — Neymar campeão europeu aos 23 anos' },
  { year: '2016', title: 'Ouro Olímpico — Rio 2016', desc: 'O pênalti decisivo no Maracanã. O Brasil chorou de alegria' },
  { year: '2017', title: 'Paris Saint-Germain — €222M', desc: 'A transferência que reescreveu a história do futebol' },
  { year: '2020', title: 'Final da Champions pelo PSG', desc: 'Leva o clube à primeira final europeia da história' },
  { year: '2023', title: 'Maior Artilheiro do Brasil + Al-Hilal', desc: 'Supera Pelé com 79+ gols. Novo capítulo na Arábia Saudita' },
  { year: '2025', title: 'Retorno ao Santos', desc: 'O filho pródigo volta para casa — o futebol arte continua' },
]

/* ── Full stats ── */
const FULL_STATS = [
  { num: '450+', sup: '',  label: 'Gols na carreira',      detail: 'Em clubes e seleção' },
  { num: '700+', sup: '',  label: 'Jogos disputados',       detail: 'Como profissional' },
  { num: '79',   sup: '+', label: 'Gols pela Seleção',      detail: 'Maior artilheiro da história' },
  { num: '30',   sup: '+', label: 'Títulos conquistados',   detail: 'Clubes e seleção' },
  { num: '€222', sup: 'M', label: 'Transferência recorde',  detail: 'Ainda o maior da história' },
  { num: '4',    sup: '',  label: 'Grandes clubes',         detail: 'Santos, Barça, PSG, Al-Hilal' },
]

/* ── Sidebar ── */
function Sidebar({ activeId }) {
  return (
    <aside className="hidden xl:flex flex-col gap-5 sticky top-24 self-start">
      {/* TOC */}
      <div className="bg-dark-200 border border-white/8 p-5">
        <h4 className="font-oswald text-base font-semibold text-white mb-4 tracking-wide">Índice do Artigo</h4>
        <nav className="flex flex-col gap-1">
          {TOC_ITEMS.map(item => (
            <a
              key={item.href}
              href={item.href}
              className={`font-inter text-xs py-1.5 px-2 transition-all duration-200 border-l-2 ${
                activeId === item.href.slice(1)
                  ? 'border-gold text-gold bg-gold/5'
                  : 'border-transparent text-gray-500 hover:text-white hover:border-white/30'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Facts */}
      <div className="bg-dark-200 border border-white/8 p-5">
        <h4 className="font-oswald text-base font-semibold text-white mb-4 tracking-wide">Resumo de Carreira</h4>
        <ul className="space-y-2.5">
          {[
            ['Nome completo', 'Neymar da Silva Santos Jr.'],
            ['Nascimento', '05/02/1992'],
            ['Naturalidade', 'Mogi das Cruzes, SP'],
            ['Posição', 'Atacante / Meia'],
            ['Pé dominante', 'Destro'],
            ['Gols seleção', '79+'],
            ['Transferência', '€222M (recorde)'],
          ].map(([k, v]) => (
            <li key={k} className="flex justify-between gap-2">
              <span className="font-inter text-xs text-gray-500">{k}</span>
              <strong className="font-inter text-xs text-gray-300 text-right">{v}</strong>
            </li>
          ))}
        </ul>
      </div>

      <Link to="/" className="flex items-center gap-2 font-inter text-xs uppercase tracking-[0.18em] text-gray-500 hover:text-gold transition-colors duration-300 px-1">
        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg>
        Ver site completo
      </Link>
    </aside>
  )
}

/* ── Main Artigo page ── */
export default function Artigo() {
  const [activeId, setActiveId] = useState('')

  // IntersectionObserver for TOC
  useEffect(() => {
    const ids = TOC_ITEMS.map(t => t.href.slice(1))
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id) })
    }, { threshold: 0.25 })
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  // Scroll reveal — conteúdo começa visível; só anima se o usuário permitir motion
  useEffect(() => {
    const prefers = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefers) return

    const root = document.documentElement
    root.classList.add('reveal-ready')

    const els = document.querySelectorAll('.will-reveal')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed', 'visible')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -8% 0px' }
    )

    els.forEach((el) => {
      const rect = el.getBoundingClientRect()
      const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0
      if (inView) {
        el.classList.add('revealed', 'visible')
      } else {
        obs.observe(el)
      }
    })

    return () => {
      obs.disconnect()
      root.classList.remove('reveal-ready')
    }
  }, [])

  const p = 'font-inter text-gray-300 text-base leading-relaxed mb-5'

  return (
    <div className="bg-dark text-white min-h-screen">
      <PageMeta
        title="Neymar Jr.: o legado de um príncipe — NJR 10"
        description="Uma reportagem autoral sobre a origem, as conquistas, o impacto cultural e o legado de Neymar Jr."
        path="/artigo"
        image="/generated/hero-artigo-1440.jpg"
        type="article"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Neymar Jr.: O Legado de um Príncipe',
          author: { '@type': 'Person', name: 'Kawê Henrique' },
          image: 'https://ousadiayalegria.site/generated/hero-artigo-1440.jpg',
          mainEntityOfPage: 'https://ousadiayalegria.site/artigo',
        }}
      />
      <ReadingProgress />
      <NavbarSimple />
      <ArticleHero />

      <main id="conteudo" className="editorial-container py-12">
        <details className="mb-10 border border-white/10 bg-dark-200 p-5 xl:hidden">
          <summary className="cursor-pointer font-oswald text-lg text-white">Índice do artigo</summary>
          <nav className="mt-4 grid gap-2 sm:grid-cols-2">
            {TOC_ITEMS.map(item => <a key={item.href} href={item.href} className="font-inter text-sm text-gray-400 hover:text-gold">{item.label}</a>)}
          </nav>
        </details>
        <div className="grid gap-12 xl:grid-cols-[1fr_280px]">
        {/* Article body */}
        <article className="min-w-0">

          {/* Intro */}
          <section className="mb-16 will-reveal" id="intro">
            <p className="article-lead">
              Existem jogadores de futebol, e depois existe <strong>Neymar Jr.</strong> Tem momentos em que assistir ao Ney jogar é quase uma experiência religiosa — aquele drible desconcertante, aquela rolinha no momento menos esperado, aquele sorriso largo depois de um gol impossível. Eu cresci vendo grandes jogadores, mas posso dizer com absoluta convicção: <mark className="bg-gold/20 text-gold-light px-1">Neymar Jr. é o melhor jogador brasileiro da era pós-Pelé</mark>, e discutir isso é quase uma heresia pra mim.
            </p>
            <p className={p}>
              Sou Kawê Henrique, técnico em desenvolvimento de sistemas, flamenguista roxo e, sim, um fã apaixonado do craque. Este artigo não é um texto neutro de enciclopédia — é uma declaração de amor ao futebol arte personificado num único ser humano.
            </p>
            <Quote text="Quando o Neymar recebe a bola, o estádio inteiro prende a respiração. Isso é um dom que não se ensina." author="Kawê Henrique" />
          </section>

          {/* 01 Infância */}
          <section className="mb-16 will-reveal" id="infancia">
            <SectionLabel number="01" tag="Origem" />
            <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white mb-6">A Criança de Mogi das Cruzes que Sonhava Grande</h2>
            <div className="mb-5">
              <DualLayerImg src="/editorial/artigo-infancia.png" alt="Neymar Jr na infância" className="w-full aspect-[4/3] rounded-editorial" />
              <p className="font-inter text-xs text-gray-500 text-center mt-2 italic">O jovem Neymar nas categorias de base do Santos — desde cedo, a bola era uma extensão do seu corpo</p>
            </div>
            <p className={p}>
              <strong>Neymar da Silva Santos Júnior</strong> nasceu no dia <strong>5 de fevereiro de 1992</strong>, em Mogi das Cruzes, São Paulo. Filho de Neymar Santos (Pai Ney) e Nadine Santos, o pequeno Juninho cresceu num ambiente de dificuldades financeiras reais. Não estou falando de uma pobreza romantizada — era luta de verdade, contas apertadas, mudanças frequentes.
            </p>
            <p className={p}>
              Mas a bola entrou em campo cedo. Muito cedo. O pai percebeu antes de qualquer técnico que o filho não era apenas talentoso — era <em>diferente</em>. Uma relação com a bola que parecia instintiva, quase sobrenatural. Com seis anos já jogava em escolinhas. Com oito, chamava a atenção de todo mundo em Praia Grande.
            </p>
            <p className={p}>
              Aos <strong>11 anos</strong>, o Santos Futebol Clube bateu à porta — o mesmo clube que revelou Pelé. A comparação, inevitável desde cedo, jamais pesou nos ombros dele. Pelo contrário, parecia que Neymar usava essa pressão como combustível.
            </p>
            <Quote text="Meu pai foi meu primeiro técnico, meu primeiro fã e minha maior inspiração. Tudo que sou, devo a ele." author="Neymar Jr." />
          </section>

          {/* 02 Santos */}
          <section className="mb-16 will-reveal" id="santos">
            <SectionLabel number="02" tag="2009 – 2013" />
            <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white mb-6">Santos FC: Onde Nasceu uma Lenda</h2>
            <Carousel slides={[
              { src: '/editorial/artigo-santos-01.png', caption: 'Neymar com a camisa do Santos — o clube que revelou o maior talento do futebol brasileiro da sua geração' },
              { src: '/santos2.jpeg', caption: 'Os dribles impossíveis que deixavam a Vila Belmiro em delírio absoluto a cada partida', position: 'center top' },
              { src: '/editorial/artigo-santos-02.png', caption: 'Copa Libertadores 2011 — o maior título do futebol sul-americano conquistado aos 19 anos' },
            ]} />
            <p className={`${p} mt-5`}>
              No dia <strong>7 de março de 2009</strong>, um garoto de 17 anos entrou em campo pela primeira vez como profissional. O Santos jogava contra o Oeste pelo Campeonato Paulista. Em questões de minutos ficou claro que aquilo não era uma estreia normal. Era uma <em>apresentação</em>.
            </p>
            <p className={p}>
              Com 19 anos, conquistou a <strong>Copa Libertadores da América de 2011</strong>. Dribles sem sentido lógico. Gols de placa. Neymar não era apenas eficaz — ele era <em>bonito</em> de se ver. O herdeiro de uma tradição que muita gente temia que estivesse se perdendo.
            </p>
            <p className={p}>
              Nesse período no Santos, Neymar marcou mais de <strong>130 gols</strong> pelo clube, conquistou a Copa do Brasil, a Recopa Sul-Americana e dois Campeonatos Paulistas. Foi reconhecido como o melhor jogador do continente por dois anos consecutivos.
            </p>
            <StatsMini items={[
              { value: '130+', label: 'Gols pelo Santos' },
              { value: '1',    label: 'Libertadores (2011)' },
              { value: '2×',   label: 'Melhor da América' },
            ]} />
          </section>

          {/* 03 Barcelona */}
          <section className="mb-16 will-reveal" id="barcelona">
            <SectionLabel number="03" tag="2013 – 2017" />
            <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white mb-6">Barcelona: O Trio que Parou o Mundo</h2>
            <Carousel slides={[
              { src: '/editorial/artigo-barca-01.png', caption: 'Neymar Jr. com a camisa blaugrana — o início de uma era dourada no coração do Camp Nou' },
              { src: '/editorial/artigo-barca-02.png', caption: 'O lendário trio MSN — Messi, Suárez e Neymar marcaram 122 gols juntos na temporada 2014/15' },
              { src: '/editorial/artigo-barca-03.png', caption: 'UEFA Champions League 2015 — Neymar levanta o troféu mais cobiçado do futebol europeu em Berlim' },
              { src: '/barca4.jpeg', caption: '105 gols e 76 assistências em 186 jogos — um legado eterno escrito em azul e grená', position: 'center top' },
            ]} />
            <p className={`${p} mt-5`}>
              Em junho de 2013, Neymar assinou com o <strong>FC Barcelona</strong>. O Camp Nou recebeu seu novo rei com os braços abertos. Mas o maior presente seria o que aconteceria quando ele encontrasse <strong>Lionel Messi e Luis Suárez</strong>. O famoso trio <strong>MSN</strong> não foi apenas um time de futebol — foi um fenômeno cultural.
            </p>
            <p className={p}>
              Na temporada <strong>2014/2015</strong>, o MSN marcou <strong>122 gols</strong> juntos. O Barcelona conquistou La Liga, a Copa do Rei e a <strong>UEFA Champions League</strong>. Neymar foi decisivo na final, marcando um gol e dando uma assistência na vitória por 3 a 1 sobre a Juventus em Berlim.
            </p>
            <Quote text="O MSN foi o melhor ataque que já vi na minha vida. Neymar naquele trio não era coadjuvante — era parte indispensável de algo que só acontece uma vez na história." author="Kawê Henrique" />
            <StatsMini items={[
              { value: '105',  label: 'Gols pelo Barça' },
              { value: '76',   label: 'Assistências' },
              { value: '1',    label: 'Champions (2015)' },
            ]} />
          </section>

          {/* 04 PSG */}
          <section className="mb-16 will-reveal" id="psg">
            <SectionLabel number="04" tag="2017 – 2023" />
            <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white mb-6">PSG: O Recorde de €222 Milhões e a Era Paris</h2>
            <div className="mb-5">
              <DualLayerImg src="/a_chegada.jpeg" alt="Chegada de Neymar ao PSG" className="w-full aspect-[4/3] rounded-editorial" />
              <p className="font-inter text-xs text-gray-500 text-center mt-2 italic">A chegada histórica ao Paris Saint-Germain em agosto de 2017 — o dia em que o futebol mudou para sempre</p>
            </div>
            <p className={p}>
              <strong>3 de agosto de 2017.</strong> O Paris Saint-Germain anunciou oficialmente a contratação de Neymar Jr. por <strong>222 milhões de euros</strong> — ativando a cláusula de rescisão do Barcelona e reescrevendo para sempre o mercado de transferências. Um número tão absurdo que muita gente achou que era fake news.
            </p>
            <Carousel slides={[
              { src: '/editorial/artigo-psg-02.png', caption: 'Neymar dominando Paris — o número 10 que transformou o PSG em referência global do futebol' },
              { src: '/editorial/artigo-psg-01.png', caption: '118+ gols e 77+ assistências — números extraordinários apesar das batalhas constantes contra lesões' },
              { src: '/psg3.jpeg', caption: 'Final da Champions League 2020 em Lisboa — Neymar levou o PSG à maior final da história do clube', position: 'center top' },
            ]} />
            <p className={`${p} mt-5`}>
              Nos seis anos no PSG, Neymar marcou mais de <strong>118 gols</strong> e distribuiu mais de <strong>77 assistências</strong>. Mesmo com lesões severas, levou o PSG à <strong>final da Champions League de 2020</strong> — a primeira final do clube na história.
            </p>
            <StatsMini items={[
              { value: '118+', label: 'Gols pelo PSG' },
              { value: '5×',   label: 'Ligue 1' },
              { value: '€222M',label: 'Recorde mundial' },
            ]} />
          </section>

          {/* 05 Al-Hilal & Santos */}
          <section className="mb-16 will-reveal" id="outras-fases">
            <SectionLabel number="05" tag="2023 – Hoje" />
            <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white mb-6">Al-Hilal, Lesões e o Retorno ao Lar</h2>
            <p className="font-inter text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Capítulo Árabe</p>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <DualLayerImg src="/arabia1.jpeg" alt="Neymar Al-Hilal" className="w-full aspect-[4/3] rounded-editorial" />
              <DualLayerImg src="/arabia2.jpeg" alt="Neymar Al-Hilal treino" className="w-full aspect-[4/3] rounded-editorial" />
            </div>
            <p className={p}>
              Em agosto de 2023, Neymar assinou com o <strong>Al-Hilal</strong>. O início foi promissor, mas o destino conspirou: ruptura do ligamento cruzado anterior do joelho esquerdo em outubro de 2023, durante jogo pela Seleção contra o Uruguai. Mais de um ano de recuperação e espera.
            </p>
            <p className="font-inter text-sm font-semibold text-gray-400 uppercase tracking-widest my-4">O Filho Pródigo Volta para Casa</p>
            <Carousel slides={[
              { src: '/a_volta.jpeg', caption: 'A volta — o momento em que Neymar cruzou a fronteira de volta para o futebol brasileiro', position: 'center top' },
              { src: '/santos_volta1.jpeg', caption: 'Santos 2025 — o filho pródigo de volta à Vila Belmiro, onde tudo começou', position: 'center top' },
              { src: '/santos_volta2.jpeg', caption: 'A recepção da torcida santista foi um dos momentos mais emocionantes do futebol brasileiro recente', position: 'center top' },
            ]} />
            <p className={`${p} mt-5`}>
              Em 2025, Neymar voltou para casa — para o clube que o viu nascer, para a torcida que sempre o amou. Não era mais o menino de 17 anos cheio de futuro. Era um homem de 33 anos, carregado de história. Mas com a mesma chama viva no olhar.
            </p>
            <Quote text="Voltar ao Santos não foi uma despedida — foi um recomeço. O Neymar mostrou que o futebol ainda corre nas suas veias com a mesma intensidade de sempre." author="Kawê Henrique" />
          </section>

          {/* 06 Seleção */}
          <section className="mb-16 will-reveal" id="selecao">
            <SectionLabel number="06" tag="Seleção" />
            <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white mb-6">A Camisa Amarela: O Maior Artilheiro da História do Brasil</h2>
            <DualLayerImg src="/brasil1.jpeg" alt="Neymar Seleção Brasileira" className="mb-5 w-full aspect-[4/3] rounded-editorial" />
            <p className={p}>
              É com a camisa da <strong>Seleção Brasileira</strong> que sua história ganha uma dimensão ainda maior. Ele estreou em 2010, aos 18 anos, e desde então tornou-se o rosto mais reconhecível do futebol brasileiro no mundo.
            </p>
            <p className="font-inter text-sm font-semibold text-gray-400 uppercase tracking-widest my-4">Copa das Confederações 2013</p>
            <DualLayerImg src="/copa_das_confederacoes.jpeg" alt="Copa das Confederações 2013" className="mb-4 w-full aspect-[4/3] rounded-editorial" />
            <p className={p}>
              Neymar liderou um Brasil que venceu a Espanha por <strong>3 a 0</strong> na final do Maracanã. Eleito o melhor jogador e artilheiro do torneio com 4 gols, mostrou ao mundo que estava pronto para ser o portador da bandeira amarela.
            </p>
            <p className="font-inter text-sm font-semibold text-gray-400 uppercase tracking-widest my-4">Copas do Mundo</p>
            <Carousel slides={[
              { src: '/editorial/artigo-copa-01.png', caption: 'Toda a esperança de uma nação depositada sobre um único par de ombros — Neymar em cada Copa do Mundo' },
              { src: '/editorial/artigo-copa-02.png', caption: '2014 — A Copa da dor: a joelhada criminosa de Zúñiga que deixou o país de coração partido nas semifinais' },
              { src: '/copa3.jpeg', caption: 'Com a faixa de capitão e o peso de uma nação — Neymar em campo pela canarinho nunca foi meia medida', position: 'center top' },
            ]} />
            <p className={`${p} mt-5`}>
              A <strong>Copa do Mundo de 2014</strong> no Brasil ficará para sempre marcada — Neymar sofreu uma fratura na vértebra após uma joelhada criminosa, contribuindo para o traumático 7 a 1 contra a Alemanha. Ver Neymar chorar de maca foi uma das cenas mais tristes que o futebol brasileiro já produziu.
            </p>
            <p className="font-inter text-sm font-semibold text-gray-400 uppercase tracking-widest my-4">Olimpíadas Rio 2016 — O Ouro que Faltava</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <DualLayerImg src="/editorial/timeline-2016.png" alt="Neymar Olimpíadas Rio 2016" className="w-full aspect-[4/3] rounded-editorial" />
              <DualLayerImg src="/olimpiadas2.jpeg" alt="Ouro olímpico" className="w-full aspect-[4/3] rounded-editorial" />
            </div>
            <p className={p}>
              Nas <strong>Olimpíadas de 2016</strong>, Neymar carregou o Brasil nas costas. Na final contra a Alemanha, a partida foi para os pênaltis. Com 70 mil pessoas no Maracanã, ele correu, parou, <em>esperou</em> o goleiro se jogar, e jogou a bola no canto contrário. O Brasil tinha, finalmente, o ouro olímpico no futebol masculino.
            </p>
            <p className={p}>
              Em novembro de <strong>2023</strong>, Neymar marcou seu gol de número <strong>79</strong> pela Seleção, superando o eterno Pelé e tornando-se o <strong>maior artilheiro da história da seleção brasileira</strong>.
            </p>
            <Quote text="Superar Pelé é algo que vai além do futebol. É carregar a história de um país nas costas e fazer bonito mesmo assim." author="Kawê Henrique" />
            <StatsMini items={[
              { value: '79+', label: 'Gols pela Seleção' },
              { value: '1',   label: 'Ouro Olímpico 2016' },
              { value: '4',   label: 'Copas do Mundo' },
            ]} />
          </section>

          {/* 07 Instituto */}
          <section className="mb-16 will-reveal" id="instituto">
            <SectionLabel number="07" tag="Legado Social" />
            <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white mb-6">Instituto Projeto Neymar Jr.: Transformando Vidas em Praia Grande</h2>
            <Carousel slides={[
              { src: '/instituto1.jpg', caption: 'Instituto Projeto Neymar Jr. — uma das mais belas obras sociais já construídas por um atleta brasileiro', position: 'center' },
              { src: '/instituto2.jpeg', caption: 'Mais de 2.700 crianças atendidas por turno — o legado que vai muito além das quatro linhas do campo', position: 'center' },
              { src: '/instituto3.jpeg', caption: 'Futebol, dança, música, capoeira e reforço escolar — o Instituto forma cidadãos, não apenas atletas', position: 'center' },
            ]} />
            <p className={`${p} mt-5`}>
              O <strong>Instituto Projeto Neymar Jr.</strong> é simplesmente um dos maiores legados sociais deixados por um atleta brasileiro ainda em atividade. Criado em <strong>2014</strong>, em Praia Grande, atende mais de <strong>2.700 crianças e adolescentes por turno</strong> — filhos de famílias de baixa renda que encontram não apenas aulas de esportes, mas um ambiente de acolhimento e possibilidade.
            </p>
            <p className={p}>
              São atividades de futebol, judô, natação, dança, capoeira, teatro e música. São reforço escolar e três refeições diárias para crianças que, em muitos casos, dependem disso.
            </p>
            <Quote text="O Instituto é a prova de que o Neymar entende que o futebol foi apenas o meio — o fim é sempre o ser humano. Isso transforma um ídolo em herói." author="Kawê Henrique" variant="green" />
          </section>

          {/* 08 Família */}
          <section className="mb-16 will-reveal" id="familia">
            <SectionLabel number="08" tag="Vida Pessoal" />
            <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white mb-6">Família: A Base Que Sustenta o Craque</h2>
            <p className={p}>
              Por trás dos gols e dos títulos, existe um ser humano profundamente conectado à sua família. Neymar sempre foi transparente sobre o papel central que os seus têm na vida dele — uma história de amor, sacrifício e cumplicidade.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
              {['/familia1.jpeg','/familia2.jpeg','/familia3.jpeg','/familia4.jpeg','/familia5.jpeg','/familia6.jpeg'].map((src, i) => (
                <DualLayerImg key={i} src={src} alt="Família Neymar" className="w-full aspect-[4/3] rounded-editorial" />
              ))}
            </div>
            <p className="font-inter text-xs text-gray-500 text-center mb-5 italic">
              Momentos preciosos em família — a base que sempre sustentou o craque nos momentos mais difíceis da carreira
            </p>
            <p className={p}>
              O <strong>Pai Neymar</strong>, além de ser seu primeiro técnico, foi por muitos anos seu empresário e o maior guardião da carreira do filho. A <strong>irmã Rafaella Santos</strong> é uma presença constante nos momentos mais importantes. <strong>Davi Lucca</strong> nasceu em 2011. Em 2023, chegou <strong>Mavie</strong>, sua filha com Amanda Kimberly — cada filho marcando uma fase nova na maturidade emocional do craque.
            </p>
          </section>

          {/* 09 Estilo */}
          <section className="mb-16 will-reveal" id="estilo">
            <SectionLabel number="09" tag="Fora do Campo" />
            <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white mb-6">Estilo, Personalidade e a Marca Neymar</h2>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <DualLayerImg src="/lindeza_estilo.jpeg" alt="Neymar estilo" className="w-full aspect-[4/5] rounded-editorial" />
              <DualLayerImg src="/neymar1.jpg" alt="Neymar personalidade" className="w-full aspect-[4/5] rounded-editorial" />
            </div>
            <p className={p}>
              Neymar não é apenas um fenômeno esportivo — é uma marca. Uma figura pública que transcende o futebol e habita os mundos da moda, da música, do entretenimento e da cultura pop. Os penteados ousados que viraram meme e tendência ao mesmo tempo, as roupas coloridas, o estilo inconfundível de celebrar os gols.
            </p>
            <p className={p}>
              Essa autenticidade tem um preço — Neymar foi alvo de críticas constantes. Mas é exatamente essa personalidade vibrante que o torna único. A <strong>marca Neymar Jr.</strong> vale centenas de milhões de dólares. Mas o que não tem preço é a influência cultural sobre uma geração inteira de crianças que sonharam ser como ele.
            </p>
          </section>

          {/* 10 Estatísticas */}
          <section className="mb-16 will-reveal" id="estatisticas">
            <SectionLabel number="10" tag="Números" />
            <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white mb-6">Os Números de Uma Carreira Histórica</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {FULL_STATS.map(s => (
                <div key={s.label} className="bg-dark-300 border border-white/8 p-5 text-center hover:border-gold/30 transition-colors duration-400">
                  <span className="font-oswald text-3xl md:text-4xl font-bold text-gold leading-none">
                    {s.num}<sup className="text-xl">{s.sup}</sup>
                  </span>
                  <span className="font-inter text-sm text-white block mt-2">{s.label}</span>
                  <span className="font-inter text-xs text-gray-500 block mt-1">{s.detail}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 11 Timeline */}
          <section className="mb-16 will-reveal" id="timeline-resumida">
            <SectionLabel number="11" tag="Cronologia" />
            <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white mb-6">A Jornada em Linha do Tempo</h2>
            <div className="relative pl-8 border-l border-gold/30 flex flex-col gap-6">
              {MINI_TL.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  className="relative"
                >
                  <div className="absolute -left-[2.4rem] top-1.5 w-3.5 h-3.5 rounded-full bg-gold border-2 border-dark" />
                  <span className="font-oswald text-base font-bold text-gold">{item.year}</span>
                  <strong className="font-inter text-sm text-white block mt-0.5">{item.title}</strong>
                  <p className="font-inter text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 12 Conclusão */}
          <section className="mb-12 will-reveal" id="conclusao">
            <SectionLabel number="12" tag="Opinião" />
            <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white mb-6">Por Que Neymar É — e Sempre Será — Único</h2>
            <p className={p}>
              Chego ao fim deste artigo com o coração cheio. Escrever sobre Neymar não é apenas narrar uma carreira esportiva — é mergulhar numa obra de arte que ainda está sendo pintada. Ele é, na minha opinião, <strong>o melhor jogador brasileiro da era pós-Pelé</strong>.
            </p>
            <p className={p}>
              Claro que houve polêmicas. Claro que houve momentos em que ele decepcionou. Mas quem de nós sobreviveria intacto ao escrutínio absurdo que esse homem vive desde os 17 anos?
            </p>
            <p className={p}>
              O que separa Neymar de qualquer outro jogador da sua geração não é apenas a técnica — é a <em>alegria</em>. Aquele drible impossível nasce de uma relação com a bola que começou numa quadra de Mogi das Cruzes, com um menino de chinelo sonhando em ser o maior do mundo. E ele foi. Ele é.
            </p>
            <Quote
              text="Neymar Jr. não é apenas um dos maiores talentos da história do futebol — ele é um dos maiores talentos que a humanidade já produziu dentro de um campo. E isso, nenhuma lesão, nenhuma polêmica e nenhuma crítica vai apagar jamais."
              author="Kawê Henrique"
              variant="gold-lg"
            />
          </section>

          {/* Author bio */}
          <section className="border-t border-white/8 pt-10">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold/30 flex-shrink-0">
                <img src="/perfil.jpeg" alt="Kawê Henrique" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-inter text-xs text-gray-500 uppercase tracking-widest mb-1">Escrito por</p>
                <h3 className="font-oswald text-xl font-semibold text-white mb-0.5">Kawê Henrique</h3>
                <p className="font-inter text-xs text-gray-500 mb-3">Técnico em Desenvolvimento de Sistemas · Flamenguista · Amante de Futebol · Fã do craque brasileiro</p>
                <p className="font-inter text-sm text-gray-400 leading-relaxed mb-4">
                  Apaixonado por futebol desde sempre, cresci assistindo ao Neymar e acreditando que o Brasil ainda produzia magos da bola. Este artigo é uma declaração de amor ao futebol arte e ao maior jogador brasileiro da nossa geração.
                </p>
                <div className="flex gap-4">
                  <a href="https://github.com/kawehenri" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.61-3.37-1.36-3.37-1.36-.45-1.17-1.1-1.48-1.1-1.48-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/></svg>
                  </a>
                  <a href="https://linkedin.com/in/kawehenri" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </article>

        {/* Sidebar */}
        <Sidebar activeId={activeId} />
        </div>
      </main>

      <FooterSimple links={[
        { label: 'Sobre', to: '/sobre' },
        { label: 'Contato', to: '/contato' },
        { label: 'Especial', to: '/especial' },
      ]} />
    </div>
  )
}
