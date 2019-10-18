import React from 'react';
import { mount } from 'enzyme';
import Checkmark from '../src/components/elements/Checkmark';

describe('<Checkmark />', () => {
    let wrapper = mount(<Checkmark value />);

    test('renders properly', () => {
        expect(wrapper.exists()).toEqual(true);
    });

    test('shows checkmark icon for true value', () => {
        expect(wrapper.exists('i.checkmark.icon')).toEqual(true);
    });

    test('shows square icon for false value', () => {
        wrapper = mount(<Checkmark value={false} />);
        expect(wrapper.exists('i.square.outline.icon')).toEqual(true);
    });
});
