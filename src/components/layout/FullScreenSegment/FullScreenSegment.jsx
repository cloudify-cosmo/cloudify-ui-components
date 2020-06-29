import PropTypes from 'prop-types';
import React from 'react';
import { Segment } from 'semantic-ui-react';
import colors from 'cloudify-ui-common/styles/_colors.scss';

export default function FullScreenSegment({ children, backgroundColor, className, style }) {
    return (
        <Segment
            className={className}
            style={{
                margin: 0,
                padding: 0,
                overflow: 'auto',
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                border: 'none',
                borderRadius: 0,
                backgroundColor,
                ...style
            }}
        >
            {children}
        </Segment>
    );
}

FullScreenSegment.propTypes = {
    children: PropTypes.node.isRequired,
    backgroundColor: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.shape({})
};

FullScreenSegment.defaultProps = {
    backgroundColor: colors.blueNormal,
    className: '',
    style: {}
};
