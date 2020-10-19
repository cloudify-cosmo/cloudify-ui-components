import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import Checkmark from './Checkmark';

export default {
    title: 'Elements/Checkmark',
    component: Checkmark,
    decorators: [LiveEditDecorator({ Checkmark })]
};

export const basic = () => <Checkmark />;
basic.storyName = 'Default';

export const checked = () => <Checkmark value />;

export const unchecked = () => <Checkmark value={false} />;
