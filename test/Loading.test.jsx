import React from 'react';
import { mount } from 'enzyme';
import Loading from '../src/components/Loading/Loading';

describe('Loading', () => {
    let wrapper = mount(<Loading />);

    test('renders properly', () => {
        expect(wrapper).toBeDefined();
    });

    test('shows loading spinner with default message', () => {
        expect(wrapper.find('.ui.active.transition.visible.inverted.dimmer').exists()).toBeTruthy();
        expect(wrapper.find('.ui.text.loader').text()).toEqual('Loading');
    });

    test('shows square icon for false value', () => {
        wrapper = mount(<Loading message="Loading files" />);
        expect(wrapper.find('.ui.active.transition.visible.inverted.dimmer').exists()).toBeTruthy();
        expect(wrapper.find('.ui.text.loader').text()).toEqual('Loading files');
    });
});
