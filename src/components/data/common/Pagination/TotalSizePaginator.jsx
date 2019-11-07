import React from 'react';
import PropTypes from 'prop-types';

import { Menu } from 'semantic-ui-react';

const PAGER_POSITIONS = 5;

/**
 * @return {null}
 */

export default function TotalSizePaginator({ currentPage, pageSize, totalSize, onPageChange }) {
    const pageCount = Math.ceil(totalSize / pageSize);

    if (pageCount <= 1) {
        return null;
    }

    const prevPageDisabled = currentPage === 1;
    const nextPageDisabled = currentPage === pageCount;

    let begin = pageCount <= PAGER_POSITIONS ? 1 : Math.max(currentPage - Math.floor(PAGER_POSITIONS / 2), 1);
    if (currentPage > PAGER_POSITIONS && currentPage > pageCount - Math.floor(PAGER_POSITIONS / 2)) {
        begin = pageCount - PAGER_POSITIONS + 1;
    }

    const end = Math.min(begin + PAGER_POSITIONS - 1, pageCount);

    const pagerElements = [];
    for (let i = begin; i <= end; i += 1) {
        if (begin > 1 && pageCount > PAGER_POSITIONS && i === begin) {
            pagerElements.push(<Menu.Item key={i} content="1" onClick={() => onPageChange(1)} />);
            if (begin > 2) {
                pagerElements.push(<Menu.Item key={i + 1} content="..." className="disabled" />);
            } else {
                pagerElements.push(<Menu.Item key={i + 1} content="2" onClick={() => onPageChange(2)} />);
            }
        } else if (end < pageCount && i === end) {
            if (end < pageCount - 1) {
                pagerElements.push(<Menu.Item key={i + 1} content="..." className="disabled" />);
            } else {
                pagerElements.push(
                    <Menu.Item key={i + 1} content={pageCount - 1} onClick={() => onPageChange(pageCount - 1)} />
                );
            }
            pagerElements.push(<Menu.Item key={i + 2} content={pageCount} onClick={() => onPageChange(pageCount)} />);
        } else {
            pagerElements.push(
                <Menu.Item key={i + 1} active={currentPage === i} content={i} onClick={() => onPageChange(i)} />
            );
        }
    }

    return (
        <Menu pagination floated="right" size="small">
            <Menu.Item
                icon="angle left"
                link
                className={prevPageDisabled ? 'disabled' : ''}
                onClick={() => {
                    if (!prevPageDisabled) onPageChange(currentPage - 1);
                }}
            />

            {pagerElements}

            <Menu.Item
                icon="angle right"
                link
                className={nextPageDisabled ? 'disabled' : ''}
                onClick={() => {
                    if (!nextPageDisabled) onPageChange(currentPage + 1);
                }}
            />
        </Menu>
    );
}

TotalSizePaginator.propTypes = {
    currentPage: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    totalSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};
