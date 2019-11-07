import React from 'react';
import PropTypes from 'prop-types';

import { Form } from 'semantic-ui-react';

export default function DataSearch({ onSearch, search, searching }) {
    return (
        <Form.Field>
            <Form.Input
                icon="search"
                placeholder="Search..."
                value={search}
                onChange={e => onSearch(e.target.value)}
                loading={searching}
            />
        </Form.Field>
    );
}

DataSearch.propTypes = {
    /**
     * string value of the input search field
     */
    search: PropTypes.string.isRequired,

    /**
     * function called on search input value change
     */
    onSearch: PropTypes.func.isRequired,

    /**
     * if set, then search input will be in loading state
     */
    searching: PropTypes.bool
};

DataSearch.defaultProps = {
    searching: false
};
