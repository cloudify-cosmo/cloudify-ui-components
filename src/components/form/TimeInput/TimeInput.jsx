import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Table, Dropdown } from 'semantic-ui-react';

const generateOptions = (start, end, step, padding) => {
    return _.range(start, end, step).map(num => {
        const value = _.padStart(num, padding, '0');
        return { key: value, text: value, value };
    });
};
const hoursOptions = generateOptions(0, 24, 1, 2);
const minutesOptions = generateOptions(0, 60, 1, 2);

/**
 * InputTime is a component showing time picker in form of hours/minutes input field
 *
 * Accessible as `Form.Time`.
 */
export default function TimeInput({ name, value, onChange }) {
    const [hours, minutes] = _.split(value, ':');

    const handleMinutesChange = (event, { value: minutesValue }) => {
        onChange(event, {
            name,
            value: `${hours}:${minutesValue}`
        });
    };

    const handleHoursChange = (event, { value: hoursValue }) => {
        onChange(event, {
            name,
            value: `${hoursValue}:${minutes}`
        });
    };

    return (
        <Table compact basic="very">
            <Table.Body>
                <Table.Row>
                    <Table.Cell textAlign="left">
                        <Dropdown
                            selection
                            options={hoursOptions}
                            name="hours"
                            fluid
                            value={hours}
                            onChange={handleHoursChange}
                        />
                    </Table.Cell>
                    <Table.Cell textAlign="center">:</Table.Cell>
                    <Table.Cell textAlign="right">
                        <Dropdown
                            selection
                            options={minutesOptions}
                            name="minutes"
                            fluid
                            value={minutes}
                            onChange={handleMinutesChange}
                        />
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
}

TimeInput.propTypes = {
    /**
     * name of the field
     */
    name: PropTypes.string.isRequired,

    /**
     * variable for input value control (acceptable format: 'HH:mm')
     */
    value: PropTypes.string.isRequired,

    /**
     * function called on hours/minutes input change
     */
    onChange: PropTypes.func.isRequired
};
