import React, { CSSProperties, FunctionComponent } from 'react';
import PropTypes from 'prop-types';

export interface TableDataCellProps {
    /**
     * additional CSS classes for td element
     */
    className?: string;

    /**
     * rowSpan prop passed to td element
     */
    rowSpan?: number;

    /**
     * colSpan prop passed to td element
     */
    colSpan?: number;

    /**
     * style prop passed to td element
     */
    style?: CSSProperties;
}

const TableDataCell: FunctionComponent<TableDataCellProps> = ({ children, className, rowSpan, colSpan, style }) => {
    return (
        <td className={className} rowSpan={rowSpan} colSpan={colSpan} style={style}>
            {children}
        </td>
    );
};
export default TableDataCell;

TableDataCell.propTypes = {
    // @ts-expect-error Children props is provided by default
    children: PropTypes.node,
    className: PropTypes.string,
    rowSpan: PropTypes.number,
    colSpan: PropTypes.number,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object
};
