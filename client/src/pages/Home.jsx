import NavbarMain from '../components/shared/NavbarMain'
import HeroSection from '../components/home/HeroSection'
import StatsSection from '../components/home/StatsSection'
import CareerSection from '../components/home/CareerSection'
import TimelineSection from '../components/home/TimelineSection'
import CuriosidadesSection from '../components/home/CuriosidadesSection'
import MarcasSection from '../components/home/MarcasSection'
import ArtigoCTA from '../components/home/ArtigoCTA'
import FooterMain from '../components/shared/FooterMain'
import PageMeta from '../components/shared/PageMeta'

export default function Home() {
  return (
    <div className="bg-dark text-white min-h-screen">
      <PageMeta
        title="NJR 10 — Ousadia, alegria e legado"
        description="Uma experiência editorial sobre Neymar Jr.: carreira, momentos históricos, futebol arte e impacto cultural."
        path="/"
        image="/editorial/hero-home-desktop.png"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'NJR 10',
          url: 'https://ousadiayalegria.site',
          description: 'Experiência editorial independente em homenagem a Neymar Jr.',
        }}
      />
      <NavbarMain />
      <main id="conteudo">
        <HeroSection />
        <StatsSection />
        <CareerSection />
        <TimelineSection />
        <CuriosidadesSection />
        <MarcasSection />
        <ArtigoCTA />
      </main>
      <FooterMain />
    </div>
  )
}
