import React, { FunctionComponent, ReactElement, ReactNode } from 'react';
import PropTypes from 'prop-types';

import Popup from 'components/popups/Popup';

import DataTableContext from './DataTableContext';

export interface TableColumnProps {
    /**
     * column label
     */
    label?: ReactNode;

    /**
     * data property, enables column sorting
     */
    name?: string;

    /**
     * width style
     */
    width?: string;

    /**
     * if false then column is hidden
     */
    show?: boolean;

    /**
     * Tooltip to show when hovering over the header
     */
    tooltip?: ReactNode;

    /**
     * if true then column label is center aligned
     */
    centerAligned?: boolean;
}

/**
 * Defines table columns, renders <th> elements.
 *
 * ```
 * <DataTable.Column label="Name" name="id" width="40%"/>
 * ```
 */
const TableColumn: FunctionComponent<TableColumnProps> = ({
    label = '',
    name,
    width,
    show = true,
    tooltip,
    centerAligned
}) => {
    if (!show) {
        return null;
    }

    const getClassName = (sortColumn: string, sortAscending: boolean) => {
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
        <DataTableContext.Consumer>
            {({ sortColumn, sortAscending, setSortColumn }) => (
                <OptionalPopup tooltip={tooltip}>
                    <th
                        className={getClassName(sortColumn, sortAscending)}
                        style={width ? { width } : {}}
                        onClick={() => name && setSortColumn(name)}
                    >
                        {label}
                    </th>
                </OptionalPopup>
            )}
        </DataTableContext.Consumer>
    );
};
export default TableColumn;

TableColumn.propTypes = {
    label: PropTypes.node,
    name: PropTypes.string,
    width: PropTypes.string,
    show: PropTypes.bool,
    tooltip: PropTypes.node,
    centerAligned: PropTypes.bool
};

// NOTE: This component is only used internally, and its propTypes are validated by the parent component
// eslint-disable-next-line react/prop-types
const OptionalPopup: FunctionComponent<{ tooltip?: ReactNode; children: ReactElement }> = ({ children, tooltip }) => {
    if (!tooltip) {
        return children;
    }

    return <Popup trigger={children}>{tooltip}</Popup>;
};
