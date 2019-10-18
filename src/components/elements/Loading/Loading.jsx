import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

/**
 * Loading is a component which uses [Loader](https://react.semantic-ui.com/elements/loader) component from Semantic-UI-React
 * to display loader in center of parent component.
 */
function Loading(props) {
    const { message } = props;

    return (
        <Segment basic className="loadingSegment">
            <Dimmer active inverted>
                <Loader>{message}</Loader>
            </Dimmer>
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
