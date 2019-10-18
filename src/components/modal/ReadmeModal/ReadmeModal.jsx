import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'semantic-ui-react';

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
            <Modal.Content style={{ padding: '50px' }}>
                {/* eslint-disable-next-line react/no-danger */}
                <div dangerouslySetInnerHTML={getContent()} />
            </Modal.Content>
        </Modal>
    );
}

ReadmeModal.propTypes = {
    /**
     * HTML content of modal
     */
    content: PropTypes.string.isRequired,
    /**
     * modal open state
     */
    open: PropTypes.bool.isRequired,
    /**
     * function called when modal is closed
     */
    onHide: PropTypes.func.isRequired,
    /**
     * modal classname
     */
    className: PropTypes.string
};

ReadmeModal.defaultProps = {
    className: ''
};
