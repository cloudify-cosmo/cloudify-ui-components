import React from 'react';

import DivContainer from 'decorators/DivContainer';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import StoryWithHooks from 'decorators/StoryWithHooks';
import Form from '../Form';

export default {
    title: 'Form/Time',
    component: Form.Time,
    decorators: [LiveEditDecorator({ Form, DivContainer })]
};

export const basic = StoryWithHooks(() => {
    const [time, setTime] = React.useState('04:30');

    return (
        <DivContainer height={250}>
            <Form.Time name="time" value={time} onChange={(e, { value }) => setTime(value)} />
        </DivContainer>
    );
});
