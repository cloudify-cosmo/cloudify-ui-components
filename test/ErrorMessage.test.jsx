import React from 'react';
import { shallow, mount } from 'enzyme';
import { Message } from 'semantic-ui-react';
import ErrorMessage from '../src/components/elements/ErrorMessage';

describe('<ErrorMessage />', () => {
    it("doesn't render if error empty", () => {
        const wrapper = shallow(<ErrorMessage />);

        expect(wrapper.find(Message).exists()).toEqual(false);
    });

    it('renders if error not empty', () => {
        const wrapper = mount(<ErrorMessage error="test" />);
        expect(wrapper.exists()).toEqual(true);
    });

    it('renders classname', () => {
        const wrapper = mount(<ErrorMessage error="test" className="testClassName" />);
        expect(wrapper.find(Message).get(0).props.className).toEqual('testClassName');
    });

    it('renders header name', () => {
        const wrapper = mount(<ErrorMessage error="test" header="test header" />);
        expect(wrapper.find(Message.Header).get(0).props.children).toEqual('test header');
    });

    it('checks if message dismissal works', () => {
        const wrapper = mount(<ErrorMessage error="test" />);
        const onDismissCallback = jest.fn();
        wrapper.setProps({ onDismiss: onDismissCallback });
        wrapper
            .find('i.close.icon')
            .first()
            .simulate('click', 1);
        expect(onDismissCallback).toHaveBeenCalled();
    });
});
