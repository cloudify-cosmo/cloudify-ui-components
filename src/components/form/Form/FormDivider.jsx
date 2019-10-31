import React from 'react';
import PropTypes from 'prop-types';

import { Header } from 'semantic-ui-react';

/**
 * `Form.Divider` is a component to divide form fields in Form component, to create sections.
 *
 * It creates a header (see [Header](https://react.semantic-ui.com/elements/header)) component with horizontal line below.
 * You can pass any prop allowed by Header component.
 *
 * Accessible as `Form.Divider`.
 */
export default function FormDivider({ children, className, ...headerProps }) {
    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Header as="h4" dividing className={className} {...headerProps}>
            {children}
        </Header>
    );
}

FormDivider.propTypes = {
    /**
     * primary content, children of Header component
     */
    children: PropTypes.node.isRequired,
    /**
     * stylesheet classes to add to Header component
     */
    className: PropTypes.string
};

FormDivider.defaultProps = {
    className: ''
};
