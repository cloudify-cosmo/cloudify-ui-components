import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import { Button, Input } from 'semantic-ui-react';
import Popup from '../../popups/Popup';
import DatePicker from '../DatePicker';

/**
 * `DateInput` is a component showing calendar input with datetime picker in popup
 */
export default class DateInput extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = DateInput.initialState;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleResetButtonClick = this.handleResetButtonClick.bind(this);
        this.handleDataPickerChange = this.handleDataPickerChange.bind(this);
    }

    static getDateString(momentDate) {
        return moment(momentDate).format(DateInput.DATETIME_FORMAT);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.value !== DateInput.getDateString(prevState.dateValue)) {
            return DateInput.getDateState(nextProps.value, nextProps.defaultValue);
        }
        return null;
    }

    static getDateState(newStringDate, stringDefaultDate) {
        if (_.isEmpty(newStringDate)) {
            return { dirty: !_.isEqual(stringDefaultDate, ''), dateError: false, dateValue: undefined };
        }

        const newMomentDate = moment(newStringDate);
        if (newMomentDate.isValid()) {
            return { dirty: !_.isEqual(stringDefaultDate, newStringDate), dateError: false, dateValue: newMomentDate };
        }

        return { dirty: true, dateError: true, dateValue: undefined };
    }

    handleDateChange(event, newValue) {
        const { name, onChange } = this.props;
        onChange(event, { name, value: newValue });
    }

    handleDataPickerChange(proxy, field) {
        this.handleDateChange(proxy, DateInput.getDateString(field.value));
    }

    handleInputChange(proxy, field) {
        this.handleDateChange(proxy, field.value);
    }

    handleResetButtonClick(proxy) {
        const { defaultValue } = this.props;
        this.handleDateChange(proxy, defaultValue);
    }

    render() {
        const { value, placeholder, minDate, maxDate, timeIntervals } = this.props;
        const { dateError, dateValue, dirty, isOpen } = this.state;

        return (
            <Popup
                hoverable
                flowing
                onClose={() => this.setState({ isOpen: false })}
                open={isOpen}
                position="top right"
            >
                <Popup.Trigger>
                    <Input
                        name="value"
                        value={value}
                        placeholder={placeholder}
                        fluid
                        action
                        error={dateError}
                        onChange={this.handleInputChange}
                        onClick={() => this.setState({ isOpen: false })}
                    >
                        <input />
                        <Button onClick={() => this.setState({ isOpen: true })} icon="calendar" />
                        <Button onClick={this.handleResetButtonClick} icon="cancel" disabled={!dirty} />
                    </Input>
                </Popup.Trigger>

                <DatePicker
                    name="dateValue"
                    value={dateValue}
                    onChange={this.handleDataPickerChange}
                    minDate={minDate}
                    maxDate={maxDate}
                    timeIntervals={timeIntervals}
                />
            </Popup>
        );
    }
}

DateInput.TIME_FORMAT = 'HH:mm';
DateInput.DATE_FORMAT = 'YYYY-MM-DD';
DateInput.DATETIME_FORMAT = `${DateInput.DATE_FORMAT} ${DateInput.TIME_FORMAT}`;

DateInput.propTypes = {
    /**
     * name of the field
     */
    name: PropTypes.string.isRequired,

    /**
     * string data value
     */
    value: PropTypes.string.isRequired,

    /**
     * string data value to be set when Reset button is clicked
     */
    defaultValue: PropTypes.string,

    /**
     * moment object for minimal date available in picker
     */
    minDate: PropTypes.instanceOf(moment),

    /**
     * moment object for maximal date available in picker
     */
    maxDate: PropTypes.instanceOf(moment),

    /**
     * function called on data picker change
     */
    onChange: PropTypes.func,

    /**
     * input field placeholder
     */
    placeholder: PropTypes.string,

    /**
     * time interval between available time options (in minutes)
     */
    timeIntervals: PropTypes.number
};

DateInput.defaultProps = {
    defaultValue: '',
    minDate: undefined,
    maxDate: undefined,
    onChange: _.noop,
    placeholder: DateInput.DATETIME_FORMAT,
    timeIntervals: 5
};

DateInput.initialState = {
    dateError: false,
    dateValue: null,
    dirty: false,
    isOpen: false
};
