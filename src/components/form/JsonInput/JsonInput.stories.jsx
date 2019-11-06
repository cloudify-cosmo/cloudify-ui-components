import React, { useState } from 'react';
import Form from '../Form/Form';
import JsonInput from './JsonInput';

export default {
    title: 'Form.Json',
    component: JsonInput
};

// FIXME: When https://github.com/storybookjs/storybook/issues/8177 is solved, remove this wrapper and render component with hooks directly in the story export
const JSONvalue = () => {
    const [value, setValue] = useState('{"webserver_port2":6,"webserver_port1":5}');

    return (
        <Form>
            <Form.Json name="port_conf" value={value} onChange={(event, { value: v }) => setValue(v)} />
        </Form>
    );
};
export const JSONValue = () => <JSONvalue />;

const TextValue = () => {
    const [value, setValue] = useState('Text\nScript\nSomething');

    return (
        <Form>
            <Form.Json name="port_conf" value={value} onChange={(event, { value: v }) => setValue(v)} />
        </Form>
    );
};
export const textValue = () => <TextValue />;

const MarkedAsError = () => {
    const [value, setValue] = useState('{"webserver_port2":6,"webserver_port1":5}');

    return (
        <Form>
            <Form.Json name="port_conf" error value={value} onChange={(event, { value: v }) => setValue(v)} />
        </Form>
    );
};
export const markedAsError = () => <MarkedAsError />;
