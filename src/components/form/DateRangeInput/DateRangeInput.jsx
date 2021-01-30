import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

import { Button, Grid, Input, Label, List, Segment } from 'semantic-ui-react';
import ApproveButton from 'components/buttons/ApproveButton';
import CancelButton from 'components/buttons/CancelButton';
import Popup from 'components/popups/Popup';
import DateInput from '../DateInput';
import DatePicker from '../DatePicker';

/**
 * `DateRangeInput` is a component showing time range
 *
 * Both props: `value` and `defaultValue` are timeFilter objects:
 *
 * ```
 * {
 *   range:'',      // time range label
 *   start:'',      // datetime string representing time range start, eg. '2017-08-06 16:00'
 *   end:''         // datetime string representing time range end, eg. '2017-08-06 18:00'
 * }
 * ```
 *
 * Accessible as `Form.DateRange`.
 */
export default class DateRangeInput extends React.PureComponent {
    static isValidDate(dateTimeString) {
        return moment(dateTimeString || {}).isValid();
    }

    static getStartDateState(start) {
        const startDate = { startError: false };
        if (DateRangeInput.isValidDate(start)) {
            const startMoment = moment(start || {});
            _.extend(startDate, { startDate: startMoment });
        }
        return startDate;
    }

    static getEndDateState(end) {
        const endDate = { endError: false };
        if (DateRangeInput.isValidDate(end)) {
            const endMoment = moment(end || {});
            _.extend(endDate, { endDate: endMoment });
        }
        return endDate;
    }

    static getStartState(startDate) {
        return { startError: false, start: moment(startDate).format(DateRangeInput.DATETIME_FORMAT) };
    }

    static getEndState(endDate) {
        return { endError: false, end: moment(endDate).format(DateRangeInput.DATETIME_FORMAT) };
    }

    constructor(props, context) {
        super(props, context);

        this.state = DateRangeInput.initialState(props);

        this.handleRangeButtonClick = this.handleRangeButtonClick.bind(this);
        this.handleCustomRangeButtonClick = this.handleCustomRangeButtonClick.bind(this);
        this.handleCustomInputChange = this.handleCustomInputChange.bind(this);
        this.handleResetButtonClick = this.handleResetButtonClick.bind(this);
        this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
        this.handleApplyButtonClick = this.handleApplyButtonClick.bind(this);
    }

    componentDidMount() {
        const state = DateRangeInput.initialState(this.props);
        this.setState(state);
    }

