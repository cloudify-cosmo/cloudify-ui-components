import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Icon, Message } from 'semantic-ui-react';
import Popup from '../../../popups/Popup';
import PaginationInfo from './PaginationInfo';
import TotalSizePaginator from './TotalSizePaginator';
import FetchSizePaginator from './FetchSizePaginator';

import './Pagination.css';

export default class Pagination extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            pageSize: props.pageSize,
            currentPage: 1,
            showWarningPopup: false
        };

        this.changePage = this.changePage.bind(this);
        this.changePageSize = this.changePageSize.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { pageSize, totalSize } = this.props;
        const { currentPage } = this.state;

        const changedProps = {};

        if (prevProps.pageSize !== pageSize) {
            changedProps.pageSize = pageSize;
        }

        if (totalSize >= 0 && currentPage !== 1) {
            const pageCount = Math.ceil(totalSize / pageSize);
            if (currentPage > pageCount) {
                changedProps.currentPage = 1;
            }
        }

        if (!_.isEmpty(changedProps)) {
            this.changePage(changedProps.currentPage || currentPage, changedProps.pageSize);
        }
    }

    changePageSize(size) {
        const minPageSize = 1;
        const maxPageSize = 500;
        const popupShowTimeout = 3000;

        const { fetchData, sizeMultiplier } = this.props;
        let pageSize = parseInt(size, 10);
        let showWarningPopup = false;

        if (Number.isNaN(pageSize) || pageSize < minPageSize || pageSize > maxPageSize) {
            [pageSize] = Pagination.PAGE_SIZE_LIST(sizeMultiplier);
            showWarningPopup = true;
        }

        this.setState({ pageSize, currentPage: 1, showWarningPopup }, () => {
            if (showWarningPopup) {
                setTimeout(() => this.setState({ showWarningPopup: false }), popupShowTimeout);
            }
            return fetchData();
        });
    }

    changePage(page, pageSize) {
        const { fetchData } = this.props;
        const { pageSize: pageSizeState } = this.props;

        this.setState({ currentPage: page, pageSize: pageSize || pageSizeState }, () => fetchData());
    }

    reset(callback) {
        this.setState({ currentPage: 1 }, callback);
    }

    render() {
        const { children, totalSize, fetchSize, sizeMultiplier } = this.props;
        const { currentPage, pageSize: pageSizeState, showWarningPopup } = this.state;

        return (
            <div>
                {children}

                {(totalSize > Pagination.PAGE_SIZE_LIST(sizeMultiplier)[0] || fetchSize > 0 || currentPage > 1) && (
                    <div className="ui two column grid gridPagination">
                        <div className="column">
                            <Popup open={showWarningPopup} wide="very">
                                <Popup.Trigger>
                                    <PaginationInfo
                                        currentPage={currentPage}
                                        pageSize={pageSizeState}
                                        totalSize={totalSize}
                                        fetchSize={fetchSize}
                                        onPageSizeChange={this.changePageSize}
                                        sizeMultiplier={sizeMultiplier}
                                    />
                                </Popup.Trigger>
                                <Popup.Content>
                                    <Message warning>
                                        <Icon name="warning sign" />
                                        Only integer values between 1 and 500 are allowed.
                                    </Message>
                                </Popup.Content>
                            </Popup>
                        </div>
                        <div className="right aligned column">
                            {totalSize > 0 ? (
                                <TotalSizePaginator
                                    currentPage={currentPage}
                                    pageSize={pageSizeState}
                                    totalSize={totalSize}
                                    onPageChange={this.changePage}
                                />
                            ) : (
                                <FetchSizePaginator
                                    currentPage={currentPage}
                                    pageSize={pageSizeState}
                                    fetchSize={fetchSize}
                                    onPageChange={this.changePage}
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

Pagination.PAGE_SIZE_LIST = PaginationInfo.pageSizes;

Pagination.propTypes = {
    children: PropTypes.node.isRequired,
    fetchData: PropTypes.func.isRequired,
    pageSize: PropTypes.number,
    totalSize: PropTypes.number,
    fetchSize: PropTypes.number,
    sizeMultiplier: PropTypes.number
};

Pagination.defaultProps = {
    totalSize: 0,
    fetchSize: 0,
    sizeMultiplier: 5,
    pageSize: Pagination.PAGE_SIZE_LIST(5)[0]
};
