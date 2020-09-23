import React, { createRef, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Button, Input } from 'semantic-ui-react';
import Popup from 'components/popups/Popup';

/**
 * FileInput is a component showing file input field. Can be displayed as normal input field containing name of the chosen file
 * or as a simple button triggering opening file browser. You can add reset button to unset chosen file.
 *
 * Accessible as `FileInput` or `Form.File`.
 */
export default function FileInput({
    value,
    name,
    placeholder,
    onChange,
    onReset,
    loading,
    disabled,
    showInput,
    showReset,
    openButtonParams,
    help,
    multiple
}) {
    const inputRef = createRef();
    const [internalValue, setInternalValue] = useState('');

    const openFileSelection = e => {
        e.preventDefault();
        inputRef.current.click();
        return false;
    };

    const resetInput = () => {
        setInternalValue('');
        onChange(null, '');
    };

    const resetFileSelection = e => {
        e.preventDefault();
        resetInput();
        onReset();
        return false;
    };

    const fileChanged = () => {
        const filename = _.get(inputRef, 'current.files[0].name', '');
        if (!filename) {
            resetInput();
            return;
        }

        setInternalValue(filename);
        const { files } = inputRef.current;
        if (multiple) onChange(files);
        else onChange(files[0], filename);
    };

    const folderButton = (
        <Button
            icon="folder open"
            onClick={openFileSelection}
            loading={loading}
            disabled={disabled}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...openButtonParams}
        />
    );

    const openFolderButton = !_.isEmpty(help) ? <Popup trigger={folderButton} content={help} /> : folderButton;

    function getValue() {
        if (value === null) {
            return internalValue;
        }

        return value;
    }

    const resetFileButton = showReset ? (
        <Button icon="remove" onClick={resetFileSelection} disabled={!getValue() || disabled} />
    ) : null;

    return (
        <>
            {showInput ? (
                <Input
                    readOnly
                    value={getValue()}
                    name={`fileName${name}`}
                    placeholder={placeholder}
                    onClick={openFileSelection}
                    disabled={disabled}
                    action
                >
                    <input />
                    {openFolderButton}
                    {resetFileButton}
                </Input>
            ) : (
                <>
                    {openFolderButton}
                    {resetFileButton}
                </>
            )}
            <input
                type="file"
                multiple={multiple}
                name={name}
                style={{ display: 'none' }}
                onChange={fileChanged}
                ref={inputRef}
            />
        </>
    );
}

FileInput.propTypes = {
    /**
     * string value to be displayed, creates controlled component if specified
     */
    value: PropTypes.string,

    /**
     * name of the field appended to 'fileName' string
     */
    name: PropTypes.string,

    /**
     * specifies a short hint that describes the expected input
     */
    placeholder: PropTypes.string,

    /**
     * function called on file change
     */
    onChange: PropTypes.func,

    /**
     * function called on file reset
     */
    onReset: PropTypes.func,

    /**
     * if set to true opening file selector will be disabled
     */
    loading: PropTypes.bool,

    /**
     * if set to true component will be disabled
     */
    disabled: PropTypes.bool,

    /**
     * if set to false input string field will not be presented
     */
    showInput: PropTypes.bool,

    /**
     * if set to false reset button will not be presented
     */
    showReset: PropTypes.bool,

    /**
     * additional parameters for open file button, props for Button component
     */
    openButtonParams: PropTypes.shape(Button.propTypes),

    /**
     * additional help information shown in Popup
     */
    help: PropTypes.string,

    /**
     * if set to true multiple files can be selected
     */
    multiple: PropTypes.bool
};

FileInput.defaultProps = {
    value: null,
    name: '',
    placeholder: '',
    onChange: () => {},
    onReset: () => {},
    loading: false,
    disabled: false,
    showInput: true,
    showReset: true,
    openButtonParams: {},
    help: '',
    multiple: false
};
