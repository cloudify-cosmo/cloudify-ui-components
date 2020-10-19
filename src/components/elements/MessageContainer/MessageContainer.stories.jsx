import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import MessageContainer from './MessageContainer';

export default {
    title: 'Elements/MessageContainer',
    component: MessageContainer,
    decorators: [LiveEditDecorator({ MessageContainer })]
};

export const basic = () => <MessageContainer />;
basic.storyName = 'Default';

export const loading = () => <MessageContainer loading>Message</MessageContainer>;

export const small = () => <MessageContainer size="small">Message</MessageContainer>;

export const wide = () => <MessageContainer wide>Message</MessageContainer>;

export const alignedLeft = () => <MessageContainer testAlign="left">Message</MessageContainer>;

export const withMargin = () => <MessageContainer margin={50}>Message</MessageContainer>;
