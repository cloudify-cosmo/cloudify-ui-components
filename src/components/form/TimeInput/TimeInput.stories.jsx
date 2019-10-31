import React, { useState } from 'react';
import Form from '../Form';

export default {
    title: 'Form.Time',
    component: Form.Time,
    // eslint-disable-next-line react/display-name
    decorators: [storyFn => <div style={{ height: 250 }}>{storyFn()}</div>]
};

// FIXME: When https://github.com/storybookjs/storybook/issues/8177 is solved, remove this wrapper and render component with hooks directly in the story export
const Basic = () => {
    const [time, setTime] = useState('04:30');
    return <Form.Time name="time" value={time} onChange={(e, { value }) => setTime(value)} />;
};
export const basic = () => <Basic />;
