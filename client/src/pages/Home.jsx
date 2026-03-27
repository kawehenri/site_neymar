import NavbarMain from '../components/shared/NavbarMain'
import HeroSection from '../components/home/HeroSection'
import StatsSection from '../components/home/StatsSection'
import CareerSection from '../components/home/CareerSection'
import TimelineSection from '../components/home/TimelineSection'
import CuriosidadesSection from '../components/home/CuriosidadesSection'
import MarcasSection from '../components/home/MarcasSection'
import ArtigoCTA from '../components/home/ArtigoCTA'
import FooterMain from '../components/shared/FooterMain'

export default function Home() {
  return (
    <div className="bg-dark text-white min-h-screen">
      <NavbarMain />
      <HeroSection />
      <StatsSection />
      <CareerSection />
      <TimelineSection />
      <CuriosidadesSection />
      <MarcasSection />
      <ArtigoCTA />
      <FooterMain />
    </div>
  )
}
