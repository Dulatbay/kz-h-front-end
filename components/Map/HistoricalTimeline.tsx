'use client'

import {TimelineSlider} from "../TimelineSlider/TimelineSlider";
import {useState, useEffect} from "react";
import {getMapImageUrl} from "@/utills/getHistoryData";

export interface HistoricalRange {
    id: string;
    summary: string;
    keyMoments: string[];
    mapUrls: string[];
    min: number;
    max: number;
}


interface HistoricalTimelineProps {
    years: number[];
    historicalRanges: HistoricalRange[];
}

function HistoricalTimeline({years, historicalRanges}: HistoricalTimelineProps) {
    const [closestSelectedYear, setClosestSelectedYear] = useState(years[years.length - 1]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState(years[years.length - 1]);

    useEffect(() => {
        const preloadImages = async () => {
            const imageUrls = historicalRanges.flatMap(range => range.mapUrls);
            await Promise.all(
                imageUrls.map(url => {
                    return new Promise((resolve) => {
                        const img = new window.Image();
                        img.src = getMapImageUrl(url);
                        img.onload = resolve;
                        img.onerror = resolve;
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
        setSelectedYear(year);
        setClosestSelectedYear(closestYear);
    };

    const currentRange = getCurrentRange(closestSelectedYear);

    if (!currentRange) {
        return <div>No historical data available for selected year</div>;
    }

    return (
        <div className="min-h-screen text-white p-4 sm:px-6 lg:px-20">
            <h1 className="text-xl sm:text-2xl font-bold text-center mb-2">KZH Map</h1>
            <p className="text-center text-gray-400 mb-4 text-xs sm:text-sm">
                Осваивайте историю Казахстана используя интерактивную карту KZH.
            </p>
            <p className={'text-center'}>Выбранный год - {selectedYear}</p>

            <div className="flex mx-auto mb-6 sm:mb-8 max-w-6xl">
                <TimelineSlider
                    minYear={550}
                    maxYear={years[years.length - 1]}
                    onChange={handleYearChange}
                />
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-[2fr,1fr] gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
                <div className="bg-[#282828] border border-gray-800 rounded-md overflow-hidden">
                    <div className="relative w-full h-full">
                        {isLoading ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-[#282828]">
                                <div className="text-white">Loading maps...</div>
                            </div>
                        ) : (
                            <img
                                src={getMapImageUrl(currentRange.mapUrls[0])}
                                alt={`Map of ${closestSelectedYear}`}
                                className="object-contain w-full h-full aspect-video"
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