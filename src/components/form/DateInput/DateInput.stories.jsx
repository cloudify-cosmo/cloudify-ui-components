import React, { useState } from 'react';
import moment from 'moment';
import Form from '../Form/Form';
import DateInput from './DateInput';

export default {
    title: 'Form.Date',
    component: DateInput
};

// FIXME: When https://github.com/storybookjs/storybook/issues/8177 is solved, remove this wrapper and render component with hooks directly in the story export
const Basic = () => {
    const [date, setDate] = useState('');

    return <Form.Date name="date" value={date} onChange={(event, { value }) => setDate(value)} />;
};
export const basic = () => <Basic />;

const DefaultValue = () => {
    const defaultDate = `${moment().format(DateInput.DATE_FORMAT)} 00:00`;
    const [date, setDate] = useState(defaultDate);

    return (
        <Form.Date
            name="date"
            value={date}
            defaultValue={defaultDate}
            onChange={(event, { value }) => setDate(value)}
        />
    );
};
export const defaultValue = () => <DefaultValue />;

const MinimalAndMaximalDate = () => {
    const [date, setDate] = useState('');

    return (
        <Form.Date
            name="date"
            value={date}
            minDate={moment().subtract(1, 'W')}
            maxDate={moment().add(1, 'W')}
            onChange={(event, { value }) => setDate(value)}
        />
    );
};
export const minimalAndMaximalDate = () => <MinimalAndMaximalDate />;

const CustomTimeIntervals = () => {
    const [date, setDate] = useState('');

    return <Form.Date name="date" value={date} onChange={(event, { value }) => setDate(value)} timeIntervals={30} />;
};
export const customTimeIntervals = () => <CustomTimeIntervals />;
