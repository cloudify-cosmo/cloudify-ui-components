import React from 'react';
import PopupConfirm from './PopupConfirm';

export default {
    title: 'Popups/PopupConfirm',
    component: PopupConfirm
};
export const basic = () => <PopupConfirm trigger={<button type="button">Delete</button>} content="Delete this file?" />;
basic.story = {
    name: 'Default'
};
export const noCancelButton = () => (
    <PopupConfirm trigger={<button type="button">Delete</button>} onCanConfirm={() => 'Delete this file?'} />
);
