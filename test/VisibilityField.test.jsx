import React from 'react';
import { mount } from 'enzyme';
import VisibilityField from '../src/components/cloudify/visibility/VisibilityField';

describe('<VisibilityField />', () => {
    it('renders', () => {
        const wrapper = mount(<VisibilityField />);
        expect(wrapper.exists()).toEqual(true);
    });

    it('allows to change between all visibility types', () => {
        const setVisibility = jest.fn();
        let wrapper = mount(<VisibilityField allowChange visibility="tenant" onVisibilityChange={setVisibility} />);

        wrapper
            .find('VisibilityField')
            .first()
            .simulate('click');
        expect(setVisibility).toHaveBeenCalledWith('private');

        wrapper = mount(<VisibilityField allowChange visibility="private" onVisibilityChange={setVisibility} />);
        wrapper
            .find('VisibilityField')
            .first()
            .simulate('click');
        expect(setVisibility).toHaveBeenCalledWith('global');

        wrapper = mount(<VisibilityField allowChange visibility="global" onVisibilityChange={setVisibility} />);
        wrapper
            .find('VisibilityField')
            .first()
            .simulate('click');
        expect(setVisibility).toHaveBeenCalledWith('tenant');
    });

    it('allows to change between private and tenant visibility when disallowGlobal is set', () => {
        const setVisibility = jest.fn();
        let wrapper = mount(
            <VisibilityField allowChange disallowGlobal visibility="tenant" onVisibilityChange={setVisibility} />
        );

        wrapper
            .find('VisibilityField')
            .first()
            .simulate('click');
        expect(setVisibility).toHaveBeenCalledWith('private');

        wrapper = mount(
            <VisibilityField allowChange disallowGlobal visibility="private" onVisibilityChange={setVisibility} />
        );
        wrapper
            .find('VisibilityField')
            .first()
            .simulate('click');
        expect(setVisibility).toHaveBeenCalledWith('tenant');
    });
});
