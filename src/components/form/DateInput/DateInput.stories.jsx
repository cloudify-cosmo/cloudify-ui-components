import React from 'react';
import moment from 'moment';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import StoryWithHooks from 'decorators/StoryWithHooks';
import Form from '../Form/Form';
import DateInput from './DateInput';

export default {
    title: 'Form.Date',
    component: DateInput,
    decorators: [LiveEditDecorator({ DateInput, Form, moment })]
};

export const basic = StoryWithHooks(() => {
    const [date, setDate] = React.useState('');

    return <Form.Date name="date" value={date} onChange={(event, { value }) => setDate(value)} />;
});

export const defaultValue = StoryWithHooks(() => {
    const defaultDate = `${moment().format(DateInput.DATE_FORMAT)} 00:00`;
    const [date, setDate] = React.useState(defaultDate);

    return (
        <Form.Date
            name="date"
            value={date}
            defaultValue={defaultDate}
            onChange={(event, { value }) => setDate(value)}
        />
    );
});

export const minimalAndMaximalDate = StoryWithHooks(() => {
    const [date, setDate] = React.useState('');

    return (
        <Form.Date
            name="date"
            value={date}
            minDate={moment().subtract(1, 'W')}
            maxDate={moment().add(1, 'W')}
            onChange={(event, { value }) => setDate(value)}
        />
    );
});

export const customTimeIntervals = StoryWithHooks(() => {
    const [date, setDate] = React.useState('');

    return <Form.Date name="date" value={date} onChange={(event, { value }) => setDate(value)} timeIntervals={30} />;
});

export const invalidValue = () => <Form.Date name="date" value="Invalid value" />;
