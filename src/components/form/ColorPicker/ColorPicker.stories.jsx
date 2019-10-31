import React from 'react';
import Form from '../Form/Form';

export default {
    title: 'Form.ColorPicker',
    component: Form.ColorPicker
};

export const basic = () => <Form.ColorPicker />;
basic.story = {
    name: 'Default'
};
