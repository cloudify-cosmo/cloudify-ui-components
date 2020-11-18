import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

/**
 * MenusBar is a styled component wrapper for Menu component. It is dedicated to be used inside `HeaderBar` components.
 * Children can be components created with use of `HeaderMenu` components.
 */
export default function MenusBar({ className, children }) {
    return (
        <Menu
            inverted
            secondary
            className={`menusBar ${className}`}
            style={{ marginLeft: 'auto', height: '100%' }}
            floated="right"
        >
            {children}
        </Menu>
    );
}

MenusBar.propTypes = {
    /**
     * menus bar content, all components created using `HeaderMenu` components
     */
    children: PropTypes.node.isRequired,

    /**
     * name of the style class to be added to Menu component
     */
    className: PropTypes.string
};

MenusBar.defaultProps = {
    className: ''
};