    componentDidUpdate(prevProps, prevState) {
        const { defaultValue } = this.props;
        const dirty = !_.isEqual(_.pick(this.state, Object.keys(DateRangeInput.EMPTY_VALUE)), defaultValue);
        const { value } = this.props;
        const newState = {};
        if (prevState.dirty !== dirty) {
            newState.dirty = dirty;
        }
        if (prevProps.value !== value) {
            _.extend(
                newState,
                { ...value },
                DateRangeInput.getStartDateState(value.start),
                DateRangeInput.getEndDateState(value.end)
            );
        }
        if (!_.isEmpty(newState)) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState(newState);
        }
    }

    handleInputChange(proxy, field, onStateUpdate) {
        this.setState({ [field.name]: field.value }, onStateUpdate);
    }

    handleCustomInputChange(proxy, field) {
        this.handleInputChange(proxy, field, () => {
            const newState = { range: DateRangeInput.CUSTOM_RANGE };
            if (_.isEqual(field.name, 'startDate')) {
                _.extend(newState, DateRangeInput.getStartState(field.value));
            } else if (_.isEqual(field.name, 'endDate')) {
                _.extend(newState, DateRangeInput.getEndState(field.value));
            } else if (_.isEqual(field.name, 'start')) {
                _.extend(newState, DateRangeInput.getStartDateState(field.value));
            } else if (_.isEqual(field.name, 'end')) {
                _.extend(newState, DateRangeInput.getEndDateState(field.value));
            }
            this.setState(newState);
        });
    }

    handleRangeButtonClick(proxy, field) {
        const { ranges } = this.props;
        const { start } = ranges[field.name];
        const { end } = ranges[field.name];
        const startDate = DateRangeInput.getStartDateState(start);
        const endDate = DateRangeInput.getEndDateState(end);

        this.setState({
            range: field.name,
            start,
            end,
            ...startDate,
            ...endDate
        });
    }

    handleCustomRangeButtonClick(proxy, field) {
        const { startDate, endDate } = this.state;
        const newState = { range: field.name };
        _.extend(newState, DateRangeInput.getStartState(startDate));
        _.extend(newState, DateRangeInput.getEndState(endDate));
        this.setState(newState);
    }

    handleResetButtonClick() {
        const resetState = this.getResetState(true);
        this.setState(resetState);
    }

    handleApplyButtonClick(event) {
        const { name, onChange } = this.props;
        const { start, end } = this.state;
        const isStartValidDate = DateRangeInput.isValidDate(start);
        const isEndValidDate = DateRangeInput.isValidDate(end);
        const isValid = isStartValidDate && isEndValidDate;

        const newState = {
            startError: !isStartValidDate,
            endError: !isEndValidDate,
            isOpen: !isValid
        };

        this.setState(newState, () => {
            if (isValid) {
                onChange(event, { name, value: this.getTimeFilterObject() });
            }
        });
    }

    handleCancelButtonClick(event) {
        const { name, onCancel } = this.props;
        const resetState = this.getResetState(false);
        this.setState({ ...resetState, isOpen: false }, () =>
            onCancel(event, { name, value: this.getTimeFilterObject() })
        );
    }

    getTimeFilterObject() {
        const { ranges } = this.props;
        const { range, start, end } = this.state;

        const timeFilter = { range };

        if (_.isEqual(range, DateRangeInput.CUSTOM_RANGE)) {
            timeFilter.start = start;
            timeFilter.end = end;
        } else {
            timeFilter.start = _.get(ranges[range], 'start', '');
            timeFilter.end = _.get(ranges[range], 'end', '');
        }

        return timeFilter;
    }

    getResetState(toDefaults) {
        const { defaultValue, value } = this.props;
        const newValue = toDefaults ? defaultValue : value;
        const date = moment();

        return {
            ...newValue,
            startDate: date,
            endDate: date
        };
    }

    isRangeSelected(checkedRange) {
        const { range } = this.state;
        return _.isEqual(range, checkedRange);
    }

    render() {
        const { placeholder, ranges } = this.props;
        const { dirty, range, start, end, isOpen, startDate, startError, endDate, endError } = this.state;
        const from = start ? `from [${start}] ` : '';
        const until = end ? ` until [${end}]` : '';
        const inputValue = this.isRangeSelected(DateRangeInput.CUSTOM_RANGE) ? `${from}${until}` : range;
        const inputFieldHint = (
            <div>
                ISO-8601-compatible date/time expected
                <br />
                Example:
                <br />
                2017-09-21 10:10
            </div>
        );

        return (
            <Popup basic hoverable={false} flowing open={isOpen}>
                <Popup.Trigger>
                    <Input
                        value={inputValue}
                        placeholder={placeholder}
                        icon="dropdown"
                        fluid
                        onChange={() => {}}
                        onFocus={() => this.setState({ isOpen: true, startError: false, endError: false })}
                    />
                </Popup.Trigger>
                <Grid style={_.isEmpty(ranges) ? {} : { width: 1090 }}>
                    <Grid.Row columns={_.isEmpty(ranges) ? 2 : 3}>
                        {!_.isEmpty(ranges) && (
                            <Grid.Column width={4}>
                                <Segment padded>
                                    <Label attached="top">Range:</Label>
                                    <List>
                                        {_.map(ranges, (obj, name) => (
                                            <List.Item key={name}>
                                                <Button
                                                    active={this.isRangeSelected(name)}
                                                    key={name}
                                                    name={name}
                                                    fluid
                                                    onClick={this.handleRangeButtonClick}
                                                >
                                                    {name}
                                                </Button>
                                            </List.Item>
                                        ))}
                                        <List.Item>
                                            <Button
                                                active={this.isRangeSelected(DateRangeInput.CUSTOM_RANGE)}
                                                name={DateRangeInput.CUSTOM_RANGE}
                                                fluid
                                                onClick={this.handleCustomRangeButtonClick}
                                            >
                                                {DateRangeInput.CUSTOM_RANGE}
                                            </Button>
                                        </List.Item>
                                    </List>
                                </Segment>
                            </Grid.Column>
                        )}
                        <Grid.Column width={_.isEmpty(ranges) ? 8 : 6}>
                            <Segment padded className="start-date">
                                <Label attached="top">From:</Label>

                                <List>
                                    <List.Item>
                                        <Popup wide>
                                            <Popup.Trigger>
                                                <Input
                                                    fluid
                                                    name="start"
                                                    type="text"
                                                    value={start}
                                                    placeholder="Start date/time"
                                                    error={startError}
                                                    onChange={this.handleCustomInputChange}
                                                />
                                            </Popup.Trigger>
                                            {inputFieldHint}
                                        </Popup>
                                    </List.Item>
                                    <List.Item>
                                        <DatePicker
                                            name="startDate"
                                            value={startDate}
                                            onChange={this.handleCustomInputChange}
                                            startDate={startDate}
                                            endDate={endDate}
                                            maxDate={moment()}
                                        />
                                    </List.Item>
                                </List>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={_.isEmpty(ranges) ? 8 : 6}>
                            <Segment padded className="end-date">
                                <Label attached="top">To:</Label>

                                <List>
                                    <List.Item>
                                        <Popup wide>
                                            <Popup.Trigger>
                                                <Input
                                                    fluid
                                                    name="end"
                                                    type="text"
                                                    value={end}
                                                    placeholder="End date/time"
                                                    error={endError}
                                                    onChange={this.handleCustomInputChange}
                                                />
                                            </Popup.Trigger>
                                            {inputFieldHint}
                                        </Popup>
                                    </List.Item>
                                    <List.Item>
                                        <DatePicker
                                            name="endDate"
                                            value={endDate}
                                            onChange={this.handleCustomInputChange}
                                            startDate={startDate}
                                            endDate={endDate}
                                            maxDate={moment()}
                                        />
                                    </List.Item>
                                </List>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <div style={{ textAlign: 'right', marginTop: 10 }}>
                    <Button onClick={this.handleResetButtonClick} content="Reset" icon="undo" disabled={!dirty} />
                    <CancelButton onClick={this.handleCancelButtonClick} className="cancel" />
                    <ApproveButton onClick={this.handleApplyButtonClick} content="Apply" positive />
                </div>
            </Popup>
        );
    }
}

