import React from 'react';
import LiveEditDecorator from 'decorators/LiveEditDecorator';

import VisibilityField from './VisibilityField';

export default {
    title: 'Cloudify/VisibilityField',
    component: VisibilityField,
    decorators: [LiveEditDecorator({ VisibilityField })]
};

export const unchangeable = () => <VisibilityField visibility="global" allowChange={false} />;
export const changeable = () => {
    const [visibility, setVisibility] = React.useState('private');
    return <VisibilityField visibility={visibility} onVisibilityChange={setVisibility} />;
};
export const disallowGlobal = () => {
    const [visibility, setVisibility] = React.useState('private');
    return <VisibilityField visibility={visibility} onVisibilityChange={setVisibility} disallowGlobal />;
};
