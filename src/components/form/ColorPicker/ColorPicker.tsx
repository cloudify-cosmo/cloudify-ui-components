import React, { ChangeEvent, FunctionComponent } from 'react';

import { ColorChangeHandler, CompactPicker } from 'react-color';
import tinycolor from 'tinycolor2';

export interface ColorPickerProps {
    /**
     * Name of the color picker component
     */
    name?: string;

    /**
     * Hexadecimal color value
     */
    value?: string;

    /**
     * Function called on color change
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>, data: { name: string; value: string }) => void;
}

/**
 * ColorPicker is a component showing CompactPicker component from [react-color](https://casesandberg.github.io/react-color/) library
 *
 * Accessible as `ColorPicker` or `Form.ColorPicker`.
 *
 */
const ColorPicker: FunctionComponent<ColorPickerProps> = ({ name = '', value = '#000000', onChange = () => {} }) => {
    const handleInputChange: ColorChangeHandler = (color, event) => {
        onChange(event, { name, value: color.hex });
    };

    const color = tinycolor(value);

    return <CompactPicker color={color.toHsl()} onChange={handleInputChange} />;
};

export default ColorPicker;