DateRangeInput.EMPTY_VALUE = {
    range: '',
    start: '',
    end: ''
};
DateRangeInput.TIME_FORMAT = DateInput.TIME_FORMAT;
DateRangeInput.DATE_FORMAT = DateInput.DATE_FORMAT;
DateRangeInput.DATETIME_FORMAT = DateInput.DATETIME_FORMAT;
DateRangeInput.CUSTOM_RANGE = 'Custom Range';

DateRangeInput.propTypes = {
    /**
     * name of the field
     */
    name: PropTypes.string.isRequired,

    /**
     * timeFilter object ({range:'', start:'', end:''}) to be set when Reset button is clicked
     */
    defaultValue: PropTypes.shape({
        range: PropTypes.string.isRequired,
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired
    }),

    /**
     * timeFilter object ({range:'', start:'', end:''}) to set input values
     */
    value: PropTypes.shape({
        range: PropTypes.string.isRequired,
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired
    }),

    /**
     * if set then the component renders initially open
     */
    // eslint-disable-next-line react/no-unused-prop-types
    defaultOpen: PropTypes.bool,

    /**
     * text to be displayed in the input field when there's no range set
     */
    placeholder: PropTypes.string,

    /**
     * ranges object containing dict of named custom ranges with start/end string dates "YYYY-MM-DD HH:mm"
     */
    ranges: PropTypes.objectOf(
        PropTypes.shape({ start: PropTypes.string.isRequired, end: PropTypes.string.isRequired })
    ),

    /**
     * function (event, data) called on Apply button click, timeFilter object value is sent as data.value
     */
    onChange: PropTypes.func,

    /**
     * function (event, data) called on Cancel button click, timeFilter object value is sent as data.value
     */
    onCancel: PropTypes.func
};

DateRangeInput.defaultProps = {
    defaultValue: DateRangeInput.EMPTY_VALUE,
    value: DateRangeInput.EMPTY_VALUE,
    defaultOpen: false,
    placeholder: '',
    ranges: {},
    onChange: () => {},
    onCancel: () => {}
};

DateRangeInput.initialState = props => ({
    ...props.defaultValue, // { range, start, end }
    ...props.value, // { range, start, end }
    ...DateRangeInput.getStartDateState(props.value.start), // { startError, startDate }
    ...DateRangeInput.getEndDateState(props.value.end), // { endError, endDate }
    isOpen: props.defaultOpen,
    dirty: false
});
