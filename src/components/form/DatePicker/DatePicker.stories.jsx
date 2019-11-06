import React, { useState } from 'react';
import moment from 'moment';
import Form from '../Form/Form';
import { DatePickerWithoutMemo } from './DatePicker';

export default {
    title: 'Form.DatePicker',
    component: DatePickerWithoutMemo
};

// FIXME: When https://github.com/storybookjs/storybook/issues/8177 is solved, remove this wrapper and render component with hooks directly in the story export
const Basic = () => {
    const [date, setDate] = useState(null);
    return <Form.DatePicker name="date" value={date} onChange={(e, { value }) => setDate(value)} />;
};
export const basic = () => <Basic />;

const SelectedDate = () => {
    const [date, setDate] = useState(moment());
    return <Form.DatePicker name="date" value={date} onChange={(e, { value }) => setDate(value)} />;
};
export const selectedDate = () => <SelectedDate />;

const MinimalAndMaximalDate = () => {
    const [date, setDate] = useState(moment());
    return (
        <Form.DatePicker
            name="date"
            minDate={moment().subtract(1, 'w')}
            maxDate={moment().subtract(1, 'd')}
            value={date}
            onChange={(e, { value }) => setDate(value)}
        />
    );
};
export const minimalAndMaximalDate = () => <MinimalAndMaximalDate />;

const CustomTimeIntervals = () => {
    const [date, setDate] = useState(moment());
    return <Form.DatePicker name="date" value={date} onChange={(e, { value }) => setDate(value)} timeIntervals={1} />;
};
export const customTimeIntervals = () => <CustomTimeIntervals />;
