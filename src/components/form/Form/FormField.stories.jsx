import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import Form from './Form';
import { FormFieldWithoutMemo } from './FormField';

export default {
    title: 'Form/FormField',
    component: FormFieldWithoutMemo,
    decorators: [LiveEditDecorator({ Form })]
};

export const required = () => (
    <Form>
        <Form.Field label="Username" required>
            <Form.Input placeholder="Provide username" />
        </Form.Field>
    </Form>
);

export const error = () => (
    <Form>
        <Form.Field error>
            <Form.Input placeholder="Provide username" />
        </Form.Field>
    </Form>
);

export const label = () => (
    <Form>
        <Form.Field label="Username">
            <Form.Input placeholder="Provide username" />
        </Form.Field>
    </Form>
);

export const help = () => (
    <Form>
        <Form.Field label="Username" help="Use only alphanumeric characters">
            <Form.Input placeholder="Provide username" />
        </Form.Field>
    </Form>
);
