import PropTypes from 'prop-types';
import React from 'react';
import logo from 'cloudify-ui-common/images/logo.png';

/**
 * Logo is a component displaying 45px x 45x image in div block.
 * If `url` prop is not provided, then by default it shows Cloudify logo.
 */
export default function Logo({ className, style, url }) {
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
                backgroundImage: `url(${url || logo})`,
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
