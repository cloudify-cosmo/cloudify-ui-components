import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import ResourceVisibility from './ResourceVisibility';

export default {
    title: 'Cloudify/ResourceVisibility',
    component: ResourceVisibility,
    decorators: [LiveEditDecorator({ ResourceVisibility })]
};

export const unchangeable = () => <ResourceVisibility visibility="tenant" />;
export const changeable = () => {
    const [visibility, setVisibility] = React.useState('private');

    return (
        <ResourceVisibility
            visibility={visibility}
            onSetVisibility={setVisibility}
            allowedSettingTo={['tenant', 'global']}
        />
    );
};
