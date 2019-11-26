import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import Menu from './Menu';

export default {
    title: 'Elements/Menu',
    component: Menu,
    decorators: [LiveEditDecorator({ Menu })]
};

export const example = () => (
    <Menu vertical>
        <Menu.Item>
            <Menu.Header>Products</Menu.Header>
            <Menu.Menu>
                <Menu.Item name="enterprise" onClick={() => {}} />
                <Menu.Item name="consumer" onClick={() => {}} />
            </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
            <Menu.Header>CMS Solutions</Menu.Header>
            <Menu.Menu>
                <Menu.Item name="rails" onClick={() => {}} />
                <Menu.Item name="python" onClick={() => {}} />
                <Menu.Item name="php" onClick={() => {}} />
            </Menu.Menu>
        </Menu.Item>
    </Menu>
);
