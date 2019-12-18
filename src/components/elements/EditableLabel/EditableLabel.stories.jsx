import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import EditableLabel from './EditableLabel';

export default {
    title: 'Elements/EditableLabel',
    component: EditableLabel,
    decorators: [LiveEditDecorator({ EditableLabel })]
};

export const basic = () => <EditableLabel placeholder="Enter your text here..." />;
basic.story = {
    name: 'Default'
};

export const readOnly = () => <EditableLabel enabled={false} value="Sample Text" />;
