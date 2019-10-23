import React from 'react';
import ColorPicker from './ColorPicker';

export default {
    title: 'Form/ColorPicker',
    component: ColorPicker
};

export const basic = () => <ColorPicker />;
basic.story = {
    name: 'Default'
};
