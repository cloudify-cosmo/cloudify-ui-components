import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Form as FormSemanticUiReact, Radio } from 'semantic-ui-react';

import ErrorMessage from 'components/elements/ErrorMessage';
import FormDropdown from 'components/elements/Dropdown';
import Checkbox from '../Checkbox';
import ColorPicker from '../ColorPicker';
import DateInput from '../DateInput';
import DatePicker from '../DatePicker';
import DateRangeInput from '../DateRangeInput';
import FormDivider from './FormDivider';
import FormField from './FormField';
import FileInput from '../FileInput';
import JsonInput from '../JsonInput';
import TimeInput from '../TimeInput';
import UrlOrFileInput from '../UrlOrFileInput';

import './Form.css';

/**
 * `Form` is a component to present HTML forms
 *
 * `Form` is customized version of [Semantic UI-React's Form component](https://react.semantic-ui.com/collections/form),
 * so all props of that component can be used here.
 *
 * ## General structure
 *
 * Form component should be used to group form input fields. Each input field to have similar look should be wrapped with
 * `Form.Field` component.
 *
 * ```
 * <Form>
 *   <Form.Field label="Username" required>
 *     <Form.Input placeholder="Provide username" />
 *   </Form.Field>
 *   <Form.Field label="First name">
 *     {...}
 *   </Form.Field>
 *   {...}
 * </Form>
 * ```
 *
 * ## Sub-components
 *
 * - `Form.Button` = Form button, see [Button](https://react.semantic-ui.com/elements/button)
 * - `Form.Checkbox` = Form checkbox input, see `Checkbox`
 * - `Form.ColorPicker` = Color picker input, see `ColorPicker`
 * - `Form.DatePicker` = Calendar picker, see `DatePicker`
 * - `Form.Date` = Calendar picker with input, see `DateInput`
 * - `Form.DateRange` = Date range input, see `DateRangeInput`
 * - `Form.Divider` = Form divider, see `FormDivider`
 * - `Form.Dropdown` = Dropdown field, see `Dropdown`
 * - `Form.Field` = Form field, see `FormField`
 * - `Form.File` = Form file input, see `FileInput`
 * - `Form.Group` = Form group, see `FormGroup`
 * - `Form.Input` = Form input, see [Form.Input](https://react.semantic-ui.com/collections/form/)
 * - `Form.Json` = Form JSON input, see `JsonInput`
 * - `Form.Radio` = Form radio button, see [Radio](https://react.semantic-ui.com/addons/radio)
 * - `Form.TextArea` = Form text area input, see [TextArea](https://react.semantic-ui.com/addons/text-area)
 * - `Form.Time` = Time picker input, see `TimeInput`
 * - `Form.UrlOrFile` = Form URL or file input, see `UrlOrFileInput`
 *
 * ## Errors
 *
 * `errors` prop can be just a string containing error message or an object with the following syntax:
 *
 * ```
 * {
 *      field1: 'errorMessage1',
 *      field2: 'errorMessage2',
 *      ...
 * }
 * ```
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

    let formattedErrors = errors;
    if (_.isString(errors)) {
        formattedErrors = [errors];
    } else if (_.isObject(errors)) {
        formattedErrors = _.valuesIn(errors);
    }

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <FormSemanticUiReact {...formProps} onSubmit={onSubmit} error={!_.isEmpty(errors)}>
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

Form.Button = FormSemanticUiReact.Button;
Form.Checkbox = Checkbox;
Form.ColorPicker = ColorPicker;
Form.DatePicker = DatePicker;
Form.Date = DateInput;
Form.DateRange = DateRangeInput;
Form.Divider = FormDivider;
Form.Dropdown = FormDropdown;
Form.Field = FormField;
Form.File = FileInput;
Form.Group = FormSemanticUiReact.Group;
Form.Input = FormSemanticUiReact.Input;
Form.Json = JsonInput;
Form.Radio = Radio;
Form.TextArea = FormSemanticUiReact.TextArea;
Form.UrlOrFile = UrlOrFileInput;
Form.Time = TimeInput;

Form.propTypes = {
    /**
     * primary content
     */
    children: PropTypes.node.isRequired,

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
