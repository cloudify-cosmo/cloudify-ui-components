import React from 'react';
import PropTypes from 'prop-types';

export default function DivContainer({ children, height }) {
    return <div style={{ position: 'relative', height }}>{children}</div>;
}
DivContainer.propTypes = {
    children: PropTypes.node.isRequired,
    height: PropTypes.number
};
DivContainer.defaultProps = {
    height: 150
};
