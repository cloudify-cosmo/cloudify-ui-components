import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Input, Label } from 'semantic-ui-react';
import FileInput from '../FileInput';

import './UrlOrFileInput.css';

/**
 * UrlOrFileInput is a component showing URL and file input field
 *
 * Accessible as `UrlOrFileInput` or `Form.UrlOrFile`.
 */
export default function UrlOrFileInput({ name, placeholder, onChangeUrl, onBlurUrl, onChangeFile }) {
    const [fileValue, setFileValue] = useState();
    const [value, setValue] = useState('');

    function handleUrlChange(url) {
        setValue(url);
        onChangeUrl(url);
    }

    function handleFileChange(file) {
        setFileValue(file);
        onChangeFile(file);
    }

    function reset() {
        handleFileChange(null);
        handleUrlChange('');
    }

    return (
        <Input
            value={_.get(fileValue, 'name', value)}
            name={`${name}Url`}
            placeholder={placeholder}
            onChange={(e, data) => handleUrlChange(data.value)}
            onFocus={() => fileValue && reset()}
            onBlur={onBlurUrl}
            action
            labelPosition="left"
            className="fileOrUrl"
        >
            <Label>{fileValue ? 'File' : 'URL'}</Label>
            <input />
            <FileInput
                value={_.get(fileValue, 'name', '')}
                name={`${name}File`}
                onChange={handleFileChange}
                onReset={reset}
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

    /**
     * input field placeholder
     */
    placeholder: PropTypes.string.isRequired,

    /**
     * function to be called on URL change
     */
    onChangeUrl: PropTypes.func.isRequired,

    /**
     * function to be called on URL input blur
     */
    onBlurUrl: PropTypes.func,

    /**
     * function to be called on file change
     */
    onChangeFile: PropTypes.func.isRequired
};

UrlOrFileInput.defaultProps = {
    onBlurUrl: _.noop
};
