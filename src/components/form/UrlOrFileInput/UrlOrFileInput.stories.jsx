import React from 'react';
import { Label } from 'semantic-ui-react';
import Form from '../Form/Form';

export default {
    title: 'Form.UrlOrFile',
    component: Form.UrlOrFile
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
