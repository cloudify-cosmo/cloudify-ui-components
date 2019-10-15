import React from 'react';

import Checkmark from './Checkmark';

export default {
    title: 'Checkmark',
    component: Checkmark
};
export const basic = () => <Checkmark />;
basic.story = {
    name: 'Default'
};
export const checked = () => <Checkmark value />;
export const unchecked = () => <Checkmark value={false} />;
