import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { TimelineSliderProps } from '@/types/History'

export function TimelineSlider({
  minYear,
  maxYear,
  onChange,
}: TimelineSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const YEAR_STEP = 50
  const SUB_MARKERS = 3 // 3 маленьких маркера между каждым большим
  const STEP_WIDTH = 100 // Пиксели для каждого 50-летнего шага
  const numSteps = Math.floor((maxYear - minYear) / YEAR_STEP)
  const SLIDER_WIDTH = STEP_WIDTH * numSteps

  // Установка x для перемещения слайдера
  const x = useMotionValue(-SLIDER_WIDTH / 2)

  // Преобразование x в соответствующий год
  const year = useTransform(x, (xValue) => {
    const progress = (xValue + SLIDER_WIDTH / 2) / SLIDER_WIDTH
    const stepIndex = Math.round((1 - progress) * numSteps)
    const clampedIndex = Math.max(0, Math.min(numSteps, stepIndex))
    return minYear + clampedIndex * YEAR_STEP
  })

  useEffect(() => {
    const unsubscribe = year.on('change', (latest) => {
      onChange(latest)
    })
    return unsubscribe
  }, [year, onChange])

  const generateMarkers = () => {
    const markers = []

    for (let i = 0; i <= numSteps; i++) {
      const yearValue = minYear + i * YEAR_STEP

      // Большой маркер
      markers.push(
        <div
          key={`main-${yearValue}`}
          className="absolute top-1/3 -translate-y-1/2 border-l"
          style={{
            left: `${i * STEP_WIDTH}px`,
            borderColor: '#9e9e9e',
            height: '32px',
          }}
        >
          {/* Метка года на одном уровне для всех больших маркеров */}
          <span className="absolute top-10 left-0 transform -translate-x-1/2 text-xs text-gray-400">
            {yearValue}
          </span>
        </div>
      )

      // Добавление маленьких маркеров, если это не последний основной маркер
      if (i < numSteps) {
        // 3 маленьких маркера, равномерно распределенные между большими маркерами
        for (let j = 1; j <= SUB_MARKERS; j++) {
          const subYearValue = yearValue + (YEAR_STEP / (SUB_MARKERS + 1)) * j
          const subPosition =
            i * STEP_WIDTH + (STEP_WIDTH / (SUB_MARKERS + 1)) * j

          markers.push(
            <div
              key={`sub-${subYearValue}`}
              className="absolute top-1/3 -translate-y-1/2 border-l"
              style={{
                left: `${subPosition}px`,
                borderColor: '#9e9e9e',
                height: '16px',
              }}
            />
          )
        }
      }
    }

    return markers
  }

  return (
    <div
      className="relative w-full h-20 overflow-hidden bg-[#282828] rounded-md"
      ref={containerRef}
    >
      <motion.div
        className="absolute top-0 left-0 h-full w-full cursor-grab active:cursor-grabbing"
        style={{ x }}
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
      {/* Линия курсора */}
      <div className="absolute bottom-0 left-1/2 w-0.5 h-8 bg-violet-700 z-10" />
    </div>
  )
}
