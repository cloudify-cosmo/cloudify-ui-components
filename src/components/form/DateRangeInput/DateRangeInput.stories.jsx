import React, { useState } from 'react';
import moment from 'moment';
import Form from '../Form/Form';
import DateRangeInput from './DateRangeInput';

export default {
    title: 'Form.DateRange',
    component: DateRangeInput
};

// FIXME: When https://github.com/storybookjs/storybook/issues/8177 is solved, remove this wrapper and render component with hooks directly in the story export
const Basic = () => {
    const [timeFilter, setTimeFilter] = useState(Form.DateRange.EMPTY_VALUE);
    return <Form.DateRange name="timeFilter" value={timeFilter} onChange={(e, { value }) => setTimeFilter(value)} />;
};
export const basic = () => <Basic />;

const DefaultValue = () => {
    const dV = {
        start: moment()
            .subtract(1, 'W')
            .format(DateRangeInput.DATETIME_FORMAT),
        end: moment()
            .subtract(1, 'W')
            .format(DateRangeInput.DATETIME_FORMAT),
        range: 'Custom default value range text'
    };
    const [timeFilter, setTimeFilter] = useState(dV);
    return (
        <Form.DateRange
            name="timeFilter"
            defaultValue={dV}
            value={timeFilter}
            onChange={(e, { value }) => setTimeFilter(value)}
        />
    );
};
export const defaultValue = () => <DefaultValue />;

const CustomRanges = () => {
    const [timeFilter, setTimeFilter] = useState(Form.DateRange.EMPTY_VALUE);
    const ranges = {
        'Last 4 Hours': {
            start: moment()
                .subtract(4, 'hours')
                .format(DateRangeInput.DATETIME_FORMAT),
            end: ''
        },
        'Last Month': {
            start: moment()
                .subtract(1, 'month')
                .format(DateRangeInput.DATETIME_FORMAT),
            end: ''
        },
        'Last Year': {
            start: moment()
                .subtract(1, 'year')
                .format(DateRangeInput.DATETIME_FORMAT),
            end: ''
        }
    };
    return (
        <Form.DateRange
            name="timeFilter"
            value={timeFilter}
            ranges={ranges}
            onChange={(e, { value }) => setTimeFilter(value)}
        />
    );
};
export const customRanges = () => <CustomRanges />;
