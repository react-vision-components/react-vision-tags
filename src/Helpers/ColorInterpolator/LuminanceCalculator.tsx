/*  Math for Luminence taken from https://24ways.org/2010/calculating-color-contrast  */
import { HexToRGBArray } from "./ColorInterpolator";

export default function getTextColor(bgColor:string){
  
  if(bgColor[0] === '#')
    bgColor = bgColor.substring(1,bgColor.length);
  const [r,g,b] = HexToRGBArray(bgColor);

  const brightness = Math.round(((r * 299) +
  (g * 587) + 
  (b * 114)) / 1000)

  const textColor = (brightness > 125) ? '#000000' : '#FFFFFF'

  return textColor;
}