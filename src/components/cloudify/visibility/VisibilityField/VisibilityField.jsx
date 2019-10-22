import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Popup from '../../../popups/Popup';
import VisibilityIcon from '../VisibilityIcon';
import { visibilities, visibilityPropType } from '../consts';

/**
 * VisibilityField - allowing the user to choose visibilities for resources by showing the visibility icon and clicking on it to switch.
 *
 * The component accepts a callback function to be called with the current visibility on change.
 */
export default function VisibilityField(props) {
    const { visibility, onVisibilityChange, disallowGlobal, allowChange, className } = props;

    const visibilitiesOrder = [visibilities.TENANT.name, visibilities.PRIVATE.name, visibilities.GLOBAL.name];

    const visibilityTitle = _.reduce(
        visibilities,
        (result, visibilityObject) => {
            // eslint-disable-next-line no-param-reassign
            result[visibilityObject.name] = visibilityObject.title;
            return result;
        },
        {}
    );

    const onClick = () => {
        const allowedVisibilities = disallowGlobal ? _.dropRight(visibilitiesOrder) : visibilitiesOrder;
        const index = allowedVisibilities.indexOf(visibility);
        if (index >= 0 && index < allowedVisibilities.length - 1) {
            onVisibilityChange(allowedVisibilities[index + 1]);
        } else {
            onVisibilityChange(allowedVisibilities[0]);
        }
    };

    return (
        <Popup>
            <Popup.Trigger>
                <VisibilityIcon
                    visibility={visibility}
                    link={allowChange}
                    disabled={!allowChange}
                    showTitle={false}
                    title={null}
                    className={className}
                    onClick={onClick}
                />
            </Popup.Trigger>
            <Popup.Header>Visibility</Popup.Header>
            <Popup.Content>{visibilityTitle[visibility]}</Popup.Content>
        </Popup>
    );
}

VisibilityField.propTypes = {
    /**
     * the current visibility, one from ['tenant', 'private', 'global', 'unknown']
     */
    visibility: visibilityPropType,

    /**
     * the callback to be called with the new visibility
     */
    onVisibilityChange: PropTypes.func,

    /**
     * should the component not allow changing the global
     */
    disallowGlobal: PropTypes.bool,

    /**
     * should the component allow changing visibility
     */
    allowChange: PropTypes.bool,

    /**

     * name of the style class to be added
     */
    className: PropTypes.string
};

VisibilityField.defaultProps = {
    visibility: visibilities.UNKNOWN.name,
    onVisibilityChange: () => {},
    disallowGlobal: false,
    allowChange: true,
    className: ''
};
