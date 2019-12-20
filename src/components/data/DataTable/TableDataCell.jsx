import React from 'react';
import PropTypes from 'prop-types';

export default function TableDataCell({ children, className, rowSpan, style }) {
    return (
        <td className={className} rowSpan={rowSpan} style={style}>
            {children}
        </td>
    );
}

TableDataCell.propTypes = {
    /**
     * cell content
     */
    children: PropTypes.node,

    /**
     * additional CSS classes for td element
     */
    className: PropTypes.string,

    /**
     * rowSpan prop passed to td element
     */
    rowSpan: PropTypes.number,

    /**
     * style prop passed to td element
     */
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object
};

TableDataCell.defaultProps = {
    children: '',
    className: '',
    rowSpan: 1,
    style: {}
};
