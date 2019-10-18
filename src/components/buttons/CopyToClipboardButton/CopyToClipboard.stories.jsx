import React from 'react';
import CopyToClipboardButton from './CopyToClipboardButton';

export default {
    title: 'Buttons/CopyToClipboardButton',
    component: CopyToClipboardButton
};
export const basic = () => <CopyToClipboardButton />;
basic.story = {
    name: 'Default'
};
export const custom = () => <CopyToClipboardButton text="Text to copy" content="Copy ID" />;
custom.story = {
    name: 'Custom content'
};
