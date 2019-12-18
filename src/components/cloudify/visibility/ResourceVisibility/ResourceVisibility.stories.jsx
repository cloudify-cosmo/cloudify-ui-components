import React from 'react';
import StoryWithHooks from 'decorators/StoryWithHooks';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import ResourceVisibility from './ResourceVisibility';

export default {
    title: 'Cloudify/ResourceVisibility',
    component: ResourceVisibility,
    decorators: [LiveEditDecorator({ ResourceVisibility })]
};

export const unchangeable = () => <ResourceVisibility visibility="tenant" />;
export const changeable = StoryWithHooks(() => {
    const [visibility, setVisibility] = React.useState('private');

    return (
        <ResourceVisibility
            visibility={visibility}
            onSetVisibility={setVisibility}
            allowedSettingTo={['tenant', 'global']}
        />
    );
});
