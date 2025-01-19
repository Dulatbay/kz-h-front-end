export async function fetchHistoricalRanges() {
    try {
        const response = await fetch(
            'http://185.32.84.190/api/kzh-map-ranges?start-year=0&end-year=2030',
            {
                next: {revalidate: 3600},
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IlVTRVIiLCJlbWFpbCI6InllQG1haWwuY29tIiwic3ViIjoieWUiLCJpYXQiOjE3MzcwMTcxMzksImV4cCI6MTczNzEwMzUzOX0.yaXhLJNHh-f2KSaYSN5tT7L_R0dSRIQzL0QAcn5DyYI'
                }
            }
        );

        if (!response.ok) {
            console.error('API Error:', response.status, response.statusText);
            return [];
        }

        const data = await response.json();
        return Array.isArray(data) ? data : [];

    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
}

export function getMapImageUrl(filename: string) {
    return `http://185.32.84.190/api/files/maps/retrieve/files/${filename}`;
}

export function getImageUrl(filename: string) {
    const dirAndName = filename.split("/")

    if(dirAndName.length <= 1) return "empty"

    return `http://185.32.84.190/api/files/${dirAndName[0]}/retrieve/files/${dirAndName[1]}`;
}