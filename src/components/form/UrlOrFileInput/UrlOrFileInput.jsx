import React from 'react';
import PropTypes from 'prop-types';

import { Input } from 'semantic-ui-react';
import FileInput from '../FileInput';

/**
 * UrlOrFileInput is a component showing URL and file input field
 *
 * Accessible as `UrlOrFileInput` or `Form.UrlOrFile`.
 */
export default function UrlOrFileInput({
    name,
    value,
    placeholder,
    label,
    onChangeUrl,
    onFocusUrl,
    onBlurUrl,
    onChangeFile,
    onResetFile,
    fileInputRef
}) {
    return (
        <Input
            value={value}
            name={`${name}Url`}
            placeholder={placeholder}
            onChange={onChangeUrl}
            onFocus={onFocusUrl}
            onBlur={onBlurUrl}
            action
            labelPosition="left"
        >
            {label}
            <input />
            <FileInput
                name={`${name}File`}
                ref={fileInputRef}
                onChange={onChangeFile}
                onReset={onResetFile}
                showInput={false}
            />
        </Input>
    );
}

UrlOrFileInput.propTypes = {
    /*
     * basename of the field => URL field will be named `<name>Url` and file field will be named `<name>File`
     */
    name: PropTypes.string.isRequired,

    /*
     * text input field value
     */
    value: PropTypes.string.isRequired,

    /**
     * input field placeholder
     */
    placeholder: PropTypes.string.isRequired,

    /**
     * label to be added to URL input field on the left side
     */
    label: PropTypes.node,

    /**
     * function to be called on URL change
     */
    onChangeUrl: PropTypes.func.isRequired,

    /**
     * function to be called on URL input focus
     */
    onFocusUrl: PropTypes.func.isRequired,

    /**
     * function to be called on URL input blur
     */
    onBlurUrl: PropTypes.func.isRequired,

    /**
     * function to be called on file change
     */
    onChangeFile: PropTypes.func.isRequired,

    /**
     * function to be called on file reset
     */
    onResetFile: PropTypes.func.isRequired,

    /**
     * ref attached to file input
     */
    fileInputRef: PropTypes.shape({ current: PropTypes.object })
};

UrlOrFileInput.defaultProps = {
    label: null,
    fileInputRef: null
};
