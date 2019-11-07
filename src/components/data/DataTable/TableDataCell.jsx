import React from 'react';
import PropTypes from 'prop-types';

export default function TableDataCell({ children, className }) {
    return <td className={className}>{children}</td>;
}

TableDataCell.propTypes = {
    /**
     * cell content
     */
    children: PropTypes.node,

    /**
     * additional CSS classes
     */
    className: PropTypes.string
};

TableDataCell.defaultProps = {
    children: '',
    className: ''
};
