import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox as SemanticUiReactCheckbox } from 'semantic-ui-react';
import FieldLabel from '../FieldLabel';

/**
 * Checkbox is just a wrapper of Semantic-UI-React's Checkbox component to add help description near Checkbox label.
 * See [Checkbox](https://react.semantic-ui.com/modules/checkbox)
 *
 * Accessible as `Checkbox` or `Form.Checkbox`.
 *
 */
export default function Checkbox({ label, help, ...checkboxProps }) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <SemanticUiReactCheckbox {...checkboxProps} label={<FieldLabel label={label} help={help} />} />;
}

Checkbox.propTypes = {
    /**
     * checkbox label
     */
    label: PropTypes.string.isRequired,
    /**
     * help description
     */
    help: PropTypes.node
};

Checkbox.defaultProps = {
    help: ''
};
