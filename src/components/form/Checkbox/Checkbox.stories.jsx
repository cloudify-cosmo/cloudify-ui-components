import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import Form from '../Form/Form';

export default {
    title: 'Form.Checkbox',
    component: Form.Checkbox,
    decorators: [LiveEditDecorator({ Form })]
};

export const basic = () => <Form.Checkbox label="Notifications" help="Send e-mail notifications about updates" />;

export const withoutHelp = () => <Form.Checkbox label="Notifications" />;

export const Toggle = () => <Form.Checkbox toggle label="Newsletter" />;
