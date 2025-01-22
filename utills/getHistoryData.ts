export async function fetchHistoricalRanges() {
    try {
        const response = await fetch(
            `${process.env.API_URL}/kzh-map-ranges?start-year=0&end-year=2030`,
            {
                next: {revalidate: 3600},
                headers: {
                    'Accept': 'application/json',
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
    return `${process.env.NEXT_PUBLIC_API_URL}/files/maps/retrieve/files/${filename}`;
}

export function getImageUrl(filename: string) {
    const dirAndName = filename.split("/")

    if(dirAndName.length <= 1) return "empty"

    return `${process.env.NEXT_PUBLIC_API_URL}/files/${dirAndName[0]}/retrieve/files/${dirAndName[1]}`;
}