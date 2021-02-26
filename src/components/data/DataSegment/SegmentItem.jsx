import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Segment } from 'semantic-ui-react';

/**
 * SegmentItem is a component showing content item for `DataSegment` component
 */
export default function SegmentItem({ children, selected, onClick, className }) {
    return (
        <Segment
            secondary={selected}
            className={className}
            style={_.isFunction(onClick) ? { cursor: 'pointer' } : {}}
            onClick={onClick}
        >
            {children}
        </Segment>
    );
}

SegmentItem.propTypes = {
    /*
     * primary content
     */
    children: PropTypes.node.isRequired,

    /*
     * specifies if data segment item shall be selected
     */
    selected: PropTypes.bool,

    /*
     * specifies function to be called on action click
     */
    onClick: PropTypes.func,

    /*
     * CSS classname
     */
    className: PropTypes.string
};

SegmentItem.defaultProps = {
    selected: false,
    onClick: undefined,
    className: ''
};
