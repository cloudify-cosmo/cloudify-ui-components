import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Popup, Button, Header } from 'semantic-ui-react';

/**
 * PopupConfirm is a component which uses [Popup](https://react.semantic-ui.com/modules/popup) component to display
 * popup with content enhanced by two buttons - OK and Cancel.
 */
export default function PopupConfirm({ content, trigger, onCancel, onCanConfirm, onConfirm, defaultOpen }) {
    const [showPopup, setShowPopup] = useState(defaultOpen);
    const [canConfirm, setCanConfirm] = useState('');
    const openPopup = () => {
        setCanConfirm(onCanConfirm());
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleCancel = e => {
        e.stopPropagation();
        closePopup();
        onCancel();
    };

    const handleConfirm = e => {
        e.stopPropagation();
        closePopup();
        onConfirm();
    };

    return (
        <Popup
            trigger={trigger}
            on="click"
            wide="very"
            hideOnScroll
            open={showPopup}
            onOpen={openPopup}
            onClose={closePopup}
        >
            <Header>{canConfirm || content}</Header>

            <div style={{ textAlign: 'right' }}>
                {canConfirm ? (
                    <Button icon="checkmark" content="Ok" color="green" onClick={handleCancel} />
                ) : (
                    <>
                        <Button icon="remove" content="Cancel" basic onClick={handleCancel} />
                        <Button icon="checkmark" content="Ok" color="green" onClick={handleConfirm} />
                    </>
                )}
            </div>
        </Popup>
    );
}

PopupConfirm.propTypes = {
    /**
     * popup trigger
     */
    trigger: PropTypes.node,
    /**
     * popup content
     */
    content: PropTypes.string,
    /**
     * function called on Cancel button click
     */
    onCancel: PropTypes.func,
    /**
     * function called on OK button click
     */
    onConfirm: PropTypes.func,
    /**
     * function called to determine if Cancel button should be displayed
     */
    onCanConfirm: PropTypes.func,
    /**
     * if set then the component renders initially open
     */
    defaultOpen: PropTypes.bool
};

PopupConfirm.defaultProps = {
    trigger: null,
    content: '',
    onCancel: () => {},
    onConfirm: () => {},
    onCanConfirm: () => {},
    defaultOpen: false
};
