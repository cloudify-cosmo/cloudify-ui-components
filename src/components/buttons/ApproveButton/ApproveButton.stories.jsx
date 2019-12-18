import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import ApproveButton from './ApproveButton';

export default {
    title: 'Buttons/ApproveButton',
    component: ApproveButton,
    decorators: [LiveEditDecorator({ ApproveButton })]
};
export const basic = () => <ApproveButton />;
basic.story = {
    name: 'Default'
};
export const custom = () => <ApproveButton content="Add" icon="add user" color="green" />;
custom.story = {
    name: 'Custom content'
};
