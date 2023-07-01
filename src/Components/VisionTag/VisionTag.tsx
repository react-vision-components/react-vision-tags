import React, { HtmlHTMLAttributes, useState } from 'react';
import classnames from 'classnames';
import './VisionTag.css'
import getTextColor from '../../Helpers/ColorInterpolator/LuminanceCalculator';

export interface VisionTagProps {
    text: string;
    confidence: string;
    color:string;
    remove: any;
    disabled?: boolean;
    className?: string;
}



export default function VisionTag({
    text, 
    remove, 
    disabled,
    color,
    confidence,
    className}: React.PropsWithChildren<VisionTagProps>){

    const [displayText, setDisplayText] = useState(text)
    const [tagWidth, setTagWidth] = useState(null);
    const handleOnRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        remove(text);
    }

    const handleMouseIn = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        const el:HTMLSpanElement = e.target as HTMLSpanElement;
        if(el.classList[0] === 'vision-tag' && !el.style.width){
            const width = el.getBoundingClientRect().width.toString();
            el.style.width=width + 'px';
        }
        //getBoundingClientRect()
        const conf = confidence === '100' ? '100': Math.trunc((parseFloat(confidence)*100)).toString()
        setDisplayText(conf + '%');
    }

    const handleMouseOut = (e: React.MouseEvent<HTMLSpanElement> | React.TouchEvent<HTMLSpanElement>) => {
        setDisplayText(text);
    }    
    const textColor = getTextColor(color);
    function handleTouchToggle(e: React.TouchEvent<HTMLSpanElement>): void {
        console.log(e)
        if(displayText === text){
            const conf = confidence === '100' ? '100': Math.trunc((parseFloat(confidence)*100)).toString()
            setDisplayText(conf + '%');
        }
        else{
            setDisplayText(text);
        }
    }

    return (
        <span onMouseOver={handleMouseIn} onTouchEndCapture={handleTouchToggle} onMouseOut={handleMouseOut} data-confidence={confidence} style={{backgroundColor: color, color:textColor}} className={classnames(className, 'vision-tag')}>
            <span>{displayText}</span>
            {!disabled && (
                <button
                    className={'tag-button'}
                    type="button"
                    onClick={handleOnRemove}
                    aria-label={`remove ${text}`}
                >
                    &#10005;
                </button>
            )}
        </span>
    );
}