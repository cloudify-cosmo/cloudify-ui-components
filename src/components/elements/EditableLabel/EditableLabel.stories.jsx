import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import StoryWithHooks from 'decorators/StoryWithHooks';
import EditableLabel from './EditableLabel';

export default {
    title: 'Elements/EditableLabel',
    component: EditableLabel,
    decorators: [LiveEditDecorator({ EditableLabel })]
};

export const basic = () => <EditableLabel />;
basic.story = {
    name: 'Default'
};

export const readOnly = () => <EditableLabel isEditEnable={false} text="Sample Text" />;

export const editable = StoryWithHooks(() => {
    const [text, setText] = React.useState('');

    return <EditableLabel placeholder="Enter your text here..." onEditDone={setText} text={text} />;
});
