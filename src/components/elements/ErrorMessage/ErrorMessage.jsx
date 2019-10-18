import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Message } from 'semantic-ui-react';

/**
 * ErrorMessage is a component which uses [Message](https://react.semantic-ui.com/elements/message) component from Semantic-UI-React
 * to display error message.
 */
export default function ErrorMessage(props) {
    const { autoHide, className, error, header, onDismiss } = props;
    const messageVisibilityTimeoutMs = 10000;
    let messageVisibilityTimeout = null;

    const [hidden, setHidden] = useState(false);

    const handleDismiss = () => {
        setHidden(true);
        onDismiss();
    };

    const setVisibilityTimeout = timeout => {
        if (autoHide) {
            clearTimeout(messageVisibilityTimeout);
            messageVisibilityTimeout = setTimeout(() => {
                handleDismiss();
            }, timeout);
        }
    };

    useEffect(() => {
        if (error) {
            setHidden(false);
            setVisibilityTimeout(messageVisibilityTimeoutMs);
        }

        // returned function will be called on component unmount
        return () => {
            clearTimeout(messageVisibilityTimeout);
        };
    }, [error]);

    let errorMessage = error;
    let errorHeader = header;
    if (_.isObject(error)) {
        errorMessage = error.message;
        if (_.isEqual(header, ErrorMessage.defaultProps.header) && error.header) {
            errorHeader = error.header;
        }
    }

    return (
        error && (
            <Message error className={className} hidden={hidden} onDismiss={handleDismiss}>
                <Message.Header>{errorHeader}</Message.Header>
                {_.isArray(error) && !_.isEmpty(error) ? (
                    <Message.List items={error} />
                ) : (
                    <Message.Content>{errorMessage}</Message.Content>
                )}
            </Message>
        )
    );
}

ErrorMessage.propTypes = {
    /**
     * if set, then message will be hidden after visibility timeout
     */
    autoHide: PropTypes.bool,

    /**
     * additional CSS classes to Message component
     */
    className: PropTypes.string,

    /**
     * string, array or object containing error text message/messages
     */
    error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.shape({ header: PropTypes.string, message: PropTypes.string })
    ]),

    /**
     * header of error text message
     */
    header: PropTypes.string,
    /**
     * function called when either error message visibility timeout (default: 10s) expires or user dismiss manually error message
     */
    onDismiss: PropTypes.func
};

ErrorMessage.defaultProps = {
    autoHide: false,
    className: '',
    error: null,
    header: 'Error Occured',
    onDismiss: () => {}
};
