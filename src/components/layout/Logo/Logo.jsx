import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import logo from 'cloudify-ui-common/images/logo.png';

/**
 * Logo is a component displaying 45px x 45x image in div block.
 *
 * This component supports theming: `logoUrl` parameter is used as logo URL.
 *
 * The logo selection is done the following way:
 *
 * 1. If non-empty `url` prop is provided, then it is selected
 * 1. If first condition is not met and theme is provided with non-empty `logoUrl` parameter, then it is selected
 * 1. In all other cases, the default Cloudify logo will be selected
 *
 */
export default function Logo({ className, style, url }) {
    const theme = useContext(ThemeContext) || {};
    const logoUrl = url || theme.logoUrl || logo;

    return (
        <div
            className={className}
            style={{
                position: 'relative',
                display: 'inline-block',
                verticalAlign: 'middle',
                top: 0,
                left: 0,
                height: 45,
                width: 45,
                margin: '5px 10px',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundImage: `url(${logoUrl})`,
                ...style
            }}
        />
    );
}

Logo.propTypes = {
    /**
     * name of the style class to be added to logo div block
     */
    className: PropTypes.string,

    /**
     * styles to be added to logo div block
     */
    style: PropTypes.shape({}),

    /**
     * URL from which logo image should be fetched
     */
    url: PropTypes.string
};

Logo.defaultProps = {
    className: 'logo',
    style: {},
    url: ''
};
