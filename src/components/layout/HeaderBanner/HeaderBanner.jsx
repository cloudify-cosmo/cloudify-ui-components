import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Header } from 'semantic-ui-react';
import { ThemeContext } from 'styled-components';
import colors from 'cloudify-ui-common/styles/_colors.scss';

import Logo from '../Logo';
import ProductName from './ProductName';
import ProductVersion from './ProductVersion';
import LicenseEdition from './LicenseEdition';

/**
 *
 * HeaderBanner is a component displaying application header.
 *
 * * contains: logo, product name, license edition and product version
 * * supports theming:
 *   * `headerTextColor` parameter is used as text color, if not specified then `white` from default colors is chosen
 *   * `logoUrl` parameter is used as URL for Logo component
 *   * `showVersionDetails` parameter is used to determine if license edition and product version should be visible
 */
export default function HeaderBanner({
    className,
    licenseEdition,
    logoUrl,
    productName,
    productVersion,
    showVersionDetails
}) {
    const theme = useContext(ThemeContext) || {};
    const color = theme.headerTextColor || colors.white;
    const url = logoUrl || theme.logoUrl;
    const showDetails = _.isBoolean(showVersionDetails) ? showVersionDetails : theme.showVersionDetails;

    return (
        <>
            <Logo style={{ float: 'left' }} url={url} />
            <Header
                as="h1"
                style={{
                    float: 'left',
                    margin: '9px 0',
                    padding: 0,
                    height: '100%',
                    color
                }}
                className={`headerBanner ${className}`}
            >
                <ProductName name={productName} />
                {showDetails && (
                    <>
                        <LicenseEdition edition={licenseEdition} />
                        <ProductVersion version={productVersion} />
                    </>
                )}
            </Header>
        </>
    );
}

HeaderBanner.propTypes = {
    /**
     * name of the style class to be added to header div block
     */
    className: PropTypes.string,

    /**
     * product license edition, displayed after the product name
     */
    licenseEdition: PropTypes.string,

    /**
     * URL for logo, displayed first from the left side, overrides theme parameter `logoUrl`
     */
    logoUrl: PropTypes.string,

    /**
     * name of the product, displayed as first text after the logo
     */
    productName: PropTypes.string,

    /**
     * product version, should be specified according to semantic versioning format
     */
    productVersion: PropTypes.string,

    /**
     * if set to true, then license edition and product version will be displayed, overrides theme parameter `showVersionDetails`
     */
    showVersionDetails: PropTypes.bool
};

HeaderBanner.defaultProps = {
    className: '',
    licenseEdition: '',
    logoUrl: '',
    productName: '',
    productVersion: '',
    showVersionDetails: undefined
};
