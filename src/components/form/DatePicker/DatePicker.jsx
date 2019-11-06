import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

/**
 * `DatePicker` is a component showing calendar picker using [react-datepicker library](https://github.com/Hacker0x01/react-datepicker)
 *
 * Accessible as `DatePicker` or `Form.DatePicker`.
 */
export function DatePickerWithoutMemo({ name, value, onChange, minDate, maxDate, startDate, endDate, timeIntervals }) {
    const handleSelectedDateChange = date => onChange(date, { name, value: date });

    const getMinMaxTime = (minMaxDate, defaultValue) => {
        const selectedValue = value || moment();
        if (!!minMaxDate && minMaxDate.isSame(selectedValue, 'day')) {
            return minMaxDate;
        }
        return defaultValue;
    };
    const getMinTime = () => getMinMaxTime(minDate, moment().startOf('day'));
    const getMaxTime = () => getMinMaxTime(maxDate, moment().endOf('day'));

    return (
        <ReactDatePicker
            selected={value}
            onChange={handleSelectedDateChange}
            startDate={startDate}
            endDate={endDate}
            minDate={minDate}
            maxDate={maxDate}
            minTime={getMinTime()}
            maxTime={getMaxTime()}
            timeFormat="HH:mm"
            showTimeSelect
            timeIntervals={timeIntervals}
            inline
            calendarClassName="input-time-filter"
            fixedHeight
        />
    );
}

DatePickerWithoutMemo.propTypes = {
    /**
     * name of the field
     */
    name: PropTypes.string.isRequired,

    /**
     * MomentJS object with date to be selected on the picker
     */
    value: PropTypes.instanceOf(moment),

    /**
     * function (selectedDateMoment, {name, value}) called on calendar date change
     */
    onChange: PropTypes.func,

    /**
     * MomentJS object with min allowed date on the picker
     */
    minDate: PropTypes.instanceOf(moment),

    /**
     * MomentJS object with max allowed date on the picker
     */
    maxDate: PropTypes.instanceOf(moment),

    /**
     * MomentJS object for start range date (used when two InputDate components are used to display date range)
     */
    startDate: PropTypes.instanceOf(moment),

    /**
     * MomentJS object for end range date (used when two InputDate components are used to display date range)
     */
    endDate: PropTypes.instanceOf(moment),

    /**
     * interval (in minutes) between time options
     */
    timeIntervals: PropTypes.number
};

DatePickerWithoutMemo.defaultProps = {
    value: null,
    onChange: () => {},
    minDate: undefined,
    maxDate: undefined,
    startDate: undefined,
    endDate: undefined,
    timeIntervals: 60
};

// eslint-disable-next-line react/display-name,react/jsx-props-no-spreading
const DatePicker = React.memo(props => <DatePickerWithoutMemo {...props} />);
DatePicker.displayName = 'DatePicker';
export default DatePicker;
