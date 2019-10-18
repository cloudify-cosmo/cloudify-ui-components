import React from 'react';
import { mount } from 'enzyme';
import Loading from '../src/components/elements/Loading';

describe('<Loading />', () => {
    test('renders properly', () => {
        const wrapper = mount(<Loading />);
        expect(wrapper.exists()).toEqual(true);
    });

    test('shows loading spinner with default message', () => {
        const wrapper = mount(<Loading />);
        expect(wrapper.exists('.ui.active.transition.visible.inverted.dimmer')).toEqual(true);
        expect(wrapper.find('.ui.text.loader').text()).toEqual('Loading');
    });

    test('shows square icon for false value', () => {
        const wrapper = mount(<Loading message="Loading files" />);
        expect(wrapper.exists('.ui.active.transition.visible.inverted.dimmer')).toEqual(true);
        expect(wrapper.find('.ui.text.loader').text()).toEqual('Loading files');
    });
});
