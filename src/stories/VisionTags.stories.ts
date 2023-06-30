import type { Meta, StoryObj } from '@storybook/react';

import { VisionTags } from '../Components/VisionTags/VisionTags'
import { ColorSpectrum } from '../@types/ColorSpectrum';
import { ConfidenceThreshold } from '../@types/ConfidenceThreshold';
import { ColorInterpolatorOptions } from '../Classes/ColorInterpolatorOptions';
import { Vision } from '../@types/Vision';

import TestDataGenerator from '../Helpers/TestDataGenerator/TestDataGenerator';

const colors:ColorSpectrum = {
    low: 'FF0000',
    mid: 'FFFF00',
    high: '00FF00'
}
const threshold:ConfidenceThreshold = {
    low: 70,
    high: 90
}
const colorScheme:ColorInterpolatorOptions = new ColorInterpolatorOptions(colors, threshold);

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
//<VisionTags value={item.cloudTags as Vision[]} onChange={saveTags} name={`tags`} schema={colorScheme} placeHolder='Enter tags' />
const meta = {
  title: 'VisionTags',
  component: VisionTags,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof VisionTags>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    schema: colorScheme,
    name: 'tags',
    placeHolder: 'Enter Tags',
    value: TestDataGenerator(colorScheme,2)
  },
};
