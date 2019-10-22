import React, { useState } from 'react';
import ResourceVisibility from './ResourceVisibility';

export default {
    title: 'Cloudify/ResourceVisibility',
    component: ResourceVisibility
};

// // FIXME: When https://github.com/storybookjs/storybook/issues/8177 is solved, remove this wrapper and render component with hooks directly in the story export
function ResourceVisibilityWithHook() {
    const [visibility, setVisibility] = useState('private');
    // eslint-disable-next-line react/jsx-props-no-spreading
    return (
        <ResourceVisibility
            visibility={visibility}
            onSetVisibility={setVisibility}
            allowedSettingTo={['tenant', 'global']}
        />
    );
}
export const unchangeable = () => <ResourceVisibility visibility="tenant" />;
export const changeable = () => <ResourceVisibilityWithHook />;
