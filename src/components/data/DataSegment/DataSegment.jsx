import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Form, Icon, Message } from 'semantic-ui-react';
import DataSearch from '../common/DataSearch';
import DataAction from '../common/DataAction';
import Pagination from '../common/Pagination';

import SegmentItem from './SegmentItem';

/**
 * `DataSegment` component enables fetching data using predefined function and showing segmented data in a simple manner.
 *
 * It delivers alternative way of presenting fetched data to `DataTable`.
 *
 * ## Features
 * - data pagination
 * - selectable segments
 * - search filter
 * - action buttons
 *
 * ## Sub-components
 * - `DataSegment.Item` = segment item
 * - `DataSegment.Action` = segment action area
 */
export default class DataSegment extends Component {
    constructor(props, context) {
        super(props, context);

        this.paginationRef = React.createRef();

        this.state = {
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

    callFetchData() {
        const { fetchData } = this.props;
        const { searchText } = this.state;
        const { currentPage, pageSize } = this.paginationRef.current.state;

        return fetchData({
            gridParams: {
                _search: searchText,
                currentPage,
                pageSize
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
            className,
            sizeMultiplier,
            noDataMessage
        } = this.props;
        const { searchText, searching } = this.state;
        let segmentAction = null;
        const segments = [];

        React.Children.forEach(children, child => {
            if (child && child.type) {
                if (child.type === DataAction) {
                    segmentAction = child;
                } else {
                    segments.push(child);
                }
            }
        });

        return (
            <div className={`segmentList ${className}`}>
                {(segmentAction || searchable) && (
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
                            {segmentAction}
                        </Form.Group>
                    </Form>
                )}

                <Pagination
                    totalSize={totalSize}
                    pageSize={pageSize}
                    sizeMultiplier={sizeMultiplier}
                    fetchData={this.callFetchData}
                    fetchSize={fetchSize}
                    ref={this.paginationRef}
                >
                    {totalSize <= 0 && fetchSize <= 0 && (totalSize === 0 || fetchSize === 0) ? (
                        <Message icon>
                            <Icon name="ban" />
                            {fetchSize === 0 &&
                            this.paginationRef.current &&
                            this.paginationRef.current.state.currentPage > 1 ? (
                                <span>No more data available</span>
                            ) : (
                                <span>{noDataMessage}</span>
                            )}
                        </Message>
                    ) : (
                        segments
                    )}
                </Pagination>
            </div>
        );
    }
}

DataSegment.Item = SegmentItem;
DataSegment.Action = DataAction;

DataSegment.propTypes = {
    /**
     * primary content
     */
    children: PropTypes.node.isRequired,

    /**
     * function used to fetch data
     */
    fetchData: PropTypes.func,

    /**
     * total number of data segments, if not specified pagination will not be set. It is used to calculate pagination pages.
     */
    totalSize: PropTypes.number,

    /**
     * if total number is unknown size of fetched data can be provided. Pagination pages will be added dynamically until fetchSize is not equal to page size
     */
    fetchSize: PropTypes.number,

    /**
     * number of displayed rows on page
     */
    pageSize: PropTypes.number,

    /**
     * CSS classname
     */
    className: PropTypes.string,

    /**
     * param related to pagination. List of page sizes is generated as multiplication of basic fixed values [1, 2, 3, 5, 10] by this param
     */
    sizeMultiplier: PropTypes.number,

    /**
     * if true filtering and searching input to be added
     */
    searchable: PropTypes.bool,

    /**
     * message displayed when there's no data
     */
    noDataMessage: PropTypes.string
};

DataSegment.defaultProps = {
    className: '',
    fetchData: () => {},
    totalSize: -1,
    fetchSize: -1,
    pageSize: 0,
    sizeMultiplier: 3,
    searchable: false,
    noDataMessage: 'No data available'
};
