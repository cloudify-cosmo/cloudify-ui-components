import React from 'react';

import Menu from 'components/elements/Menu';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import PopupMenu from './PopupMenu';

export default {
    title: 'Popups/PopupMenu',
    component: PopupMenu,
    decorators: [LiveEditDecorator({ PopupMenu })]
};

export const basic = () => (
    <PopupMenu>
        <Menu pointing vertical>
            <Menu.Item icon="users" content="Edit group's users" name="users" onClick={() => {}} />
            <Menu.Item icon="user" content="Edit group's tenants" name="tenants" onClick={() => {}} />
            <Menu.Item icon="trash" content="Delete" name="delete" onClick={() => {}} />
        </Menu>
    </PopupMenu>
);
basic.story = {
    name: 'Default'
};

export const helpPopup = () => (
    <PopupMenu help="Choose your favourite fruit">
        <Menu pointing vertical>
            <Menu.Item content="Orange" name="orange" onClick={() => {}} />
            <Menu.Item content="Apple" name="apple" onClick={() => {}} />
            <Menu.Item content="Cherry" name="cherry" onClick={() => {}} />
        </Menu>
    </PopupMenu>
);

export const customIcon = () => (
    <PopupMenu icon="arrow down" bordered>
        <Menu pointing vertical>
            <Menu.Item content="Orange" name="orange" onClick={() => {}} />
            <Menu.Item content="Apple" name="apple" onClick={() => {}} />
            <Menu.Item content="Cherry" name="cherry" onClick={() => {}} />
        </Menu>
    </PopupMenu>
);
export const customPosition = () => (
    <PopupMenu position="top center" offset={0}>
        <Menu pointing vertical>
            <Menu.Item content="Orange" name="orange" onClick={() => {}} />
            <Menu.Item content="Apple" name="apple" onClick={() => {}} />
            <Menu.Item content="Cherry" name="cherry" onClick={() => {}} />
        </Menu>
    </PopupMenu>
);
export const initiallyOpen = () => (
    <div style={{ paddingBottom: 120 }}>
        <PopupMenu defaultOpen>
            <Menu pointing vertical>
                <Menu.Item icon="users" content="Edit group's users" />
                <Menu.Item icon="user" content="Edit group's tenants" />
                <Menu.Item icon="trash" content="Delete" />
            </Menu>
        </PopupMenu>
    </div>
);
