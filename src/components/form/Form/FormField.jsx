import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Form } from 'semantic-ui-react';
import PopupHelp from '../../popups/PopupHelp';
import FieldLabel from '../FieldLabel/FieldLabel';

/**
 * `Form.Field` is a component to present field and is used in Form component.
 *
 * `Form.Field` is a wrapper for [Semantic UI-React's Form.Field component](https://react.semantic-ui.com/collections/form),
 * so all properties of that component can be used here.
 */
export function FormFieldWithoutMemo({ children, error, help, label, required, ...fieldProps }) {
    const FieldWrapper = () => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Form.Field {...fieldProps} required={required} error={!!error}>
            <FieldLabel help={help} label={label} />
            {children}
        </Form.Field>
    );

    return _.isEmpty(label) && !_.isEmpty(help) ? (
        <PopupHelp trigger={<FieldWrapper />} content={help} />
    ) : (
        <FieldWrapper />
    );
}

FormFieldWithoutMemo.propTypes = {
    /**
     * form field to wrap
     */
    children: PropTypes.node.isRequired,

    /**
     * error indicator: true - field has error, false - field has no errors (value casted to boolean by !!error)
     */
    // eslint-disable-next-line react/forbid-prop-types
    error: PropTypes.any,

    /**
     * if not empty, then help description is shown in popup on field's hover and focus
     */
    help: PropTypes.node,

    /**
     * if not empty, then it's content is shown on top of field
     */
    label: PropTypes.string,

    /**
     * if true and label is set, then red asterisk icon is presented near label
     */
    required: PropTypes.bool
};

FormFieldWithoutMemo.defaultProps = {
    error: false,
    help: '',
    label: '',
    required: false
};

// eslint-disable-next-line react/jsx-props-no-spreading,react/display-name
const FormField = memo(props => <FormFieldWithoutMemo {...props} />);
export default FormField;
