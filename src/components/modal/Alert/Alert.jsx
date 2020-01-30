import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';

import ApproveButton from 'components/buttons/ApproveButton';

/**
 * Alert is component to present simple message in modal window with OK button.
 */
export default function Alert(props) {
    const { open, content, onDismiss } = props;
    return (
        <Modal open={open} size="small">
            <Modal.Header>{content}</Modal.Header>
            <Modal.Actions>
                <ApproveButton onClick={onDismiss} content="OK" color="green" />
            </Modal.Actions>
        </Modal>
    );
}

Alert.propTypes = {
    /**
     * display alert modal window
     */
    open: PropTypes.bool.isRequired,
    /**
     * alert header content
     */
    content: PropTypes.node.isRequired,
    /**
     * action executed on OK button click
     */
    onDismiss: PropTypes.func
};

Alert.defaultProps = {
    onDismiss: () => {}
};
