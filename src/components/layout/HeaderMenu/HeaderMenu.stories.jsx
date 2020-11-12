import React from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';

import DivContainer from 'decorators/DivContainer';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import HeaderMenu from './HeaderMenu';

export default {
    title: 'Layout/HeaderMenu',
    component: HeaderMenu,
    decorators: [LiveEditDecorator({ HeaderMenu, Icon, Dropdown, DivContainer })]
};

export const basic = () => (
    <DivContainer height={250}>
        <DivContainer height={30}>
            <HeaderMenu trigger="Options">
                <Dropdown.Item>Option A</Dropdown.Item>
                <Dropdown.Item>Option B</Dropdown.Item>
            </HeaderMenu>
        </DivContainer>
    </DivContainer>
);
basic.storyName = 'Default';

export const customTrigger = () => (
    <DivContainer height={250}>
        <DivContainer height={30}>
            <HeaderMenu
                trigger={
                    <>
                        <Icon name="cogs" /> Options
                    </>
                }
            >
                <Dropdown.Item>Option A</Dropdown.Item>
                <Dropdown.Item>Option B</Dropdown.Item>
            </HeaderMenu>
        </DivContainer>
    </DivContainer>
);
