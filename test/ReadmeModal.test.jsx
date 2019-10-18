import React from 'react';
import { mount } from 'enzyme';
import ReadmeModal from '../src/components/modal/ReadmeModal';

describe('<ReadmeModal />', () => {
    it('renders', () => {
        const wrapper = mount(<ReadmeModal content="<p>Some paragraph</p>" open={false} onHide={() => {}} />);
        expect(wrapper.exists()).toEqual(true);
        expect(wrapper.exists('readmeModal')).toEqual(false);
    });

    it('shows up', () => {
        const wrapper = mount(<ReadmeModal content="<p>Some paragraph</p>" open onHide={() => {}} />);
        expect(wrapper.exists()).toEqual(true);
        expect(wrapper.exists('.readmeModal')).toEqual(true);
    });

    it('handles close icon click', () => {
        const cancelCallback = jest.fn();
        const wrapper = mount(<ReadmeModal content="<p>Some paragraph</p>" open onHide={cancelCallback} />);
        wrapper.find('.readmeModal i.close.icon').simulate('click');
        expect(cancelCallback).toHaveBeenCalled();
    });
});
