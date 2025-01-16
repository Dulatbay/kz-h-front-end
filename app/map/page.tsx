'use client'

import { useState } from 'react'
import { TimelineSlider } from '@/components/TimelineSlider/TimelineSlider'
import Image from 'next/image'

// Данные для нужных дат
const historicalData = {
  800: {
    summary: "Ранний средневековый период в Центральной Азии",
    keyMoments: [
      "Появление тюркских племён",
      "Распространение ислама в регионе",
      "Развитие торговли по Шёлковому пути"
    ],
    mapUrl: "/maps/800.png" // Замениmь на URL карты
  },
  900: {
    summary: "Караханидский период",
    keyMoments: [
      "Образование Караханидского каганата",
      "Укрепление ислама в регионе",
      "Культурные и архитектурные достижения"
    ],
    mapUrl: "/maps/900.png"
  },
  1000: {
    summary: "Великая Сельджукская империя",
    keyMoments: [
      "Завоевания сельджуков в Центральной Азии",
      "Расширение империи",
      "Влияние на политику и культуру региона"
    ],
    mapUrl: "/maps/1000.png"
  },
  1200: {
    summary: "Монгольские нашествия и их последствия",
    keyMoments: [
      "Разрушения, вызванные нашествиями монголов",
      "Образование государств-преемников",
      "Культурное и экономическое восстановление"
    ],
    mapUrl: "/maps/1200.png"
  },
  1500: {
    summary: "Казахское ханство",
    keyMoments: [
      "Образование Казахского ханства",
      "Отношения с соседними государствами",
      "Культурные и политические изменения"
    ],
    mapUrl: "/maps/1500.png"
  },
  1700: {
    summary: "Казахский хан",
    keyMoments: [
      "Образование Казахского ханства",
      "Отношения с соседними государствами",
      "Культурные и политические изменения"
    ],
    mapUrl: "/maps/1700.png"
  },
  1800: {
    summary: "Российская империя",
    keyMoments: [
      "Расширение Российской империи в Центральной Азии",
      "Колонизация и экономические преобразования",
      "Влияние на местное население"
    ],
    mapUrl: "/maps/1800.png"
  },
  1900: {
    summary: "Поздний имперский период",
    keyMoments: [
      "Расширение влияния России в Центральной Азии",
      "Модернизационные усилия",
      "Рост национального самосознания"
    ],
    mapUrl: "/maps/1900.png"
  }
}

const years = Object.keys(historicalData).map(Number)

export default function HistoricalTimeline() {
  const [selectedYear, setSelectedYear] = useState(years[years.length - 1])

  const getClosestYear = (year: number) => {
    return years.reduce((prev, curr) => {
      return Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev
    })
  }

  const handleYearChange = (year: number) => {
    const closestYear = getClosestYear(year)
    setSelectedYear(closestYear)
  }

  const currentData = historicalData[selectedYear as keyof typeof historicalData]

  return (
    <div className="min-h-screen text-white p-4 sm:px-6 lg:px-20">
      <h1 className="text-xl sm:text-2xl font-bold text-center mb-2">KZH Map</h1>
      <p className="text-center text-gray-400 mb-4 text-xs sm:text-sm">
        Осваивайте историю Казахстана используя интерактивную карту KZH.
      </p>

      <div className="flex mx-auto mb-6 sm:mb-8 max-w-6xl">
        <TimelineSlider minYear={800} maxYear={1900} onChange={handleYearChange} />
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-[2fr,1fr] gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
        <div className="bg-[#282828] border border-gray-800 rounded-md overflow-hidden">
          <div className="relative w-full pb-[56.25%]">
            <Image
              src={currentData.mapUrl}
              alt={`Map of ${selectedYear}`}
              layout="fill"
              objectFit="contain"
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-3 sm:p-4 bg-[#282828] border border-gray-800 rounded-md">
            <h2 className="text-base sm:text-lg font-bold mb-2 text-violet-700">Краткое описание</h2>
            <p className="text-gray-300 text-xs sm:text-sm">{currentData.summary}</p>
          </div>
          <div className="p-3 sm:p-4 bg-[#282828] border border-gray-800 rounded-md">
            <h2 className="text-base sm:text-lg font-bold mb-2 text-violet-700">Ключевые моменты</h2>
            <ul className="space-y-1 text-xs sm:text-sm">
              {currentData.keyMoments.map((moment, index) => (
                <li key={index} className="text-gray-300">• {moment}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

