import { fetchHistoricalRanges } from '@/shared/lib/getHistoryData';
import HistoricalTimeline from '@/widgets/HistoricalTimeline/HistoricalTimeline';
import { ImagePreloader } from '@/widgets/HistoricalTimeline/ImagePreloader';

export default async function MapPage() {
  const response = await fetchHistoricalRanges();
  const historicalRanges = Array.isArray(response) ? response : [];
  
  const allYears = [];
  for (const range of historicalRanges) {
    allYears.push(range.min, range.max);
  }
  
  const years = Array.from(new Set(allYears)).sort((a, b) => a - b);

  // Get all unique map URLs for preloading
  const allMapUrls = Array.from(
    new Set(historicalRanges.flatMap(range => range.mapUrls))
  );

  return (
    <>
      <ImagePreloader mapUrls={allMapUrls} />
      <HistoricalTimeline 
        years={years}
        historicalRanges={historicalRanges}
      />
    </>
  );
}