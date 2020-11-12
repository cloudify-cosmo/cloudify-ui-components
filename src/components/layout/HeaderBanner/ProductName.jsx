import PropTypes from 'prop-types';
import React from 'react';

export default function ProductName({ name }) {
    return <span style={{ verticalAlign: 'middle' }}>{name}</span>;
}

ProductName.propTypes = {
    name: PropTypes.string.isRequired
};
