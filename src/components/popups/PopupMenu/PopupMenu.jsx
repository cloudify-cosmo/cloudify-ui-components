import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Icon } from 'semantic-ui-react';
import Popup from '../Popup';

/**
 * PopupMenu is a component which uses [Popup](https://react.semantic-ui.com/modules/popup) component to create
 * dropdown menu triggered by [Icon](https://react.semantic-ui.com/elements/icon) button.
 */
export default function PopupMenu(props) {
    const { className, children, position, offset, icon, disabled, bordered, help } = props;
    const [opened, setOpened] = useState(false);

    const trigger = _.isEmpty(help) ? (
        <Icon
            link={!disabled}
            disabled={disabled}
            name={icon}
            bordered={bordered}
            className={className}
            onClick={e => e.stopPropagation()}
        />
    ) : (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
        <span onClick={e => e.stopPropagation()}>
            <Popup
                trigger={<Icon name={icon} bordered={bordered} link={!disabled} className={className} />}
                content={help}
            />
        </span>
    );

    return (
        <Popup
            trigger={trigger}
            on="click"
            position={position}
            className="popupMenu"
            offset={offset}
            open={disabled ? false : opened}
            onClose={() => setOpened(false)}
            onOpen={() => setOpened(true)}
            onClick={e => /* istanbul ignore next */ {
                e.stopPropagation();
                setOpened(false);
            }}
        >
            {children}
        </Popup>
    );
}

PopupMenu.propTypes = {
    /**
     * additional CSS classes to be applied to popup trigger
     */
    className: PropTypes.string,
    /**
     * primary content
     */
    children: PropTypes.element.isRequired,
    /**
     * position for the popover.
     */
    position: PropTypes.string,
    /**
     * horizontal offset in pixels to be applied to popup
     */
    offset: PropTypes.number,
    /**
     * popup trigger icon name (see [Icon](https://react.semantic-ui.com/elements/icon))
     */
    icon: PropTypes.string,
    /**
     * specifies if trigger shall be disabled
     */
    disabled: PropTypes.bool,
    /**
     * specifies if icon shall be bordered
     */
    bordered: PropTypes.bool,
    /**
     * additional popup help message shown on trigger hover
     */
    help: PropTypes.string
};

PopupMenu.defaultProps = {
    className: '',
    position: 'bottom right',
    offset: 12,
    icon: 'content',
    disabled: false,
    bordered: false,
    help: ''
};
