import React from 'react';
import { mount } from 'enzyme';
import ResourceVisibility from '../src/components/cloudify/visibility/ResourceVisibility';

describe('<ResourceVisibility />', () => {
    it('renders', () => {
        const wrapper = mount(<ResourceVisibility />);
        expect(wrapper.exists()).toEqual(true);
    });

    it('allows to change visibility', () => {
        const setVisibility = jest.fn();
        const wrapper = mount(
            <ResourceVisibility
                visibility="private"
                allowedSettingTo={['tenant', 'global']}
                onSetVisibility={setVisibility}
            />
        );

        wrapper.find('VisibilityIcon').simulate('click');
        expect(
            wrapper
                .find('Popup')
                .first()
                .props().open
        ).toEqual(true);

        // Click on Tenant button
        wrapper.find('button.green').simulate('click');
        expect(
            wrapper
                .find('Confirm')
                .first()
                .props().open
        ).toEqual(true);

        // Click on Yes button
        wrapper.find('button.ui.primary').simulate('click');
        expect(setVisibility).toHaveBeenCalledWith('tenant');
    });

    it('allows to cancel changing visibility', () => {
        const setVisibility = jest.fn();
        const wrapper = mount(
            <ResourceVisibility
                visibility="private"
                allowedSettingTo={['tenant', 'global']}
                onSetVisibility={setVisibility}
            />
        );

        wrapper.find('VisibilityIcon').simulate('click');
        expect(
            wrapper
                .find('Popup')
                .first()
                .props().open
        ).toEqual(true);

        // Click on Global button
        wrapper.find('button.blue').simulate('click');
        expect(
            wrapper
                .find('Confirm')
                .first()
                .props().open
        ).toEqual(true);

        // Click on No button
        wrapper
            .find('button.ui')
            .first()
            .simulate('click');
        expect(setVisibility).not.toHaveBeenCalled();
    });
});
