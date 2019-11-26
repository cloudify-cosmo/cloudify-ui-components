import React from 'react';
import { Label } from 'semantic-ui-react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import Form from '../Form/Form';

export default {
    title: 'Form.UrlOrFile',
    component: Form.UrlOrFile,
    decorators: [LiveEditDecorator({ Label, Form })]
};

export const basic = () => (
    <Form>
        <Form.Field label="File">
            <Form.UrlOrFile
                name="blueprint"
                value=""
                placeholder="Provide the blueprint's URL or click browse to select a file"
                onChangeUrl={() => {}}
                onFocusUrl={() => {}}
                onBlurUrl={() => {}}
                onChangeFile={() => {}}
                onResetFile={() => {}}
                label={<Label>URL or File</Label>}
            />
        </Form.Field>
    </Form>
);
