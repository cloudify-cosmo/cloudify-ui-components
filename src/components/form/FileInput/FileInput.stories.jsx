import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import Form from '../Form/Form';

export default {
    title: 'Form.File',
    component: Form.File,
    decorators: [LiveEditDecorator({ Form })]
};

export const basic = () => (
    <Form>
        <Form.Field label="File">
            <Form.File name="file1" />
        </Form.Field>
    </Form>
);

export const noReset = () => (
    <Form>
        <Form.Field label="File">
            <Form.File name="file2" showReset={false} />
        </Form.Field>
    </Form>
);

export const button = () => (
    <Form.File
        name="file3"
        showInput={false}
        showReset={false}
        openButtonParams={{ className: 'rightFloated', content: 'Load File', labelPosition: 'left' }}
    />
);
