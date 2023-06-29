import type { ColorSpectrum } from "../../@types/ColorSpectrum/ColorSpectrum";
import { ConfidenceThreshold } from "../../@types/ConfidenceThreshold/ConfidenceThreshold";

class ColorInterpolatorOptions{
    public hex:ColorSpectrum = {
        low: 'FF0000',
        high: '00FF00'
    }
    public confidence = {
        low: 0,
        high: 100
    }
    constructor(spectrum:ColorSpectrum, threshold: ConfidenceThreshold){
        this.hex.low = spectrum.low || 'FF0000';
        this.hex.high = spectrum.high || '00FF00';
        if(spectrum.mid)
            this.hex.mid = spectrum.mid;
        this.confidence.low = threshold.low || 0;
        this.confidence.high = threshold.high || 100;
    }
}

export default ColorInterpolatorOptions;