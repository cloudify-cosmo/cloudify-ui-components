import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'semantic-ui-react';

/**
 * ApproveButton is a component to present confirmation button in Modal component.
 *
 * ApproveButton is customized version of [Semantic UI-React's Button component](https://react.semantic-ui.com/elements/button),
 * so all properties of that component (eg. onClick, disabled, ...) can be used here.
 */
export default function ApproveButton(props) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Button {...props} />;
}

ApproveButton.propTypes = {
    /**
     * button content
     */
    content: PropTypes.string,
    /**
     * button icon
     */
    icon: PropTypes.string,
    /**
     * button classname
     */
    className: PropTypes.string
};

ApproveButton.defaultProps = {
    content: 'Save',
    icon: 'checkmark',
    className: 'ok'
};
