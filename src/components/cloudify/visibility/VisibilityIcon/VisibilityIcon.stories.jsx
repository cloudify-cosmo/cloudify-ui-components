import React from 'react';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import VisibilityIcon from './VisibilityIcon';

export default {
    title: 'Cloudify/VisibilityIcon',
    component: VisibilityIcon,
    decorators: [LiveEditDecorator({ VisibilityIcon })]
};
export const unknownVisibility = () => <VisibilityIcon />;
export const privateVisibility = () => <VisibilityIcon visibility="private" />;
export const tenantVisibility = () => <VisibilityIcon visibility="tenant" />;
export const globalVisibility = () => <VisibilityIcon visibility="global" />;
export const invalidVisibility = () => <VisibilityIcon visibility="AAARGH!" />;
