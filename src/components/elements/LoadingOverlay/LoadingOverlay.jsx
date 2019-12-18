import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader } from 'semantic-ui-react';

/**
 * LoadingOverlay is an overlay component which uses [Loader](https://react.semantic-ui.com/elements/loader) component from Semantic-UI-React
 * to display loader in center of parent component, covering any sibling components with a dimmer.
 */
export default function LoadingOverlay({ message }) {
    return (
        <Dimmer active inverted>
            <Loader>{message}</Loader>
        </Dimmer>
    );
}

LoadingOverlay.propTypes = {
    /**
     * text message to display under loading icon
     */
    message: PropTypes.string
};

LoadingOverlay.defaultProps = {
    message: null
};
