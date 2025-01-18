'use client'

import { TimelineSlider } from "../TimelineSlider/TimelineSlider";
import { useState, useEffect } from "react";
import Image from "next/image";
import type { HistoricalRange } from "@/shared/types/history";
import { getMapImageUrl } from "@/shared/lib/getHistoryData";

interface HistoricalTimelineProps {
  years: number[];
  historicalRanges: HistoricalRange[];
}

function HistoricalTimeline({ years, historicalRanges }: HistoricalTimelineProps) {
  const [selectedYear, setSelectedYear] = useState(years[years.length - 1]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload all images
    const preloadImages = async () => {
      const imageUrls = historicalRanges.flatMap(range => range.mapUrls);
      await Promise.all(
        imageUrls.map(url => {
          return new Promise((resolve) => {
            const img = new window.Image();
            img.src = getMapImageUrl(url);
            img.onload = resolve;
            img.onerror = resolve; // Handle errors gracefully
          });
        })
      );
      setIsLoading(false);
    };

    preloadImages();
  }, [historicalRanges]);

  const getClosestYear = (year: number) => {
    return years.reduce((prev, curr) => {
      return Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev;
    });
  };

  const getCurrentRange = (year: number) => {
    return historicalRanges.find(
      range => year >= range.min && year <= range.max
    );
  };

  const handleYearChange = (year: number) => {
    const closestYear = getClosestYear(year);
    setSelectedYear(closestYear);
  };

  const currentRange = getCurrentRange(selectedYear);

  if (!currentRange) {
    return <div>No historical data available for selected year</div>;
  }

  return (
    <div className="min-h-screen text-white p-4 sm:px-6 lg:px-20">
      <h1 className="text-xl sm:text-2xl font-bold text-center mb-2">KZH Map</h1>
      <p className="text-center text-gray-400 mb-4 text-xs sm:text-sm">
        Осваивайте историю Казахстана используя интерактивную карту KZH.
      </p>

      <div className="flex mx-auto mb-6 sm:mb-8 max-w-6xl">
        <TimelineSlider
          minYear={550}
          maxYear={years[years.length - 1]}
          onChange={handleYearChange}
        />
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-[2fr,1fr] gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
        <div className="bg-[#282828] border border-gray-800 rounded-md overflow-hidden">
          <div className="relative w-full pb-[56.25%]">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-[#282828]">
                <div className="text-white">Loading maps...</div>
              </div>
            ) : (
              <Image
                src={getMapImageUrl(currentRange.mapUrls[0])}
                alt={`Map of ${selectedYear}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                priority
                className="object-contain"
              />
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-3 sm:p-4 bg-[#282828] border border-gray-800 rounded-md">
            <h2 className="text-base sm:text-lg font-bold mb-2 text-violet-700">
              Краткое описание
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm">
              {currentRange.summary}
            </p>
          </div>
          <div className="p-3 sm:p-4 bg-[#282828] border border-gray-800 rounded-md">
            <h2 className="text-base sm:text-lg font-bold mb-2 text-violet-700">
              Ключевые моменты
            </h2>
            <ul className="space-y-1 text-xs sm:text-sm">
              {currentRange.keyMoments.map((moment, index) => (
                <li key={index} className="text-gray-300">• {moment}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoricalTimeline;