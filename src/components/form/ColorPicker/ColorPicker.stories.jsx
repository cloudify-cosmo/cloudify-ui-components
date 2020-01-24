import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import Form from '../Form/Form';

export default {
    title: 'Form/ColorPicker',
    component: Form.ColorPicker,
    decorators: [LiveEditDecorator({ Form })]
};

export const basic = () => <Form.ColorPicker />;
basic.story = {
    name: 'Default'
};
