import React from 'react';
import { Button } from 'semantic-ui-react';
import Dropdown from '../../elements/Dropdown';

import Modal from './Modal';

export default {
    title: 'Modal/Modal',
    component: Modal,
    parameters: {
        docs: {
            description: {
                component: `Semantic-UI's Modal component with fixed content scrolling.
                    See [Semantic-UI documentation](https://semantic-ui.com/modules/modal.html#/definition) for more information`
            }
        }
    }
};

export const basic = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <Button onClick={() => setOpen(true)} content="Show modal" />
            <Modal open={open}>
                <Modal.Header>Header</Modal.Header>
                <Modal.Content>
                    <p>Content, possibly very long.</p>

                    <Dropdown options={[{ text: 'Example 1' }, { text: 'Example 2' }]} selection />

                    {Array.from({ length: 30 }).map((_, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <p key={index}>A paragraph of text, only to expand the modal so it scrolls</p>
                    ))}
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
};
