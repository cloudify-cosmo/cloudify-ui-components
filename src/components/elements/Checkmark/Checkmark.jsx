import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

/**
 * Checkmark component shows a simple checkbox (read only)
 */
function Checkmark(props) {
    const { value } = props;
    return <Icon title={value ? 'Yes' : 'No'} name={value ? 'checkmark box' : 'square outline'} />;
}

Checkmark.propTypes = {
    /**
     * If true the component will be marked as checked
     */
    value: PropTypes.bool
};

Checkmark.defaultProps = {
    value: false
};

export default Checkmark;
