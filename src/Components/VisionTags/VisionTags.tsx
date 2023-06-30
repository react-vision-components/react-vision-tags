import React, { useEffect, useRef, useState } from 'react';
import { Vision } from '../../@types/Vision/Vision';

import classnames from 'classnames';
import VisionTag from '../VisionTag/VisionTag'
import './VisionTags.css';
import { HexInterpolator } from '../../Helpers/ColorInterpolator/ColorInterpolator';
import { ColorInterpolatorOptions } from '../../Classes/ColorInterpolatorOptions';

export interface VisionTagsProps {
    name?: string;
    placeHolder: string;
    value: Array<Vision>;
    schema: ColorInterpolatorOptions;
    onChange?: (tags: Array<Vision>) => void;
    onBlur?: any;
    separators?: string[];
    disableBackspaceRemove?: boolean;
    onExisting?: (tag: string) => void;
    onRemoved?: (tag: string) => void;
    disabled?: boolean;
    isEditOnRemove?: boolean;
    beforeAddValidate?: (tag: string | Vision, existingTags: string[] | Array<Vision>) => boolean;
    onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    classNames?: {
        input?: string;
        tag?: string;
    };    
  }

const defaultSeparators = ["Enter"];

export function VisionTags({
    name,
    placeHolder,
    value,
    schema,
    onChange,
    onBlur,
    separators,
    disableBackspaceRemove,
    onExisting,
    onRemoved,
    disabled,
    isEditOnRemove,
    beforeAddValidate,
    onKeyUp,
    classNames,
  }: React.PropsWithChildren<VisionTagsProps>){
    const [tags, setTags] = useState<Array<Vision>>(value as Array<Vision>);
    
    const onChangeRef = useRef(false);
    const setTagsRef = useRef(false);
  
    useEffect(() => {
      if(onChangeRef.current) 
        onChange && onChange(tags);
      else onChangeRef.current = true;
    }, [tags])
  
    useEffect(() => {
      if(setTagsRef.current){
        if (JSON.stringify(value) !== JSON.stringify(tags)){
          setTags(value);
        }
      }
      else setTagsRef.current = true;
    }, [value])
  
    const handleOnKeyUp = (e: any) => {
      e.stopPropagation();
  
      const text = e.target!.value;
  
      if(!text && !disableBackspaceRemove && tags.length && e.key === 'Backspace'){
        e.target.value = isEditOnRemove ? `${tags.at(-1)}` : "";
        setTags([...tags.slice(0,-1)]);
      }
  
      if(text && (separators || defaultSeparators).includes(e.key)){
        e.preventDefault();
        if(beforeAddValidate && !beforeAddValidate(text, tags)) return;
  
        if(tags.filter((tag) => tag.name === text).length > 0){
          onExisting && onExisting(text);
          return;
        }
      
        setTags([...tags, {name: text, confidence:'100'}]);
        e.target.value = "";
      }
    };
  
    const onTagRemove = (text: string) => {
      setTags(tags.filter((tag: Vision) => tag.name !== text));
      onRemoved && onRemoved(text);
    }

    const getColorValue = (conf: number) => {
      let valuecount = Math.trunc((100/(schema.confidence.high-schema.confidence.low)))
      let distance = conf - schema.confidence.low;
      console.log('before any calculations:')
      console.log(valuecount);
      console.log(distance);
      if(!schema.hex.mid){
        return HexInterpolator(schema.hex.low, schema.hex.high, (valuecount * distance)).padStart(6,'0')
      }
 
      const midpoint = valuecount/2;
      const bottomHalf = distance <= midpoint;
      valuecount = Math.trunc((100/(schema.confidence.high-schema.confidence.low))/2);
      if(bottomHalf){
        console.log('bottom half');
        console.log(valuecount);
        console.log(distance)
        return HexInterpolator(schema.hex.low, schema.hex.mid, (valuecount * distance)).padStart(6,'0')
      }
      else{
        distance = conf - midpoint;
        console.log('top half');
        console.log(valuecount);
        console.log(distance)
        return HexInterpolator(schema.hex.mid, schema.hex.high, (valuecount * distance)).padStart(6,'0')
      }
    }
  
    const tagColor = (conf: string) => {
      const low = Number(schema.confidence.low) < 1 ? Number(schema.confidence.low) * 100 : Number(schema.confidence.low);
      const high = Number(schema.confidence.high) < 1 ? Number(schema.confidence.high) * 100 : Number(schema.confidence.high);
      const confidence = conf !== '100' ? Math.trunc(Number(conf)*100) : 100;
      const value = (confidence < low ? schema.hex.low : (confidence >= high ? schema.hex.high : getColorValue(confidence)))
      const tagColor = `#${value}`
      return tagColor;
    }
  
    return (
      <div className={"tags-container"} aria-labelledby={name}>
        {tags.map((tag: Vision) => {
        return (
          <VisionTag
            key={tag.name}
            //className={tagColor(tag.confidence)}
            text={tag.name}
            color={tagColor(tag.confidence)}
            confidence={tag.confidence || '100'}
            remove={onTagRemove}
            disabled={disabled}
          />
        )})}
  
        <input
          className={classnames((classNames != null ? classNames.input : ''), 'tags-input')}
          type="text"
          name={name}
          placeholder={placeHolder}
          onKeyDown={handleOnKeyUp}
          onBlur={onBlur}
          disabled={disabled}
          onKeyUp={onKeyUp}
        />
      </div>
    );
  }