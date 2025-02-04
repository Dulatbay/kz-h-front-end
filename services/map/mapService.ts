import baseApi, {handleApiRequest} from "@/services/baseApi";
import {HistoricalRange} from "@/services/map/types";

export const fetchRangeByYear = async (year: number): Promise<HistoricalRange> => {
    return handleApiRequest(() =>
        baseApi.get<HistoricalRange>(`/kzh-map-ranges/by-year/${year}`).then((response) => response.data)
    );
};