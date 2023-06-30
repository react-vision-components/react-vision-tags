import React from 'react';
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
    className}: React.PropsWithChildren<VisionTagProps>){
    const handleOnRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        remove(text);
    }
    const textColor = getTextColor(color);
    return (
        <span vision-tag={true} style={{backgroundColor: color, color:textColor}} className={classnames(className)}>
            <span>{text}</span>
            {!disabled && (
                <button
                    tag-button={true}
                    type="button"
                    onClick={handleOnRemove}
                    aria-label={`remove ${text}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                </button>
            )}
        </span>
    );
}