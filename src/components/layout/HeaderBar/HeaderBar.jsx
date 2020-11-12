import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import colors from 'cloudify-ui-common/styles/_colors.scss';

const StyledDiv = styled.div`
  width: 100%;
  height: ${props => props.height};
  line-height: ${props => props.height};
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color} !important;
  display: inline-flex;
}

`;
/**
 *
 * HeaderBar is a component block to be used as a container for all application header components.
 *
 * Application header components can be: `HeaderBanner`, `MenusBar`, `HeaderMenu`, `Logo`.
 *
 * Other components in most cases can fit here as well.
 *
 * It supports theming:
 *
 * * `mainColor` parameter is used as background color
 * * `headerTextColor` parameter is used as a text color
 */
export default function HeaderBar({ height, children }) {
    const theme = useContext(ThemeContext);
    const backgroundColor = theme ? theme.mainColor : colors.blueNormal;
    const color = theme ? theme.headerTextColor : colors.white;

    return (
        <StyledDiv height={height} backgroundColor={backgroundColor} color={color}>
            {children}
        </StyledDiv>
    );
}

HeaderBar.propTypes = {
    /**
     * elements displayed inside the Segment
     */
    children: PropTypes.node.isRequired,

    /**
     * height of the header bar, provided as string (passed directly to CSS)
     */
    height: PropTypes.string
};

HeaderBar.defaultProps = {
    height: '55px'
};
