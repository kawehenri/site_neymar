import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BackToTop from './components/shared/BackToTop'

const Home = lazy(() => import('./pages/Home'))
const Artigo = lazy(() => import('./pages/Artigo'))
const Especial = lazy(() => import('./pages/Especial'))
const Sobre = lazy(() => import('./pages/Sobre'))
const Contato = lazy(() => import('./pages/Contato'))
const NotFound = lazy(() => import('./pages/NotFound'))

function LoadingScreen() {
  return (
    <div className="grid min-h-screen place-items-center bg-dark text-gold" role="status">
      <span className="font-oswald text-sm uppercase tracking-[0.35em]">Carregando história</span>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/artigo"   element={<Artigo />} />
          <Route path="/especial" element={<Especial />} />
          <Route path="/sobre"    element={<Sobre />} />
          <Route path="/contato"  element={<Contato />} />
          <Route path="*"         element={<NotFound />} />
        </Routes>
      </Suspense>
      <BackToTop />
    </BrowserRouter>
  )
}
