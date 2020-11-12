import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

export default function LicenseEdition({ edition }) {
    return !_.isEmpty(edition) && <span style={{ verticalAlign: 'middle' }}> {edition}</span>;
}

LicenseEdition.propTypes = {
    edition: PropTypes.string
};

LicenseEdition.defaultProps = {
    edition: ''
};
