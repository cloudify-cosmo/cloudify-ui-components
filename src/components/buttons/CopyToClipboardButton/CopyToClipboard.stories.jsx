import React from 'react';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import CopyToClipboardButton from './CopyToClipboardButton';

export default {
    title: 'Buttons/CopyToClipboardButton',
    component: CopyToClipboardButton,
    decorators: [LiveEditDecorator({ CopyToClipboardButton })]
};
export const basic = () => <CopyToClipboardButton />;
basic.story = {
    name: 'Default'
};
export const custom = () => <CopyToClipboardButton text="Text to copy" content="Copy ID" />;
custom.story = {
    name: 'Custom content'
};
