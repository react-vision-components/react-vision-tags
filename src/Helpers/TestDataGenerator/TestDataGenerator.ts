import { Vision } from "../../@types/Vision";
import { ColorInterpolatorOptions } from "../../Classes/ColorInterpolatorOptions";

export default function TestDataGenerator(schema:ColorInterpolatorOptions, interval:number){
    const low = Math.trunc(schema.confidence.low);
    const high = Math.trunc(schema.confidence.high);
    const buffer = Math.trunc(high - low)/2;
    const valuesCount = high-low;
    const valueInterval = interval;

    var valueResult = Array<Vision>();
    const max = ((high + buffer) <= 100 ? (high+buffer) : 100)
    for(var i = (low-buffer); i <= max; i=i+valueInterval){
        valueResult.push({
            name: i.toString() + '%',
            confidence: (i/100).toString()
        })
    }
    return valueResult;
}