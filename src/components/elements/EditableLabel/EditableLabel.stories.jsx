import React, { useState } from 'react';
import EditableLabel from './EditableLabel';

export default {
    title: 'Elements/EditableLabel',
    component: EditableLabel
};
export const basic = () => <EditableLabel />;
basic.story = {
    name: 'Default'
};
export const readOnly = () => <EditableLabel isEditEnable={false} text="Sample Text" />;

// FIXME: When https://github.com/storybookjs/storybook/issues/8177 is solved, remove this wrapper and render component with hooks directly in the story export
function EditableLabelStoryWithHooks() {
    const [text, setText] = useState('');

    return <EditableLabel placeholder="Enter your text here..." onEditDone={setText} text={text} />;
}
export const editable = () => <EditableLabelStoryWithHooks />;
