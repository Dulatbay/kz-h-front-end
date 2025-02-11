
const interpolateColor = (color1: string, color2: string, factor: number): string => {
    const hexToRgb = (hex: string): [number, number, number] => {
        if (!hex || !/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex)) {
            throw new Error(`Invalid hex color: ${hex}`);
        }
        const bigint = parseInt(hex.replace('#', ''), 16);
        return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    };

    const rgbToHex = ([r, g, b]: [number, number, number]): string =>
        `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;

    try {
        const rgb1 = hexToRgb(color1);
        const rgb2 = hexToRgb(color2);

        const interpolated: [number, number, number] = [
            Math.round(rgb1[0] + factor * (rgb2[0] - rgb1[0])),
            Math.round(rgb1[1] + factor * (rgb2[1] - rgb1[1])),
            Math.round(rgb1[2] + factor * (rgb2[2] - rgb1[2])),
        ];

        return rgbToHex(interpolated);
    } catch (error) {
        console.error(error);
        return '#000000'; // Fallback color
    }
};



export const gradientColorPicker = (percentage: number): React.CSSProperties => {
    const gradientColors = ['#FF0000', '#FF6A00', '#FFF600', '#89BB2C', '#2CBB5D'];
    const length = gradientColors.length;

    if (percentage < 0 || percentage > 100) {
        console.warn(`Percentage out of range: ${percentage}. Using fallback.`);
        return {color: '#000000'};
    }

    if (percentage === 100) {
        return {color: gradientColors[length - 1]};
    }

    const segment = Math.floor((percentage / 100) * (length - 1));
    const factor = (percentage / 100) * (length - 1) - segment;

    if (segment < 0 || segment >= length - 1) {
        console.error(`Segment out of bounds: ${segment}.`);
        return {color: '#000000'};
    }

    const color = interpolateColor(
        gradientColors[segment],
        gradientColors[segment + 1],
        factor
    );

    return {color};
};