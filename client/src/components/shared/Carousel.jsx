import { useState, useRef, useEffect, useCallback } from 'react'
import ResponsiveImage from './ResponsiveImage'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
)

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
)

export default function Carousel({ slides, autoPlay = true, interval = 4800 }) {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)
  const total = slides.length
  const reducedMotion = usePrefersReducedMotion()

  const goTo = useCallback((idx) => {
    setCurrent(((idx % total) + total) % total)
  }, [total])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  const startAuto = useCallback(() => {
    if (!autoPlay || reducedMotion) return
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % total), interval)
  }, [autoPlay, interval, reducedMotion, total])

  const stopAuto = useCallback(() => clearInterval(timerRef.current), [])

  useEffect(() => {
    startAuto()
    return stopAuto
  }, [startAuto, stopAuto])

  const touchStart = useRef(0)
  const handleTouchStart = (e) => { touchStart.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    const dx = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(dx) > 40) dx > 0 ? next() : prev()
  }

  return (
    <div
      className="relative overflow-hidden rounded-editorial border border-white/10 bg-[#090909]"
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Galeria de imagens"
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="w-full flex-shrink-0"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${total}`}
            aria-hidden={i !== current}
          >
            <div className="relative mx-auto flex min-h-[280px] w-full items-center justify-center bg-[#090909] md:min-h-[420px] lg:min-h-[520px]">
              <ResponsiveImage
                src={slide.src}
                alt={slide.caption || ''}
                className="h-full max-h-[70vh] w-full"
                fit="contain"
                position={slide.position || 'center top'}
                width="1400"
                height="900"
              />
            </div>
            {slide.caption && (
              <p className="border-t border-white/5 bg-dark-200 px-4 py-3 text-center font-inter text-xs italic leading-relaxed text-gray-400">
                {slide.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      {total > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-[42%] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/65 text-white transition-all duration-300 hover:bg-gold hover:text-dark"
            aria-label="Anterior"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-[42%] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/65 text-white transition-all duration-300 hover:bg-gold hover:text-dark"
            aria-label="Próxima"
          >
            <ChevronRight />
          </button>

          <div className="pointer-events-none absolute bottom-14 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`pointer-events-auto h-2 w-2 rounded-full transition-all duration-300 ${
                  i === current ? 'scale-125 bg-gold' : 'bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Slide ${i + 1}`}
                aria-current={i === current ? 'true' : undefined}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
