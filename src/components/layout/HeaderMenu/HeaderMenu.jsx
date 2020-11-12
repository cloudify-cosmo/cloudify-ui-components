import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Dropdown } from 'semantic-ui-react';

const StyledDropdown = styled(Dropdown)`
    .dropdown.icon {
        margin: 0 0 0 0.4em !important;
        vertical-align: middle;
    }
`;

/**
 * HeaderMenu is a styled component wrapper for Dropdown.Menu. It is dedicated to be used in header bars,
 * inside `HeaderBar` or `MenusBar` components.
 */
export default function HeaderMenu({ trigger, className, children, onClose }) {
    return (
        <StyledDropdown
            item
            pointing="top right"
            trigger={trigger}
            className={className}
            onClose={onClose}
            style={{
                padding: '5px 10px',
                height: '100%'
            }}
        >
            <Dropdown.Menu>{children}</Dropdown.Menu>
        </StyledDropdown>
    );
}

HeaderMenu.propTypes = {
    /**
     * React node to be used as dropdown menu trigger
     */
    trigger: PropTypes.node.isRequired,

    /**
     * header menu content, all components which can be placed inside Dropdown.Menu
     */
    children: PropTypes.node.isRequired,

    /**
     * name of the style class to be added
     */
    className: PropTypes.string,

    /**
     * function to be called on header menu close
     */
    onClose: PropTypes.func
};

HeaderMenu.defaultProps = {
    className: '',
    onClose: _.noop
};
