import React from 'react';
import moment from 'moment';

import LiveEditDecorator from 'decorators/LiveEditDecorator';

import Form from '../Form/Form';
import { DatePickerWithoutMemo } from './DatePicker';

export default {
    title: 'Form/DatePicker',
    component: DatePickerWithoutMemo,
    decorators: [LiveEditDecorator({ Form, moment })]
};

export const basic = () => {
    const [date, setDate] = React.useState(moment('20190101'));

    return <Form.DatePicker name="date" value={date} onChange={(e, { value }) => setDate(value)} />;
};

export const minimalAndMaximalDate = () => {
    const [date, setDate] = React.useState(moment('20190110'));

    return (
        <Form.DatePicker
            name="date"
            minDate={moment('20190105')}
            maxDate={moment('20190115')}
            value={date}
            onChange={(e, { value }) => setDate(value)}
        />
    );
};

export const customTimeIntervals = () => {
    const [date, setDate] = React.useState(moment('20190101'));

    return <Form.DatePicker name="date" value={date} onChange={(e, { value }) => setDate(value)} timeIntervals={1} />;
};
