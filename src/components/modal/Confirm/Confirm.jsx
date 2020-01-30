import React from 'react';
import PropTypes from 'prop-types';

import { Confirm as ConfirmSemanticUiReact } from 'semantic-ui-react';

/**
 * Confirm is a wrapper component to present simple Yes/No confirmation modal window.
 *
 * It wraps [Semantic UI-React's Confirm component](https://react.semantic-ui.com/addons/confirm),
 * so all properties of that component (eg. content, header, ...) can be used here.
 */
export default function Confirm(props) {
    const { content, open, confirmButton, cancelButton, className, ...rest } = props;

    return (
        <ConfirmSemanticUiReact
            content={content}
            open={open}
            confirmButton={confirmButton}
            cancelButton={cancelButton}
            className={className}
            style={{
                fontSize: '1.3em',
                lineHeight: '1.28571429em',
                fontWeight: 700
            }}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...rest}
        />
    );
}

Confirm.propTypes = {
    /**
     * confirm modal message
     */
    content: PropTypes.node.isRequired,
    /**
     * display confirm modal window
     */
    open: PropTypes.bool.isRequired,
    /**
     * confirm button content
     */
    confirmButton: PropTypes.string,
    /**
     * cancel button content
     */
    cancelButton: PropTypes.string,
    /**
     * confirm modal classname
     */
    className: PropTypes.string
};
Confirm.defaultProps = {
    className: '',
    confirmButton: 'Yes',
    cancelButton: 'No'
};
