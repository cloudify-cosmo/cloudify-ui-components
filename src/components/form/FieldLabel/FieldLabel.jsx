import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import PopupHelp from 'components/popups/PopupHelp';

/**
 * FieldLabel creates input field description with help popup (PopupHelp component)
 *
 * @return {null}
 */
export default function FieldLabel({ label, help }) {
    return !_.isEmpty(label) ? (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label>
            {label}{' '}
            {!_.isEmpty(help) && (
                <span>
                    <PopupHelp content={help} />
                </span>
            )}
        </label>
    ) : null;
}

FieldLabel.propTypes = {
    /**
     * field label
     */
    label: PropTypes.string,
    /**
     * help description
     */
    help: PropTypes.string
};

FieldLabel.defaultProps = {
    label: '',
    help: ''
};
