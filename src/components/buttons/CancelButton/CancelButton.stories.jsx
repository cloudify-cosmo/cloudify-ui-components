import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import CancelButton from './CancelButton';

export default {
    title: 'Buttons/CancelButton',
    component: CancelButton,
    decorators: [LiveEditDecorator({ CancelButton })]
};
export const basic = () => <CancelButton />;
basic.story = {
    name: 'Default'
};
export const custom = () => <CancelButton content="Stop" icon="stop" color="red" />;
custom.story = {
    name: 'Custom content'
};
