import React from 'react';
import { mount } from 'enzyme';
import TimeInput from '../src/components/form/TimeInput';

describe('<TimeInput />', () => {
    it('renders', () => {
        const wrapper = mount(<TimeInput name="time" value="00:00" onChange={() => {}} />);
        expect(wrapper.exists()).toEqual(true);
    });

    it('allows changing hours', () => {
        const onChangeMock = jest.fn();
        const wrapper = mount(<TimeInput name="time" value="00:00" onChange={onChangeMock} />);

        wrapper
            .find('Dropdown')
            .filterWhere(dropdown => dropdown.prop('name') === 'hours')
            .prop('onChange')({}, { value: '15' });

        expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object), {
            name: 'time',
            value: '15:00'
        });
    });

    it('allows changing minutes', () => {
        const onChangeMock = jest.fn();
        const wrapper = mount(<TimeInput name="time" value="00:00" onChange={onChangeMock} />);

        wrapper
            .find('Dropdown')
            .filterWhere(dropdown => dropdown.prop('name') === 'minutes')
            .prop('onChange')({}, { value: '15' });

        expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object), {
            name: 'time',
            value: '00:15'
        });
    });
});
