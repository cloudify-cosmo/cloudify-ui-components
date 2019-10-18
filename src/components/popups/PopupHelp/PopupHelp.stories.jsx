import React from 'react';
import PopupHelp from './PopupHelp';

export default {
    title: 'Popups/PopupHelp',
    component: PopupHelp
};
export const basic = () => <PopupHelp content="Help information" />;
basic.story = {
    name: 'Default'
};
export const customHeader = () => <PopupHelp header="Types" content="We recognize string, integer and object types." />;
export const customTrigger = () => (
    <PopupHelp trigger={<span>Show Help</span>} content="Select the color from the list." />
);
