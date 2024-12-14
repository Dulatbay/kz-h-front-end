'use client'

import { useState } from 'react'
import { TimelineSlider } from '@/components/TimelineSlider/TimelineSlider'

// Данные для нужных дат
const historicalData = {
  800: {
    summary: "Early medieval period in Central Asia",
    keyMoments: [
      "Emergence of Turkic tribes",
      "Spread of Islam in the region",
      "Development of the Silk Road trade"
    ],
    mapUrl: "/maps/800.png" // Замените на URL карты
  },
  900: {
    summary: "Karakhanid period",
    keyMoments: [
      "Establishment of the Karakhanid Khanate",
      "Consolidation of Islam in the region",
      "Cultural and architectural achievements"
    ],
    mapUrl: "/maps/900.png"
  },
  1000: {
    summary: "Great Seljuk Empire",
    keyMoments: [
      "Seljuk conquest of Central Asia",
      "Expansion of the empire",
      "Influence on the region's politics and culture"
    ],
    mapUrl: "/maps/1000.png"
  },
  1200: {
    summary: "Mongol invasions and aftermath",
    keyMoments: [
      "Destruction caused by Mongol invasions",
      "Formation of successor states",
      "Cultural and economic recovery"
    ],
    mapUrl: "/maps/1200.png"
  },
  1500: {
    summary: "Kazakh Khanate",
    keyMoments: [
      "Formation of the Kazakh Khanate",
      "Relations with neighboring states",
      "Cultural and political developments"
    ],
    mapUrl: "/maps/1500.png"
  },
  1700: {
    summary: "Kazakh Khan",
    keyMoments: [
      "Formation of the Kazakh Khanate",
      "Relations with neighboring states",
      "Cultural and political developments"
    ],
  },
  1800: {
    summary: "Russian Empire",
    keyMoments: [
      "Russian expansion into Central Asia",
      "Colonization and economic changes",
      "Impact on local populations"
    ],
    mapUrl: "/maps/1800.png"
  },
  1900: {
    summary: "Late imperial period",
    keyMoments: [
      "Russian expansion into Central Asia",
      "Modernization efforts",
      "Growth of national consciousness"
    ],
    mapUrl: "/maps/1900.png"
  }
}

const years = Object.keys(historicalData).map(Number)

export default function HistoricalTimeline() {
  const [selectedYear, setSelectedYear] = useState(800)

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
        <div className="bg-[#282828] border border-gray-800 rounded-md aspect-video">
          <div className="w-full h-full bg-[#454545] rounded flex items-center justify-center text-sm sm:text-base">
            Map for year {selectedYear}
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-3 sm:p-4 bg-[#282828] border border-gray-800 rounded-md">
            <h2 className="text-base sm:text-lg font-bold mb-2 text-violet-700">Summary</h2>
            <p className="text-gray-300 text-xs sm:text-sm">{currentData.summary}</p>
          </div>
          <div className="p-3 sm:p-4 bg-[#282828] border border-gray-800 rounded-md">
            <h2 className="text-base sm:text-lg font-bold mb-2 text-violet-700">Key moments</h2>
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

