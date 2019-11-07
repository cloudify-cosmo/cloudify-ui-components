import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Dropdown from '../../../elements/Dropdown';

export default function PaginationInfo({
    pageSize,
    onPageSizeChange,
    currentPage,
    totalSize,
    fetchSize,
    sizeMultiplier
}) {
    const handleChange = (e, { value }) => {
        onPageSizeChange(value);
    };

    if (totalSize <= 0 && fetchSize <= 0 && currentPage === 1) {
        return null;
    }

    let start = (currentPage - 1) * pageSize + 1;
    const stop = totalSize > 0 ? Math.min(start + pageSize - 1, totalSize) : start + fetchSize - 1;

    if (start > stop) {
        start = stop;
    }

    const pageSizes = PaginationInfo.pageSizes(sizeMultiplier);

    const options = _.map(pageSizes, item => {
        return { text: item, value: item };
    });
    if (_.indexOf(pageSizes, pageSize) < 0) {
        options.unshift({ text: pageSize, value: pageSize });
    }

    return (
        <div className="ui small form">
            Page size:&nbsp;
            <Dropdown
                compact
                upward
                search
                selection
                allowAdditions
                value={pageSize}
                additionLabel="Set "
                options={options}
                clearable={false}
                onChange={handleChange}
                id="pageSizeField"
            />
            &nbsp;&nbsp;{start} to {stop}
            {totalSize > 0 && <span>&nbsp;of {totalSize} entries</span>}
        </div>
    );
}

PaginationInfo.pageSizes = multiplier => [1, 2, 3, 5, 10].map(item => multiplier * item);

PaginationInfo.propTypes = {
    pageSize: PropTypes.number.isRequired,
    onPageSizeChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number,
    totalSize: PropTypes.number,
    fetchSize: PropTypes.number,
    sizeMultiplier: PropTypes.number
};

PaginationInfo.defaultProps = {
    currentPage: 1,
    totalSize: -1,
    fetchSize: -1,
    sizeMultiplier: 5
};
