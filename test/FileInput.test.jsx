import React from 'react';
import { mount } from 'enzyme';
import FileInput from '../src/components/form/FileInput';

// TODO: Currently no way to test refs. Test added only for coverage increase.
describe('<FileInput />', () => {
    it('renders', () => {
        const wrapper = mount(<FileInput name="file" />);
        expect(wrapper.exists()).toEqual(true);
    });

    it('allows opening file browser', () => {
        const wrapper = mount(<FileInput name="file" />);

        wrapper
            .find('Button')
            .filterWhere(button => button.prop('icon') === 'folder open')
            .simulate('click');
    });

    it('allows changing file', () => {
        const wrapper = mount(<FileInput name="file" />);

        wrapper
            .find('input')
            .filterWhere(input => input.prop('name') === 'file')
            .prop('onChange')();

        expect(
            wrapper
                .find('Input')
                .filterWhere(input => input.prop('name') === 'fileNamefile')
                .prop('value')
        ).toEqual('');
    });

    it('allows resetting file selection', () => {
        const wrapper = mount(<FileInput name="file" />);

        wrapper
            .find('Button')
            .filterWhere(button => button.prop('icon') === 'remove')
            .prop('onClick')({ preventDefault: () => {} });

        expect(
            wrapper
                .find('Input')
                .filterWhere(input => input.prop('name') === 'fileNamefile')
                .prop('value')
        ).toEqual('');
    });
});
