import React from 'react';
import { mount } from 'enzyme';
import PopupMenu from '../src/components/popups/PopupMenu';
import Menu from '../src/components/elements/Menu';

describe('<PopupMenu />', () => {
    it('allows to open menu (no help)', () => {
        const wrapper = mount(
            <PopupMenu>
                <Menu pointing vertical>
                    <Menu.Item icon="users" content="Edit group's users" name="users" onClick={() => {}} />
                    <Menu.Item icon="user" content="Edit group's tenants" name="tenants" onClick={() => {}} />
                    <Menu.Item icon="trash" content="Delete" name="delete" onClick={() => {}} />
                </Menu>
            </PopupMenu>
        );

        // Click on popup trigger button
        wrapper.find('i.content').first().simulate('click');
        expect(wrapper.find('Popup').first().prop('open')).toEqual(true);
    });

    it('allows to open menu (with help)', () => {
        const wrapper = mount(
            <PopupMenu help="User options">
                <Menu pointing vertical>
                    <Menu.Item icon="users" content="Edit group's users" name="users" onClick={() => {}} />
                    <Menu.Item icon="user" content="Edit group's tenants" name="tenants" onClick={() => {}} />
                    <Menu.Item icon="trash" content="Delete" name="delete" onClick={() => {}} />
                </Menu>
            </PopupMenu>
        );

        // Click on popup trigger button
        wrapper.find('span').first().simulate('click');
        expect(wrapper.find('Popup').first().prop('open')).toEqual(true);
    });

    it('allows to close menu', () => {
        const wrapper = mount(
            <PopupMenu>
                <Menu pointing vertical>
                    <Menu.Item icon="users" content="Edit group's users" name="users" onClick={() => {}} />
                    <Menu.Item icon="user" content="Edit group's tenants" name="tenants" onClick={() => {}} />
                    <Menu.Item icon="trash" content="Delete" name="delete" onClick={() => {}} />
                </Menu>
            </PopupMenu>
        );
        wrapper.find('i.content').first().simulate('click');

        // Click inside the Popup component on first option to close popup
        wrapper.find('MenuItem').first().simulate('click');
        expect(wrapper.find('Popup').first().prop('open')).toEqual(false);
    });

    it('allows to click menu item', () => {
        const usersOptionClickFn = jest.fn();
        const wrapper = mount(
            <PopupMenu>
                <Menu pointing vertical>
                    <Menu.Item icon="users" content="Edit group's users" name="users" onClick={usersOptionClickFn} />
                    <Menu.Item icon="user" content="Edit group's tenants" name="tenants" onClick={() => {}} />
                    <Menu.Item icon="trash" content="Delete" name="delete" onClick={() => {}} />
                </Menu>
            </PopupMenu>
        );

        // Click on popup trigger button
        wrapper.find('i.content').first().simulate('click');

        // Click menu option
        wrapper.find('a[option-value="users"]').first().simulate('click');
        expect(usersOptionClickFn).toHaveBeenCalled();
    });
});
