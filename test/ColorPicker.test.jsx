import React from 'react';
import { mount } from 'enzyme';
import ColorPicker from '../src/components/form/ColorPicker';

describe('<ColorPicker />', () => {
    it('renders with value set', () => {
        const wrapper = mount(<ColorPicker value="#4d4d4d" />);
        expect(wrapper.find('input[value="#4D4D4D"]').exists()).toEqual(true);
    });

    it('calls change callback with proper values', () => {
        const onChangeCallback = jest.fn();
        const wrapper = mount(<ColorPicker name="picker" onChange={onChangeCallback} />);
        wrapper.find('div[title="#4D4D4D"]').simulate('click');
        expect(onChangeCallback).toHaveBeenCalledWith(expect.any(Object), { name: 'picker', value: '#4d4d4d' });
    });
});
