import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import Form from './Form';

export default {
    title: 'Form/FormDivider',
    component: Form.Divider,
    decorators: [LiveEditDecorator({ Form })]
};

export const basic = () => <Form.Divider>User Data</Form.Divider>;
