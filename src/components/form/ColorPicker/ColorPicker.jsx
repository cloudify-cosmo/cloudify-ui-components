import React from 'react';
import PropTypes from 'prop-types';

import { CompactPicker } from 'react-color';
import tinycolor from 'tinycolor2';

/**
 * ColorPicker is a component showing CompactPicker component from [react-color](https://casesandberg.github.io/react-color/) library
 *
 * Accessible as `ColorPicker` or `Form.ColorPicker`.
 *
 */
export default function ColorPicker(props) {
    const { name, value, onChange } = props;

    const handleInputChange = (color, event) => {
        onChange(event, { name, value: color.hex });
    };

    const color = tinycolor(value);

    return <CompactPicker color={color.toHsl()} onChange={handleInputChange} />;
}

ColorPicker.propTypes = {
    /**
     * name of the color picker component
     */
    name: PropTypes.string,
    /**
     * hexadecimal color value
     */
    value: PropTypes.string,
    /**
     * function called on color change
     */
    onChange: PropTypes.func
};

ColorPicker.defaultProps = {
    name: '',
    value: '#000000',
    onChange: () => {}
};
