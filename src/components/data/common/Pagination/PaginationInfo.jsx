import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Form from '../../../form/Form';

/**
 * @return {null}
 */

export default function PaginationInfo({ pageSize, onPageSizeChange, currentPage, totalSize, sizeMultiplier }) {
    const handleChange = (e, { value }) => {
        onPageSizeChange(value);
    };

    if (totalSize <= 0 && currentPage === 1) {
        return null;
    }

    let start = (currentPage - 1) * pageSize + 1;
    const stop = Math.min(start + pageSize - 1, totalSize);

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
        <Form>
            Page size:&nbsp;
            <Form.Dropdown
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
        </Form>
    );
}

PaginationInfo.pageSizes = multiplier => [1, 2, 3, 5, 10].map(item => multiplier * item);

PaginationInfo.propTypes = {
    pageSize: PropTypes.number.isRequired,
    onPageSizeChange: PropTypes.func.isRequired,
    totalSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number,
    sizeMultiplier: PropTypes.number
};

PaginationInfo.defaultProps = {
    currentPage: 1,
    sizeMultiplier: 5
};
