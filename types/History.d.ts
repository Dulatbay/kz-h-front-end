export interface TimelineSliderProps {
  minYear: number
  maxYear: number
  onChange: (year: number) => void
}

export interface HistoricalRange {
  id: string
  summary: string
  keyMoments: string[]
  mapUrls: string[]
  min: number
  max: number
}
