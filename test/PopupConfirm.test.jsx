import React from 'react';
import { mount } from 'enzyme';
import PopupConfirm from '../src/components/popups/PopupConfirm';

describe('<PopupConfirm />', () => {
    it('renders', () => {
        const wrapper = mount(
            <PopupConfirm trigger={<button type="button">Delete</button>} content="Delete this file?" />
        );
        expect(wrapper.exists()).toEqual(true);
    });

    it('allows to click OK button', () => {
        const confirmCallback = jest.fn();
        const wrapper = mount(
            <PopupConfirm
                trigger={<button type="button">Delete</button>}
                content="Delete this file?"
                onConfirm={confirmCallback}
            />
        );

        // Click on popup trigger button
        expect(wrapper.exists('.popup')).toEqual(false);
        wrapper.find('button').first().simulate('click');
        expect(wrapper.exists('.popup')).toEqual(true);
        expect(wrapper.find('.popup button').length).toEqual(2);

        // Click on OK button input
        wrapper.find('.ui.green.button').simulate('click');
        expect(wrapper.exists('.popup')).toEqual(false);
        expect(confirmCallback).toHaveBeenCalled();
    });

    it('allows to click Cancel button', () => {
        const cancelCallback = jest.fn();
        const wrapper = mount(
            <PopupConfirm
                trigger={<button type="button">Delete</button>}
                content="Delete this file?"
                onCancel={cancelCallback}
            />
        );

        expect(wrapper.exists('.popup')).toEqual(false);
        // Click on popup trigger button
        wrapper.find('button').first().simulate('click');
        expect(wrapper.exists('.popup')).toEqual(true);
        expect(wrapper.find('.popup button').length).toEqual(2);

        // Click on Cancel button input
        wrapper.find('.ui.basic.button').simulate('click');
        expect(wrapper.exists('.popup')).toEqual(false);
        expect(cancelCallback).toHaveBeenCalled();
    });

    it('allows to hide Cancel button', () => {
        const wrapper = mount(
            <PopupConfirm trigger={<button type="button">Delete</button>} onCanConfirm={() => 'Delete this file?'} />
        );

        expect(wrapper.exists('.popup')).toEqual(false);
        // Click on popup trigger button
        wrapper.find('button').first().simulate('click');
        expect(wrapper.exists('.popup')).toEqual(true);
        expect(wrapper.find('.popup button').length).toEqual(1);
    });
});
