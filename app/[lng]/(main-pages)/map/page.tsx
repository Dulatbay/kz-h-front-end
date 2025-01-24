import {fetchHistoricalRanges} from '@/utills/getHistoryData';
import HistoricalTimeline from '@/components/Map/HistoricalTimeline';

export default async function MapPage() {
    const response = await fetchHistoricalRanges();
    const historicalRanges = Array.isArray(response) ? response : [];

    const allYears = [];
    for (const range of historicalRanges) {
        allYears.push(range.min, range.max);
    }

    const years = Array.from(new Set(allYears)).sort((a, b) => a - b);

    const allMapUrls = Array.from(
        new Set(historicalRanges.flatMap(range => range.mapUrls))
    );

    return (
        <>
            {/*<ImagePreloader mapUrls={allMapUrls}/>*/}
            <HistoricalTimeline
                years={years}
                historicalRanges={historicalRanges}
            />
        </>
    );
}