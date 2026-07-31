import { Link } from 'react-router-dom'
import NavbarSimple from '../components/shared/NavbarSimple'
import FooterMain from '../components/shared/FooterMain'
import PageMeta from '../components/shared/PageMeta'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <PageMeta
        title="Página não encontrada — NJR 10"
        description="A página que você procura não existe."
        path="/404"
      />
      <NavbarSimple />
      <main id="conteudo" className="editorial-container flex min-h-[76vh] items-center pt-24">
        <div className="max-w-3xl py-20">
          <p className="section-eyebrow mb-5">ERRO 404</p>
          <h1 className="font-oswald text-[clamp(4rem,16vw,11rem)] font-bold uppercase leading-[0.78] tracking-[-0.04em]">
            Fora de<br /><span className="text-gold">jogo.</span>
          </h1>
          <p className="mt-8 max-w-xl font-inter text-lg leading-relaxed text-gray-400">
            Este endereço não faz parte da nossa escalação. Volte ao início e continue pela trajetória.
          </p>
          <Link to="/" className="mt-8 inline-flex bg-gold px-6 py-3 font-inter text-xs font-semibold uppercase tracking-[0.18em] text-dark transition hover:bg-gold-light">
            Voltar ao início
          </Link>
        </div>
      </main>
      <FooterMain />
    </div>
  )
}
