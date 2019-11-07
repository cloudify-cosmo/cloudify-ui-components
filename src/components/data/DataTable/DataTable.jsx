import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Form, Table } from 'semantic-ui-react';
import Pagination from '../common/Pagination';
import DataAction from '../common/DataAction';
import DataSearch from '../common/DataSearch';

import TableColumn from './TableColumn';
import TableDataCell from './TableDataCell';
import TableDataExpandable from './TableDataExpandable';
import TableFilter from './TableFilter';
import TableRow from './TableRow';
import TableRowExpandable from './TableRowExpandable';
import DataTableContext from './DataTableContext';

import './DataTable.css';

/**
 * DataTable component enables fetching data using predefined function and showing tabular data in a simple manner.
 *
 * ## Features
 * - data pagination
 * - selectable rows
 * - expandable rows
 * - data sorting by columns
 * - filtering data
 *
 * ## Sub-components
 * - `DataTable.Row` = data row
 * - `DataTable.Column` = header column;
 * - `DataTable.Data` = data cell
 * - `DataTable.Action` = table action area
 * - `DataTable.Filter` = table filter
 * - `DataTable.RowExpandable` = expandable data row;
 * - `DataTable.DataExpandable` = expandable data content;
 */
export default class DataTable extends Component {
    constructor(props, context) {
        super(props, context);

        this.paginationRef = React.createRef();

        this.state = {
            sortColumn: props.sortColumn,
            sortAscending: props.sortAscending,
            searchText: '',
            searching: false
        };

        this.debouncedSearch = _.debounce(
            () => {
                this.paginationRef.current.reset(() => {
                    return Promise.resolve(this.callFetchData()).then(() => this.setState({ searching: false }));
                });
            },
            300,
            { maxWait: 2000 }
        );

        this.callFetchData = this.callFetchData.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { sortColumn, sortAscending } = this.props;
        const changedProps = {};
        if (prevProps.sortColumn !== sortColumn) {
            changedProps.sortColumn = sortColumn;
        }
        if (prevProps.sortAscending !== sortAscending) {
            changedProps.sortAscending = sortAscending;
        }

        if (!_.isEmpty(changedProps)) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState(changedProps);
        }
    }

    setSortColumn(name) {
        const { sortAscending, sortColumn } = this.state;
        let ascending = sortAscending;

        if (sortColumn === name) {
            ascending = !ascending;
        } else {
            ascending = true;
        }

        const fetchData = { sortColumn: name, sortAscending: ascending, currentPage: 1 };
        this.setState(fetchData, () => {
            this.paginationRef.current.reset(this.callFetchData);
        });
    }

    callFetchData() {
        const { fetchData } = this.props;
        const { searchText, sortColumn, sortAscending } = this.state;
        const { currentPage, pageSize } = this.paginationRef.current.state;

        return fetchData({
            gridParams: {
                _search: searchText,
                currentPage,
                pageSize,
                sortColumn,
                sortAscending
            }
        });
    }

    render() {
        const {
            children,
            totalSize,
            fetchSize,
            pageSize,
            searchable,
            selectable,
            className,
            noDataAvailable,
            sizeMultiplier,
            noDataMessage
        } = this.props;
        const { searchText, searching, sortColumn, sortAscending } = this.state;
        const headerColumns = [];
        const bodyRows = [];
        let gridAction = null;
        const gridFilters = [];

        const showCols = [];
        React.Children.forEach(children, child => {
            if (child) {
                if (child.type === TableColumn) {
                    showCols.push(child.props.show);
                    headerColumns.push(child);
                } else if (child.type === TableRow) {
                    bodyRows.push(React.cloneElement(child, { showCols }));
                } else if (child.type === TableRowExpandable) {
                    const expandableContent = [];
                    React.Children.forEach(child.props.children, expChild => {
                        if (expChild) {
                            if (expChild.type === TableRow) {
                                bodyRows.push(React.cloneElement(expChild, { showCols }));
                            } else if (expChild.type === TableDataExpandable && child.props.expanded) {
                                expandableContent.push(
                                    React.cloneElement(expChild, { numberOfColumns: showCols.length })
                                );
                            }
                        }
                    });
                    bodyRows.push(expandableContent);
                } else if (child.type === DataAction) {
                    gridAction = child;
                } else if (child.type === TableFilter) {
                    gridFilters.push(child);
                }
            }
        });

        return (
            <div className={`gridTable ${className}`}>
                {(searchable || !_.isEmpty(gridFilters) || gridAction) && (
                    <Form size="small" as="div">
                        <Form.Group inline>
                            {searchable && (
                                <DataSearch
                                    search={searchText}
                                    searching={searching}
                                    onSearch={text =>
                                        this.setState({ searchText: text, searching: true }, this.debouncedSearch)
                                    }
                                />
                            )}
                            {gridFilters}
                            {gridAction}
                        </Form.Group>
                    </Form>
                )}

                <Pagination
                    totalSize={totalSize}
                    pageSize={pageSize}
                    sizeMultiplier={sizeMultiplier}
                    fetchSize={fetchSize}
                    fetchData={this.callFetchData}
                    ref={this.paginationRef}
                >
                    <DataTableContext.Provider
                        value={{
                            sortColumn,
                            sortAscending,
                            setSortColumn: name => this.setSortColumn(name)
                        }}
                    >
                        <Table compact="very" sortable selectable={selectable} className={className}>
                            <Table.Header>
                                <Table.Row>{headerColumns}</Table.Row>
                            </Table.Header>
                            {noDataAvailable ||
                            (totalSize <= 0 && fetchSize <= 0 && (totalSize === 0 || fetchSize === 0)) ? (
                                <Table.Body>
                                    <Table.Row className="noDataRow">
                                        <td colSpan={headerColumns.length} className="center aligned">
                                            {fetchSize === 0 &&
                                            this.paginationRef.current &&
                                            this.paginationRef.current.state.currentPage > 1 ? (
                                                <span>No more data available</span>
                                            ) : (
                                                <span>{noDataMessage}</span>
                                            )}
                                        </td>
                                    </Table.Row>
                                </Table.Body>
                            ) : (
                                <Table.Body>{bodyRows}</Table.Body>
                            )}
                        </Table>
                    </DataTableContext.Provider>
                </Pagination>
            </div>
        );
    }
}

