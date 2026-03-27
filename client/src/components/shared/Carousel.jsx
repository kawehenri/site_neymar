import { useState, useRef, useEffect, useCallback } from 'react'
import DualLayerImg from './DualLayerImg'

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

  const goTo = useCallback((idx) => {
    setCurrent(((idx % total) + total) % total)
  }, [total])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  const startAuto = useCallback(() => {
    if (!autoPlay) return
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % total), interval)
  }, [autoPlay, interval, total])

  const stopAuto = useCallback(() => clearInterval(timerRef.current), [])

  useEffect(() => {
    startAuto()
    return stopAuto
  }, [startAuto, stopAuto])

  // Touch swipe
  const touchStart = useRef(0)
  const handleTouchStart = (e) => { touchStart.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    const dx = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(dx) > 40) dx > 0 ? next() : prev()
  }

  return (
    <div
      className="relative overflow-hidden rounded-lg bg-dark-200"
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
    >
      {/* Track */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="flex-shrink-0 w-full" role="group" aria-roledescription="slide">
            <DualLayerImg
              src={slide.src}
              alt={slide.caption || ''}
              className="w-full h-64 md:h-80 lg:h-96"
            />
            {slide.caption && (
              <p className="text-center text-xs text-gray-400 font-inter py-3 px-4 italic bg-dark-200">
                {slide.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Prev / Next */}
      {total > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-black/60 hover:bg-gold hover:text-dark text-white rounded-full transition-all duration-300"
            aria-label="Anterior"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-black/60 hover:bg-gold hover:text-dark text-white rounded-full transition-all duration-300"
            aria-label="Próxima"
          >
            <ChevronRight />
          </button>

          {/* Dots */}
          <div className="absolute bottom-[2.8rem] left-0 right-0 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-gold scale-125' : 'bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
