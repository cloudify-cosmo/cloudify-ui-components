import React from 'react';
import { mount } from 'enzyme';
import ColorPicker from '../src/components/form/ColorPicker';
import GenericField from '../src/components/form/GenericField';

describe('<GenericField />', () => {
    it('renders default type', () => {
        const wrapper = mount(<GenericField name="test" label="label" />);
        expect(wrapper.exists()).toEqual(true);
    });

    it('renders string type input field', () => {
        const wrapper = mount(<GenericField name="test" type="string" label="label" icon="rocket" value="test" />);

        expect(wrapper.exists('input[name="test"]')).toEqual(true);
        expect(wrapper.exists('input[type="text"]')).toEqual(true);
        expect(wrapper.exists('input[value="test"]')).toEqual(true);
        expect(wrapper.find('.input i').hasClass('rocket')).toEqual(true);
    });

    it('renders password type input field', () => {
        const wrapper = mount(<GenericField name="test" type="password" label="label" icon="key" value="test" />);

        expect(wrapper.exists('input[name="test"]')).toEqual(true);
        expect(wrapper.exists('input[type="password"]')).toEqual(true);
        expect(wrapper.exists('input[value="test"]')).toEqual(true);
        expect(wrapper.find('.input i').hasClass('key')).toEqual(true);
    });

    it('renders number type input field', () => {
        const wrapper = mount(<GenericField name="test" type="number" label="label" value="5" />);

        expect(wrapper.exists('input[name="test"]')).toEqual(true);
        expect(wrapper.exists('input[type="number"]')).toEqual(true);
        expect(wrapper.exists('input[value="5"]')).toEqual(true);
    });

    it('renders boolean type input field', () => {
        const wrapper = mount(<GenericField name="test" type="boolean" label="label" value />);

        expect(wrapper.exists('input[name="test"]')).toEqual(true);
        expect(wrapper.exists('input[type="checkbox"]')).toEqual(true);
        expect(wrapper.exists('input[checked]')).toEqual(true);
    });

    it('renders boolean list type input field', () => {
        const wrapper = mount(<GenericField name="test" type="booleanList" label="label" value />);

        expect(wrapper.find('div[role="option"].selected span').text()).toEqual('true');
        expect(wrapper.exists('div[role="listbox"].multiple')).toEqual(false);
        expect(wrapper.find('div[role="listbox"] div[role="option"]').length).toEqual(2);
        expect(
            wrapper
                .find('div[role="listbox"] div.menu')
                .childAt(0)
                .text()
        ).toEqual('false');
        expect(
            wrapper
                .find('div[role="listbox"] div.menu')
                .childAt(1)
                .text()
        ).toEqual('true');
    });

    it('renders list type input field', () => {
        const wrapper = mount(
            <GenericField
                name="test"
                type="list"
                items={['1', '2', '3']}
                label="label"
                value="2"
                placeholder="placeholder"
            />
        );

        expect(wrapper.find('div[role="option"].selected span').text()).toEqual('2');
        expect(wrapper.exists('div[role="listbox"].multiple')).toEqual(false);
        expect(wrapper.find('div[role="listbox"] div[role="option"]').length).toEqual(3);
        expect(
            wrapper
                .find('div[role="listbox"] div.menu')
                .childAt(1)
                .text()
        ).toEqual('2');

        wrapper.setProps({
            items: [{ value: '1', name: 'one' }, { value: '2', name: 'two' }, { value: '3', name: 'three' }]
        });
        expect(
            wrapper
                .find('div[role="listbox"] div.menu')
                .childAt(1)
                .text()
        ).toEqual('two');
    });

    it('renders multi selection list type input field', () => {
        const wrapper = mount(
            <GenericField
                name="test"
                type="multiSelectList"
                items={['1', '2', '3', { value: '4', name: 'four' }, { value: '5', name: 'five' }]}
                label="label"
                value={['2', '3', '4']}
                placeholder="placeholder"
            />
        );

        expect(wrapper.exists('div[role="listbox"].multiple')).toEqual(true);

        expect(wrapper.find('div[role="listbox"] div[role="option"]').length).toEqual(2);
        expect(
            wrapper
                .find('div[role="listbox"] div.menu')
                .childAt(0)
                .text()
        ).toEqual('1');
        expect(
            wrapper
                .find('div[role="listbox"] div.menu')
                .childAt(1)
                .text()
        ).toEqual('five');

        expect(wrapper.find('a').length).toEqual(3);
        expect(
            wrapper
                .find('a')
                .at(0)
                .text()
        ).toEqual('2');
        expect(
            wrapper
                .find('a')
                .at(1)
                .text()
        ).toEqual('3');
        expect(
            wrapper
                .find('a')
                .at(2)
                .text()
        ).toEqual('four');
    });

    it('renders custom type input field', () => {
        const wrapper = mount(<GenericField name="test" type="custom" label="label" component={ColorPicker} />);
        expect(wrapper.exists('div.compact-picker')).toEqual(true);
    });

    it('handles input value changes', () => {
        const onChangeMock = jest.fn();
        const wrapper = mount(<GenericField name="test" type="string" label="label" onChange={onChangeMock} />);

        wrapper.find('input').simulate('change', { target: { value: 'Test' } });
        expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object), {
            genericType: 'string',
            name: 'test',
            value: 'Test',
            icon: null,
            max: null,
            min: null,
            onChange: expect.any(Function),
            placeholder: '',
            type: 'text'
        });
    });

    it('formatValue function works properly', () => {
        expect(GenericField.formatValue(GenericField.STRING_TYPE, 'test')).toEqual('test');
        expect(GenericField.formatValue(GenericField.MULTI_SELECT_LIST_TYPE, 'a,b,c')).toEqual(['a', 'b', 'c']);
        expect(GenericField.formatValue(GenericField.BOOLEAN_TYPE, true)).toEqual(true);
        expect(GenericField.formatValue(GenericField.BOOLEAN_TYPE, 'true')).toEqual(true);
        expect(GenericField.formatValue(GenericField.BOOLEAN_TYPE, 'false')).toEqual(false);
        expect(GenericField.formatValue(GenericField.BOOLEAN_TYPE, 123)).toEqual(false);
        expect(GenericField.formatValue(GenericField.NUMBER_TYPE, '123')).toEqual(123);
        expect(GenericField.formatValue(GenericField.NUMBER_LIST_TYPE, '123')).toEqual(123);
        expect(GenericField.formatValue(GenericField.NUMBER_EDITABLE_LIST_TYPE, '123')).toEqual(123);
        expect(GenericField.formatValue(GenericField.NUMBER_TYPE, 'a')).toEqual(0);
    });
});
