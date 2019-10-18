import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import Confirm from './Confirm';

export default {
    title: 'Modal/Confirm',
    component: Confirm
};

// FIXME: When https://github.com/storybookjs/storybook/issues/8177 is solved, remove this wrapper and render component with hooks directly in the story export
function ConfirmStoryWithHook() {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <Button onClick={() => setOpen(true)} content="Show Confirm" />
            <Confirm
                content="Are you sure you want to remove this blueprint?"
                open={open}
                onConfirm={() => setOpen(false)}
                onCancel={() => setOpen(false)}
            />
        </div>
    );
}
export const basic = () => <ConfirmStoryWithHook />;
