import React from 'react';
import PropTypes from 'prop-types';

export default function DivContainer({ children, backgroundColor, height }) {
    return <div style={{ position: 'relative', height, backgroundColor }}>{children}</div>;
}
DivContainer.propTypes = {
    children: PropTypes.node.isRequired,
    backgroundColor: PropTypes.string,
    height: PropTypes.number
};
DivContainer.defaultProps = {
    backgroundColor: 'white',
    height: 150
};
