import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import LoadingOverlay from '../LoadingOverlay';

/**
 * Loading is a block component which uses LoadingOverlay component
 * to display loader in center of parent component.
 */
function Loading({ message }) {
    return (
        <Segment basic style={{ height: '100%', zIndex: 5 }}>
            <LoadingOverlay message={message} />
        </Segment>
    );
}

Loading.propTypes = {
    /**
     * text message to display under loading icon
     */
    message: PropTypes.string
};

Loading.defaultProps = {
    message: 'Loading'
};

export default Loading;
