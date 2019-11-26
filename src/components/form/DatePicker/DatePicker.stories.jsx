import React from 'react';
import moment from 'moment';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import StoryWithHooks from 'decorators/StoryWithHooks';
import Form from '../Form/Form';
import { DatePickerWithoutMemo } from './DatePicker';

export default {
    title: 'Form.DatePicker',
    component: DatePickerWithoutMemo,
    decorators: [LiveEditDecorator({ Form, moment })]
};

export const basic = StoryWithHooks(() => {
    const [date, setDate] = React.useState(null);

    return <Form.DatePicker name="date" value={date} onChange={(e, { value }) => setDate(value)} />;
});

export const selectedDate = StoryWithHooks(() => {
    const [date, setDate] = React.useState(moment());

    return <Form.DatePicker name="date" value={date} onChange={(e, { value }) => setDate(value)} />;
});

export const minimalAndMaximalDate = StoryWithHooks(() => {
    const [date, setDate] = React.useState(moment());

    return (
        <Form.DatePicker
            name="date"
            minDate={moment().subtract(1, 'w')}
            maxDate={moment().subtract(1, 'd')}
            value={date}
            onChange={(e, { value }) => setDate(value)}
        />
    );
});

export const customTimeIntervals = StoryWithHooks(() => {
    const [date, setDate] = React.useState(moment());

    return <Form.DatePicker name="date" value={date} onChange={(e, { value }) => setDate(value)} timeIntervals={1} />;
});
