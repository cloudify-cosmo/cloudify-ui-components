import React from 'react';
import PropTypes from 'prop-types';

import { Menu } from 'semantic-ui-react';

const PAGER_POSITIONS = 4;

/**
 * @return {null}
 */

export default function FetchSizePaginator({ currentPage, pageSize, fetchSize, onPageChange }) {
    if (currentPage <= 1 && fetchSize < pageSize) {
        return null;
    }

    const prevPageDisabled = currentPage === 1;
    const nextPageDisabled = fetchSize < pageSize;

    let begin = currentPage <= PAGER_POSITIONS ? 1 : Math.max(currentPage - Math.floor(PAGER_POSITIONS / 2), 1);
    if (currentPage > PAGER_POSITIONS && currentPage > currentPage - Math.floor(PAGER_POSITIONS / 2)) {
        begin = currentPage - PAGER_POSITIONS + 1;
    }

    const pagerElements = [];
    for (let i = begin; i <= currentPage; i += 1) {
        if (begin > 1 && currentPage > PAGER_POSITIONS && i === begin) {
            pagerElements.push(<Menu.Item key={i} content="1" onClick={() => onPageChange(1)} />);
            if (begin > 2) {
                pagerElements.push(<Menu.Item key={i + 1} content="..." className="disabled" />);
            } else {
                pagerElements.push(<Menu.Item key={i + 1} content="2" onClick={() => onPageChange(2)} />);
            }
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

FetchSizePaginator.propTypes = {
    currentPage: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    fetchSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};
