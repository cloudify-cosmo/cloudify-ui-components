import React from 'react';
import { mount } from 'enzyme';
import DateInput from '../src/components/form/DateInput';

describe('<DateInput />', () => {
    let dateNowSpy;

    beforeAll(() => {
        dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => new Date(2019, 10, 1).valueOf()); // 2019-11-01 00:00
    });

    afterAll(() => {
        dateNowSpy.mockRestore();
    });

    it('renders', () => {
        const wrapper = mount(<DateInput name="date" value="2019-11-11 11:11" />);
        expect(wrapper.exists()).toEqual(true);
    });

    it('handles date change from picker', () => {
        const onChangeMock = jest.fn();
        const wrapper = mount(<DateInput name="date" value="2019-11-11 11:11" onChange={onChangeMock} />);
        wrapper
            .find('i.calendar.icon')
            .first()
            .simulate('click');
        wrapper
            .find('[aria-label="day-10"]')
            .first()
            .simulate('click'); // 10th Nov
        expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object), { name: 'date', value: '2019-11-10 11:11' });
    });

    it('handles date change from input field', () => {
        const onChangeMock = jest.fn();
        const wrapper = mount(<DateInput name="date" value="2019-11-11 11:11" onChange={onChangeMock} />);
        wrapper.find('input').simulate('change', { target: { value: '2019-12-06 06:06' } });
        expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object), { name: 'date', value: '2019-12-06 06:06' });
    });

    it('handles resetting date to default value', () => {
        const onChangeMock = jest.fn();
        const wrapper = mount(
            <DateInput name="date" value="2019-11-11 11:11" defaultValue="2019-12-12 12:12" onChange={onChangeMock} />
        );
        wrapper
            .find('i.cancel.icon')
            .first()
            .simulate('click');

        expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object), { name: 'date', value: '2019-12-12 12:12' });
    });
});
