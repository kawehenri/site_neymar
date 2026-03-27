import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Artigo from './pages/Artigo'
import Especial from './pages/Especial'
import Sobre from './pages/Sobre'
import Contato from './pages/Contato'
import BackToTop from './components/shared/BackToTop'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/artigo"   element={<Artigo />} />
        <Route path="/especial" element={<Especial />} />
        <Route path="/sobre"    element={<Sobre />} />
        <Route path="/contato"  element={<Contato />} />
      </Routes>
      <BackToTop />
    </BrowserRouter>
  )
}
