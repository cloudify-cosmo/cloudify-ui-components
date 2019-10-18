import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

/**
 * CancelButton is a component to present cancellation button in Modal component.
 *
 * CancelButton is customized version of [Semantic UI-React's Button component](https://react.semantic-ui.com/elements/button),
 * so all properties of that component (eg. onClick, disabled, ...) can be used here.
 */
export default function CancelButton(props) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Button {...props} />;
}

CancelButton.propTypes = {
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

CancelButton.defaultProps = {
    content: 'Cancel',
    icon: 'remove',
    className: 'basic cancel'
};
