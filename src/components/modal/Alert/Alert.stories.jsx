import React, { useState } from 'react';

import { Button } from 'semantic-ui-react';
import Alert from './Alert';

export default {
    title: 'Modal/Alert',
    component: Alert
};

// FIXME: When https://github.com/storybookjs/storybook/issues/8177 is solved, remove this wrapper and render component with hooks directly in the story export
function AlertStoryWithHook() {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <Button onClick={() => setOpen(true)} content="Show Alert" />
            <Alert content="This is the message" open={open} onDismiss={() => setOpen(false)} />
        </div>
    );
}
export const basic = () => <AlertStoryWithHook />;
