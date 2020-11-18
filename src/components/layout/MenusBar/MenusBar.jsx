import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { Menu } from 'semantic-ui-react';
import colors from 'cloudify-ui-common/styles/_colors.scss';

const StyledMenu = styled(Menu)`
    .item,
    .item .dropdown.icon {
        color: ${props => props.textcolor} !important;
    }
    /* TODO: add hover styling */
`;

/**
 * MenusBar is a styled component wrapper for Menu component. It is dedicated to be used inside `HeaderBar` components.
 * Children can be components created with use of `HeaderMenu` components.
 *
 * It supports theming:
 *
 * * `headerTextColor` parameter is used as a text color
 */
export default function MenusBar({ className, children }) {
    const theme = useContext(ThemeContext);
    const color = theme ? theme.headerTextColor : colors.white;

    return (
        <StyledMenu
            inverted
            secondary
            className={className}
            style={{ marginLeft: 'auto', height: '100%' }}
            floated="right"
            textcolor={color}
        >
            {children}
        </StyledMenu>
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
