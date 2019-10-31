import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Form as FormSemanticUiReact, Radio, Button } from 'semantic-ui-react';

import ErrorMessage from '../../elements/ErrorMessage';
import Checkbox from '../Checkbox';
import ColorPicker from '../ColorPicker';
import DateInput from '../DateInput';
import DatePicker from '../DatePicker';
import DateRangeInput from '../DateRangeInput';
import FormDivider from './FormDivider';
import FormDropdown from '../../elements/Dropdown';
import FormField from './FormField';
import FileInput from '../FileInput';
import JsonInput from '../JsonInput';
import TimeInput from '../TimeInput';
import UrlOrFileInput from '../UrlOrFileInput';

import './Form.css';

// import FormTable from './EdiTable';

/**
 * `Form` is a component to present HTML forms
 *
 * `Form` is customized version of [Semantic UI-React's Form component](https://react.semantic-ui.com/collections/form),
 * so all properties of that component can be used here.
 *
 * errors prop can be just a string containing error message or an object with the following syntax:
 *
 * ```
 * {
 *      field1: 'errorMessage1',
 *      field2: 'errorMessage2',
 *      ...
 * }
 * ```
 *
 * TODO: Write about Form.Field
 *
 * TODO: Write about errors
 *
 * TODO: Write about sub-components
 *
 */
export default function Form({
    children,
    errors,
    errorMessageHeader,
    onErrorsDismiss,
    onSubmit,
    scrollToError,
    ...formProps
}) {
    useEffect(() => {
        if (scrollToError && !_.isEmpty(errors)) {
            // eslint-disable-next-line react/no-find-dom-node
            const formElement = ReactDOM.findDOMNode(this);
            if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [errors]);

    const handleSubmit = (e, data) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(data.formData);
        }
        return false;
    };

    let formattedErrors = errors;
    if (_.isString(errors)) {
        formattedErrors = [errors];
    } else if (_.isObject(errors)) {
        formattedErrors = _.valuesIn(errors);
    }

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <FormSemanticUiReact {...formProps} onSubmit={handleSubmit} error={!_.isEmpty(errors)}>
            <ErrorMessage header={errorMessageHeader} error={formattedErrors} onDismiss={onErrorsDismiss} />
            {children}
        </FormSemanticUiReact>
    );
}

Form.fieldNameValue = field => {
    const { name } = field;
    let { value } = field;

    if (field.type === 'checkbox') {
        value = field.checked;
    }

    if (field.type === 'number') {
        const isFloat = n => Number(n) % 1 !== 0;
        value = isFloat(field.value) ? parseFloat(field.value) : parseInt(field.value, 10);
    }

    if (_.isEmpty(name)) {
        throw new Error('Required name attribute is not provided!');
    }

    return { [name]: value };
};

/**
 * Form checkbox input, {@link Checkbox}
 */
Form.Checkbox = Checkbox;

/**
 * Form color picker input, see {@link ColorPicker}
 */
Form.ColorPicker = ColorPicker;

/**
 * Calendar picker, see {@link DatePicker}
 */
Form.DatePicker = DatePicker;

/**
 * Calendar picker with input, see {@link DateInput}
 */
Form.Date = DateInput;

/**
 * Date range input, see {@link DateRangeInput}
 */
Form.DateRange = DateRangeInput;

/**
 * Form divider, see {@link FormDivider}
 */
Form.Divider = FormDivider;

/**
 * Dropdown field, see {@link Dropdown}
 */
Form.Dropdown = FormDropdown;

/**
 * Form field, see {@link FormField}
 */
Form.Field = FormField;

/**
 * Form file input, see {@link FileInput}
 */
Form.File = FileInput;

/**
 * Form group, see {@link FormGroup}
 */
Form.Group = FormSemanticUiReact.Group;

/**
 * Form input, see [Form.Input](https://react.semantic-ui.com/collections/form/)
 */
Form.Input = FormSemanticUiReact.Input;

/**
 * Form JSON input, see {@link JsonInput}
 */
Form.Json = JsonInput;

/**
 * Form radio button, see [Input](https://react.semantic-ui.com/addons/radio)
 */
Form.Radio = Radio;

/**
 * Form text area input, see [TextArea](https://react.semantic-ui.com/addons/text-area)
 */
Form.TextArea = FormSemanticUiReact.TextArea;

/**
 * Form URL or file input, see {@link UrlOrFileInput}
 */
Form.UrlOrFile = UrlOrFileInput;

/**
 * Time picker input, see {@link TimeInput}
 */
Form.Time = TimeInput;

/**
 * Form checkbox input, see [Button](https://react.semantic-ui.com/elements/button)
 */
Form.Button = Button;

// /**
//  * Form table input, see {@link EdiTable}
//  */
// Form.Table = FormTable;
//

Form.propTypes = {
    ...FormSemanticUiReact.propTypes,

    /**
     * string with error message or object with fields error messages (syntax described above)
     */
    errors: ErrorMessage.propTypes.error,

    /**
     * string with error message header
     */
    errorMessageHeader: PropTypes.string,

    /**
     * function called on form submission
     */
    onSubmit: PropTypes.func,

    /**
     * function called when errors are dismissed (see ErrorMessage)
     */
    onErrorsDismiss: PropTypes.func,

    /**
     * if set, then on error change screen will be scrolled to (seeErrorMessage)
     */
    scrollToError: PropTypes.bool
};

Form.defaultProps = {
    errors: null,
    errorMessageHeader: 'Errors in the form',
    onSubmit: () => {},
    onErrorsDismiss: () => {},
    scrollToError: false
};
