import React from 'react';
import { mount } from 'enzyme';
import MessageContainer from '../src/components/elements/MessageContainer';

describe('<MessageContainer />', () => {
    test('renders properly', () => {
        const wrapper = mount(<MessageContainer>Message</MessageContainer>);
        expect(wrapper.exists()).toEqual(true);
    });

    it('allows to execute custom function on component load', () => {
        const onRender = jest.fn();
        mount(<MessageContainer onRender={onRender}>Message</MessageContainer>);

        expect(onRender).toHaveBeenCalledTimes(1);
    });
});
