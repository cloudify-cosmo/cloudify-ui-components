import React from 'react';
import { mount } from 'enzyme';
import Checkmark from '../src/components/Checkmark/Checkmark';

describe('Checkmark', () => {
    let wrapper = mount(<Checkmark value />);

    test('renders properly', () => {
        expect(wrapper).toBeDefined();
    });

    test('shows checkmark icon for true value', () => {
        expect(wrapper.find('i.checkmark.icon').exists()).toBeTruthy();
    });

    test('shows square icon for false value', () => {
        wrapper = mount(<Checkmark value={false} />);
        expect(wrapper.find('i.square.outline.icon').exists()).toBeTruthy();
    });
});
