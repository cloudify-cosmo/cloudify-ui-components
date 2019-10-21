import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Statistic } from 'semantic-ui-react';

/**
 * KeyIndicator - a simple component showing a counter along with an icon
 *
 * List of available icons can be found [here](https://react.semantic-ui.com/elements/icon)
 */
export default function KeyIndicator(props) {
    const { title, icon, number } = props;
    return (
        <div
            style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                overflow: 'hidden'
            }}
        >
            <Statistic
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    whiteSpace: 'nowrap'
                }}
            >
                <Statistic.Value>
                    <Icon name={icon} /> {number}
                </Statistic.Value>
                <Statistic.Label>{title}</Statistic.Label>
            </Statistic>
        </div>
    );
}

KeyIndicator.propTypes = {
    /**
     * Label appearing at the bottom of the component
     */
    title: PropTypes.string.isRequired,
    /**
     * Name of the icon to be displayed
     */
    icon: PropTypes.string.isRequired,
    /**
     * Numerical value to be displayed
     */
    number: PropTypes.number.isRequired
};
