import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import colors from 'cloudify-ui-common/styles/_colors.scss';

export default function ProductVersion({ version }) {
    const versionMatches = version.match(/^(\d+)\.(\d+).*$/);
    const major = !!versionMatches && _.size(versionMatches) >= 2 ? versionMatches[1] : '';
    const minor = !!versionMatches && _.size(versionMatches) >= 3 ? versionMatches[2] : '';
    const shortVersion = `${major}${minor ? `.${minor}` : ''}`;

    return (
        !_.isEmpty(shortVersion) && (
            <span style={{ color: colors.greyNormal, verticalAlign: 'middle' }}> {shortVersion}</span>
        )
    );
}

ProductVersion.propTypes = {
    version: PropTypes.string.isRequired
};
