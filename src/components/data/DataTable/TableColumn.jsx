import React from 'react';
import PropTypes from 'prop-types';

import DataTableContext from './DataTableContext';

/**
 * Defines table columns, renders <th> elements.
 *
 * ```
 * <DataTable.Column label="Name" name="id" width="40%"/>
 * ```
 */
export default function TableColumn({ label, name, width, show, centerAligned }) {
    const getClassName = (sortColumn, sortAscending) => {
        let cssClass = name ? '' : 'disabled';

        if (sortColumn === name) {
            cssClass += ' sorted';
            cssClass += sortAscending ? ' ascending' : ' descending ';
        }

        if (centerAligned) {
            cssClass += ' center aligned';
        }

        return cssClass;
    };

    return (
        show && (
            <DataTableContext.Consumer>
                {({ sortColumn, sortAscending, setSortColumn }) => (
                    <th
                        className={getClassName(sortColumn, sortAscending)}
                        style={width ? { width } : {}}
                        onClick={() => name && setSortColumn(name)}
                    >
                        {label}
                    </th>
                )}
            </DataTableContext.Consumer>
        )
    );
}

TableColumn.propTypes = {
    /**
     * column label
     */
    label: PropTypes.node,

    /**
     * data property, enables column sorting
     */
    name: PropTypes.string,

    /**
     * width style
     */
    width: PropTypes.string,

    /**
     * if false then column is hidden
     */
    show: PropTypes.bool,

    /**
     * if true then column label is center aligned
     */
    centerAligned: PropTypes.bool
};

TableColumn.defaultProps = {
    label: '',
    name: undefined,
    width: '',
    show: true,
    centerAligned: false
};
