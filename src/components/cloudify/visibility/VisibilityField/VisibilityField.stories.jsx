import React, { useState } from 'react';
import VisibilityField from './VisibilityField';

export default {
    title: 'Cloudify/VisibilityField',
    component: VisibilityField
};

// FIXME: When https://github.com/storybookjs/storybook/issues/8177 is solved, remove this wrapper and render component with hooks directly in the story export
function VisibilityFieldWithHook(props) {
    const [visibility, setVisibility] = useState('private');
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <VisibilityField visibility={visibility} onVisibilityChange={setVisibility} {...props} />;
}

export const unchangeable = () => <VisibilityField visibility="global" allowChange={false} />;
export const changeable = () => <VisibilityFieldWithHook />;
export const disallowGlobal = () => <VisibilityFieldWithHook disallowGlobal />;
