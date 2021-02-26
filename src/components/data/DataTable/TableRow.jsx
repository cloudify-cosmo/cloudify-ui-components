import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import TableDataCell from './TableDataCell';

/**
 * Defines table rows, renders <tr> elements.
 *
 * ```
 * <DataTable.Row key="joomla" selected={false} onClick={()=>this.onRowClick(item)}>
 *      <DataTable.Data><a href="javascript:void(0)">Joomla website</a></DataTable.Data>
 *      <DataTable.Data>2015-08-14</DataTable.Data>
 *      <DataTable.Data>description for website</DataTable.Data>
 * </DataTable.Row>
 * ```
 */

export default function TableRow({ id, children, selected, onClick, onMouseOver, onMouseOut, showCols, className }) {
    const showData = index => (index < showCols.length ? showCols[index] : true);
    const computedClassName = className + (selected ? ' active' : '');
    const computedChildren = [];

    React.Children.forEach(children, (child, index) => {
        if (child && child.type === TableDataCell && showData(index)) {
            computedChildren.push(child);
        }
    });

    return (
        <tr
            id={id}
            className={computedClassName}
            onClick={onClick}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onFocus={onMouseOver}
            onBlur={onMouseOut}
            style={_.isFunction(onClick) ? { cursor: 'pointer' } : {}}
        >
            {computedChildren}
        </tr>
    );
}

TableRow.propTypes = {
    /**
     * row content
     */
    children: PropTypes.node.isRequired,

    /**
     * row id
     */
    id: PropTypes.string,

    /**
     * if true, then row will be marked as selected
     */
    selected: PropTypes.bool,

    /**
     * action to be executed on click event
     */
    onClick: PropTypes.func,

    /**
     * action to be executed on mouse over event
     */
    onMouseOver: PropTypes.func,

    /**
     * action to be executed on mouse out event
     */
    onMouseOut: PropTypes.func,

    /**
     * array of column's names to be shown
     */
    showCols: PropTypes.arrayOf(PropTypes.bool),

    /**
     * name of the style class to be added
     */
    className: PropTypes.string
};

TableRow.defaultProps = {
    id: undefined,
    selected: false,
    onClick: undefined,
    onMouseOver: undefined,
    onMouseOut: undefined,
    showCols: [],
    className: ''
};
