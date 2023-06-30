
export const HexToRGBArray = (hex:string) => {
    const rgb = parseInt(hex, 16);

    return [rgb >> 16, (rgb >> 8) % 256, rgb % 256];
}

export const HexInterpolator = (hex1:string, hex2:string, percentage:number) => {
    const [r1, g1, b1] = HexToRGBArray(hex1);
    const [r2, g2, b2] = HexToRGBArray(hex2);

    return RGBInterpolator([r1,g1,b1], [r2,g2,b2], percentage)
}

export const RGBInterpolator = (rgb: number[], rgb2:number[], percentage: number) => {
    const [r1, g1, b1] = rgb;
    const [r2, g2, b2] = rgb2
    if(percentage > 1 && percentage <=100){
        percentage = Math.abs(percentage/100);
    }

    const q = 1-percentage;
    const r = Math.round((r2 * percentage) + (r1 * q))
    const g = Math.round((g2 * percentage) + (g1 * q))
    const b = Math.round((b2 * percentage) + (b1 * q))

    return Number((r << 16) + (g << 8) + b).toString(16);
}

