import PropTypes from 'prop-types';
import React from 'react';
import logo from 'cloudify-ui-common/images/logo.png';

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
    className: PropTypes.string,
    style: PropTypes.shape({}),
    url: PropTypes.string
};

Logo.defaultProps = {
    className: 'logo',
    style: {},
    url: ''
};
