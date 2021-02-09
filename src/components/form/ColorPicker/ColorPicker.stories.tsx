import { Story } from '@storybook/react';
import React from 'react';

import Form from '../Form/Form';
import { ColorPickerProps } from './ColorPicker';

export default {
    title: 'Form/ColorPicker',
    component: Form.ColorPicker,
    argTypes: {
        value: {
            control: 'color'
        }
    }
};

// eslint-disable-next-line react/jsx-props-no-spreading
export const basic: Story<Required<ColorPickerProps>> = args => <Form.ColorPicker {...args} />;
basic.storyName = 'Default';
basic.args = {
    name: '',
    value: '#000000',
    onChange: (...args) => {
        // eslint-disable-next-line no-console
        console.log('changed', ...args);
    }
};
