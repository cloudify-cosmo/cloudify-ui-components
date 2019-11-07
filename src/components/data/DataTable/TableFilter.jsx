import React from 'react';
import PropTypes from 'prop-types';

import { Form } from 'semantic-ui-react';

/**
 * Defines filter bar including filter fields which are displayed above the table
 *
 * ```
 *  <DataTable>
 *
 *      ...
 *
 *      <DataTable.Filter>
 *          <Input placeholder="Package name"/>
 *          <Input placeholder="Distribution"/>
 *      </DataTable.Filter>
 *
 *      <DataTable.Action>
 *          <Button content='Upload' icon='add' labelPosition='left' />
 *      </DataTable.Action>
 *
 *  </DataTable>
 * ```
 */
export default function TableFilter({ children, className }) {
    return <Form.Field className={className}>{children}</Form.Field>;
}

TableFilter.propTypes = {
    /**
     * filter fields
     */
    children: PropTypes.node.isRequired,

    /**
     * name of the style class to be added
     */
    className: PropTypes.string
};

TableFilter.defaultProps = {
    className: ''
};
