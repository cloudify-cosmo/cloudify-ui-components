import { Input, Label } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

/**
 * EditableLabel component shows an editable label.
 * Label can have an optional placeholder and/or initial value.
 */
export default function EditableLabel({
    invalidValues,
    value,
    placeholder,
    enabled,
    onChange,
    onError,
    labelSize,
    inputSize,
    className
}) {
    const [editing, setEditing] = useState();
    const [currentValue, setCurrentValue] = useState();
    const [isError, setError] = useState();

    function submitChange() {
        if (currentValue === value) {
            setEditing(false);
            return;
        }

        if (invalidValues.indexOf(currentValue) >= 0 && currentValue !== value) {
            setError(true);
            onError();
            return;
        }

        setEditing(false);
        onChange(currentValue);
    }

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    const calculatedClassName = `${className} ${_.isEmpty(value) ? 'editPlaceholder' : ''}`;

    return editing ? (
        <Input
            value={currentValue}
            error={isError}
            onChange={(e, data) => {
                setCurrentValue(data.value);
                setError(false);
            }}
            onKeyDown={e => {
                if (e.key === 'Escape') {
                    e.stopPropagation();
                    setError(false);
                    setEditing(false);
                    setCurrentValue(value);
                }
                if (e.key === 'Enter' && currentValue) {
                    submitChange();
                }
            }}
            onBlur={submitChange}
            size={inputSize}
            style={{ verticalAlign: 'top' }}
            input={
                <input
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus
                />
            }
            className={calculatedClassName}
        />
    ) : (
        <Label
            size={labelSize}
            style={{ background: 'none', cursor: enabled ? 'pointer' : 'inherit' }}
            onClick={() => {
                if (enabled) setEditing(true);
            }}
            className={calculatedClassName}
        >
            {enabled ? currentValue || placeholder : currentValue}
        </Label>
    );
}

EditableLabel.propTypes = {
    /**
     * Label's initial value
     */
    value: PropTypes.string,

    /**
     * Label's displayed text when value is not set or empty
     */
    placeholder: PropTypes.string,

    /**
     * If 'true' make the label editable
     */
    enabled: PropTypes.bool,

    /**
     * Function to call when value has changed (receives input's value as argument)
     */
    onChange: PropTypes.func,

    /**
     * Function to call when invalid value is entered (i.e. one of values specified by invalidValues prop)
     */
    onError: PropTypes.func,

    /**
     * List of values that are invalid for input.
     * `onError` callback is called when of of these values is entered.
     */
    invalidValues: PropTypes.arrayOf(PropTypes.string),

    /**
     * Label size
     */
    labelSize: PropTypes.string,

    /**
     * Input size
     */
    inputSize: PropTypes.string,

    /**
     * Name of the style class to be added
     */
    className: PropTypes.string
};

EditableLabel.defaultProps = {
    value: '',
    className: null,
    enabled: true,
    onChange: _.noop,
    onError: _.noop,
    invalidValues: [],
    labelSize: null,
    inputSize: null,
    placeholder: ''
};
