'use client'

import { TimelineSlider } from "../TimelineSlider/TimelineSlider";
import { useState, useEffect } from "react";
import {getImageUrl, getMapImageUrl} from "@/utills/getHistoryData";
import { useTranslation } from "react-i18next";
import Loader from "@/components/Loader/loader";
import { HistoricalRange } from "@/services/map/types";
import { fetchRangeByYear } from "@/services/map/mapService";
import { Carousel } from "antd";
import ImageWithSkeleton from "@/components/ImageWithSkeleton/imageWithSkeleton";

function HistoricalTimeline() {
    const { t } = useTranslation();
    const [historicalData, setHistoricalData] = useState<HistoricalRange | null>(null);
    const [selectedYear, setSelectedYear] = useState<number>(1212);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (historicalData && historicalData.min <= selectedYear && historicalData.max >= selectedYear)
            return;
        setLoading(true);
        fetchRangeByYear(selectedYear)
            .then((data) => {
                setHistoricalData(data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [selectedYear]);

    const handleYearChange = (year: number) => {
        setSelectedYear(year);
    };

    if (loading && !historicalData)
        return <div className="mt-32"><Loader /></div>;
    if (!historicalData)
        return <div>Not found</div>;

    return (
        <div className="min-h-screen text-white p-4 sm:px-6 lg:px-20">
            <h1 className="text-xl sm:text-2xl font-bold text-center mb-2">
                {t('map-page.title')}
            </h1>
            <p className="text-center text-gray-400 mb-4 text-xs sm:text-sm">
                {t('map-page.description')}
            </p>
            <p className="text-center">{t('map-page.chosenYear')} - {selectedYear}</p>

            <div className="flex mx-auto mb-6 sm:mb-8 max-w-6xl">
                <TimelineSlider
                    minYear={550}
                    maxYear={1212}
                    onChange={handleYearChange}
                />
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-[2fr,1fr] gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
                <div className="bg-[#282828] border border-gray-800 rounded-md overflow-hidden self-start">
                    <div className="relative w-full h-full">
                        <Carousel>
                            {historicalData.mapUrls.map((image, index) => (
                                <div key={index}>
                                    <ImageWithSkeleton
                                        src={getImageUrl(image)}
                                        alt="map"
                                        className="lg:h-[400px] aspect-video m-auto"
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="p-3 sm:p-4 bg-[#282828] border border-gray-800 rounded-md">
                        <h2 className="text-base sm:text-lg font-bold mb-2 text-violet-700">
                            {t('map-page.shortDescription')}
                        </h2>
                        <p className="text-gray-300 text-xs sm:text-sm">
                            {historicalData.summary}
                        </p>
                    </div>
                    <div className="p-3 sm:p-4 bg-[#282828] border border-gray-800 rounded-md">
                        <h2 className="text-base sm:text-lg font-bold mb-2 text-violet-700">
                            {t('map-page.keyMoments')}
                        </h2>
                        <ul className="space-y-1 text-xs sm:text-sm">
                            {historicalData.keyMoments.map((moment, index) => (
                                <li key={index} className="text-gray-300">
                                    • {moment}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HistoricalTimeline;