DataTable.Row = TableRow;
DataTable.Column = TableColumn;
DataTable.Data = TableDataCell;
DataTable.Action = DataAction;
DataTable.Filter = TableFilter;
DataTable.RowExpandable = TableRowExpandable;
DataTable.DataExpandable = TableDataExpandable;

DataTable.propTypes = {
    /**
     * table content
     */
    children: PropTypes.node.isRequired,

    /**
     * function used to fetch table data
     */
    fetchData: PropTypes.func,

    /**
     * total number of rows in table, if not specified pagination will not be set. It is used to calculate pagination pages
     */
    totalSize: PropTypes.number,

    /**
     * if total number is unknown size of fetched data can be provided, pagination pages will be added dynamically until fetchSize is not equal to page size
     */
    fetchSize: PropTypes.number,

    /**
     * number of displayed rows on page
     */
    pageSize: PropTypes.number,

    /**
     * column name used for data sorting
     */
    sortColumn: PropTypes.string,

    /**
     * true for ascending sort, false for descending sort
     */
    sortAscending: PropTypes.bool,

    /**
     * if true filtering and searching input to be added
     */
    searchable: PropTypes.bool,

    /**
     * if true row can be selected and highlighted
     */
    selectable: PropTypes.bool,

    /**
     * name of the style class to be added
     */
    className: PropTypes.string,

    /**
     * if true no data available message is shown
     */
    noDataAvailable: PropTypes.bool,

    /**
     * param related to pagination, list of page sizes is generated as multiplication of basic fixed values [1, 2, 3, 5, 10] by this param
     */
    sizeMultiplier: PropTypes.number,

    /**
     * message displayed when there's no data
     */
    noDataMessage: PropTypes.string
};

DataTable.defaultProps = {
    fetchData: () => Promise.resolve(),
    totalSize: -1,
    fetchSize: -1,
    pageSize: 0,
    sortColumn: '',
    sortAscending: true,
    searchable: false,
    selectable: false,
    className: '',
    noDataAvailable: false,
    sizeMultiplier: 5,
    noDataMessage: 'No data available'
};
