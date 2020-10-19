import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import Form from './Form';

export default {
    title: 'Form/Form',
    component: Form,
    decorators: [LiveEditDecorator({ Form })]
};

export const basic = () => (
    <Form onSubmit={() => {}} errors={[]}>
        <Form.Divider>User Data</Form.Divider>

        <Form.Field label="Username" help="Your username" required>
            <Form.Input name="username" placeholder="Use only letters" onChange={() => {}} />
        </Form.Field>

        <Form.Field label="E-mail" help="Your e-mail address" required>
            <Form.Input name="email" placeholder="abc@def.com" onChange={() => {}} />
        </Form.Field>

        <Form.Field label="Password" help="Your password" required>
            <Form.Input name="password" placeholder="Make your password strong" type="password" onChange={() => {}} />
        </Form.Field>

        <Form.Field label="Confirm Password" help="Confirm your password" required>
            <Form.Input name="confirmPassword" placeholder="Confirm password" type="password" onChange={() => {}} />
        </Form.Field>

        <Form.Divider>User Preferences</Form.Divider>

        <Form.Field>
            <Form.Checkbox label="Newsletter" help="Check to subscribe to our newsletter" />
        </Form.Field>

        <Form.Field>
            <Form.Checkbox label="Notifications" help="Send e-mail notifications about updates" />
        </Form.Field>
    </Form>
);
basic.storyName = 'Default';
