import React from 'react';
import { Button } from 'semantic-ui-react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import StoryWithHooks from 'decorators/StoryWithHooks';
import Confirm from './Confirm';

export default {
    title: 'Modal/Confirm',
    component: Confirm,
    decorators: [LiveEditDecorator({ Button, Confirm })]
};

export const basic = StoryWithHooks(() => {
    const [open, setOpen] = React.useState(false);
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
});
