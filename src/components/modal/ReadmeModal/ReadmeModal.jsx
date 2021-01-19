import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'semantic-ui-react';
import './ReadmeModal.css';

/**
 * ReadmeModal is a component to present HTML content in Modal component.
 */
export default function ReadmeModal(props) {
    const { className, content, open, onHide } = props;
    const onCancel = () => {
        onHide();
        return true;
    };

    const getContent = () => {
        return { __html: content };
    };

    return (
        <Modal
            open={open}
            onClose={onCancel}
            closeIcon="close"
            className={`readmeModal unlimited ${className}`}
            size="fullscreen"
        >
            <Modal.Content>
                {/* eslint-disable-next-line react/no-danger */}
                <div dangerouslySetInnerHTML={getContent()} />
            </Modal.Content>
        </Modal>
    );
}

ReadmeModal.propTypes = {
    /**
     * HTML content of the modal
     */
    content: PropTypes.string.isRequired,
    /**
     * Modal's open state
     */
    open: PropTypes.bool.isRequired,
    /**
     * A function called when the modal is closed
     */
    onHide: PropTypes.func.isRequired,
    /**
     * Modal's classname
     */
    className: PropTypes.string
};

ReadmeModal.defaultProps = {
    className: ''
};
