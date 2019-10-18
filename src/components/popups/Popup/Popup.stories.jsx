import React from 'react';
import Popup from './Popup';

export default {
    title: 'Popups/Popup',
    component: Popup
};
export const basic = () => (
    <Popup>
        <Popup.Trigger>
            <span>Hover over me to see popup</span>
        </Popup.Trigger>
        <Popup.Header>Popup header</Popup.Header>
        <Popup.Content>This is the popup content</Popup.Content>
    </Popup>
);
basic.story = {
    name: 'Default'
};
