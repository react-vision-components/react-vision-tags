# React Vision Tags
[![MIT](https://img.shields.io/npm/l/react-tag-input.svg?style=flat-square)](https://github.com/react-vision-components/react-vision-tags/blob/main/LICENSE)

## But Why?!
Created in order to make Computer Vision tags from Azure Computer Vision more flashy for a customer and end user who likes to see different things.    

## Features, not bugs
- Added tags automatically have a score of 100% by design.
- Color of background text will(note: should) switch from black to white baste on luminence of the background that is generated.  
- More to come but it's too late and I can't remember them all :-|
## Install

To install this component:

```bash
  npm i @react-vision-components/react-vision-tags
```

## Usage

1.  Create your colors
```typescript
const colors:ColorSpectrum = { low: 'FF0000', mid: 'FFFF00', high: '00FF00' }
```
2.  Set your thresholds:
```typescript
const threshold:ConfidenceThreshold = { low: 70, high: 90 }
```

3.  Create your schema:
```typescript
const colorScheme:ColorInterpolatorOptions = new ColorInterpolatorOptions(colors, threshold);
```

4.  Drop the component on your page:
```html
<VisionTags value={item.cloudTags as Vision[]} name={tags} schema={colorScheme} placeHolder='Enter tags' />
```

NOTE:  value is expecting an array of objects with properties "name" of type string and "confidence" and percentage as a decimal string...for example:
```JSON
{
    name: 'Example',
    confidence: '0.91'
}
```
## Authors

- [District Cloud Solutions, LLC](https://www.districtcloudsolutions.com)

