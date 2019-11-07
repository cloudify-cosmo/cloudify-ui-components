import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

/**
 * EditableLabel component shows an editable label.
 * Label can have an optional placeholder and/or default text.
 */
export default function EditableLabel(props) {
    const { text, placeholder, className, isEditEnable, onEditDone } = props;
    const [editing, setEditing] = useState(false);
    const [editableText, setEditableText] = useState(text);

    const labelClicked = () => {
        if (isEditEnable) {
            setEditing(true);
        }
    };

    const textChanged = event => setEditableText(event.target.value);

    const inputLostFocus = () => {
        if (isEditEnable) {
            onEditDone(editableText);
            setEditing(false);
        }
    };

    const keyPressed = event => {
        if (event.key === 'Enter') {
            inputLostFocus();
        }
    };

    const calculatedClassName = `${className} ${_.isEmpty(text) ? 'editPlaceholder' : ''}`;
    const readOnlyText = isEditEnable ? text || placeholder : text;
    return editing ? (
        <input
            type="text"
            value={editableText}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            onClick={event => {
                event.stopPropagation();
                labelClicked();
            }}
            onChange={textChanged}
            onBlur={inputLostFocus}
            onKeyPress={keyPressed}
            className={calculatedClassName}
        />
    ) : (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label
            onClick={event => {
                event.stopPropagation();
                labelClicked();
            }}
            className={calculatedClassName}
        >
            {readOnlyText}
        </label>
    );
}

EditableLabel.propTypes = {
    /**
     * Label's default value
     */
    text: PropTypes.string,

    /**
     * Label's value if text value is not set
     */
    placeholder: PropTypes.string,

    /**
     * Name of the style class to be added
     */
    className: PropTypes.string,

    /**
     * If 'true' make the label editable
     */
    isEditEnable: PropTypes.bool,

    /**
     * Function to call when value has changed (returns label's text as attribute)
     */
    onEditDone: PropTypes.func
};

EditableLabel.defaultProps = {
    text: '',
    placeholder: 'Click to edit',
    className: '',
    isEditEnable: true,
    onEditDone: () => {}
};
