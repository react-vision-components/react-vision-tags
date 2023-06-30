
const HexToRGBArray = (hex:string) => {
    const rgb = parseInt(hex, 16);

    return [rgb >> 16, (rgb >> 8) % 256, rgb % 256];
}

export const HexInterpolator = (hex1:string, hex2:string, percentage:number) => {
    const [r1, g1, b1] = HexToRGBArray(hex1);
    const [r2, g2, b2] = HexToRGBArray(hex2);

    console.log('r1: ', r1,', g1: ', g1,', b1: ', b1);
    console.log('r2: ', r2,', g2: ', g2,', b2: ', b2);

    return RGBInterpolator([r1,g1,b1], [r2,g2,b2], percentage)
}

export const RGBInterpolator = (rgb: number[], rgb2:number[], percentage: number) => {
    const [r1, g1, b1] = rgb;
    const [r2, g2, b2] = rgb2

    if(percentage > 1 && percentage <=100){
        percentage = percentage/100;
    }

    const q = 1-percentage;
    const r = Math.round(r1 * percentage + r2 + q)
    const g = Math.round(g1 * percentage + g2 + q)
    const b = Math.round(b1 * percentage + b2 + q)
    console.log('after "MATH"')
    console.log('r: ', r,', g: ', g,', b1: ', b);
    return Number((r << 16) + (g << 8) + b).toString(16);
}

