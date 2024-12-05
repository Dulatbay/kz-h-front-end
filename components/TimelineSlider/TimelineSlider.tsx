import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { TimelineSliderProps } from '@/app/types/History'

export function TimelineSlider({ minYear, maxYear, onChange }: TimelineSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const YEAR_STEP = 50
  const STEP_WIDTH = 100 // Пиксели на шаг
  const numSteps = Math.floor((maxYear - minYear) / YEAR_STEP)
  const SLIDER_WIDTH = STEP_WIDTH * numSteps

  // Инициализация x значения для слайдера
  const x = useMotionValue(-SLIDER_WIDTH / 2)

  // Преобразование x значения в год
  const year = useTransform(x, xValue => {
    const progress = (xValue + SLIDER_WIDTH / 2) / SLIDER_WIDTH
    const stepIndex = Math.round((1 - progress) * numSteps)
    const clampedIndex = Math.max(0, Math.min(numSteps, stepIndex))
    return minYear + clampedIndex * YEAR_STEP
  })

  // Обновление года при изменении x значения
  useEffect(() => {
    const unsubscribe = year.onChange(latest => {
      onChange(latest)
    })
    return unsubscribe
  }, [year, onChange])

  const generateMarkers = () => {
    const markers = []
    for (let i = 0; i <= numSteps; i++) {
      const yearValue = minYear + i * YEAR_STEP
      markers.push(
        <div
          key={yearValue}
          className="absolute top-0 h-4 border-l border-gray-400"
          style={{ left: `${i * STEP_WIDTH}px` }}
        >
          <span className="absolute top-5 left-0 transform -translate-x-1/2 text-xs text-gray-400">
            {yearValue}
          </span>
        </div>
      )
    }
    return markers
  }

  return (
    <div className="relative w-full h-16 overflow-hidden bg-[#282828] rounded-md" ref={containerRef}>
      {/* Слайдер */}
      <motion.div
        className="absolute top-0 left-0 h-full w-full cursor-grab active:cursor-grabbing"
        style={{
          x,
        }}
        drag="x"
        dragConstraints={{ left: -SLIDER_WIDTH / 2, right: SLIDER_WIDTH / 2 }}
        dragElastic={0}
        dragMomentum={false}
      >
        <div
          className="absolute top-0 h-full"
          style={{
            width: `${SLIDER_WIDTH}px`,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {generateMarkers()}
        </div>
      </motion.div>
      {/* Курсор */}
      <div className="absolute top-0 left-1/2 w-0.5 h-6 bg-violet-700 z-10" />
      {/* Год */}
      <motion.div
        className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white px-2 py-1 rounded text-sm"
      >
        {year}
      </motion.div>
    </div>
  )
}

