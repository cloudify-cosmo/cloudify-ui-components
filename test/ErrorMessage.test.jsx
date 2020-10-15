import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

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

    it('allows to dismiss error message', () => {
        const onDismissCallback = jest.fn();
        const wrapper = mount(<ErrorMessage error="test" onDismiss={onDismissCallback} />);

        wrapper.find('i.close.icon').first().simulate('click', 1);

        expect(onDismissCallback).toHaveBeenCalled();
    });

    it('allows setting auto-hiding after some period of time', () => {
        jest.useFakeTimers();
        const onDismissCallback = jest.fn();
        act(() => {
            mount(<ErrorMessage autoHide error="test" onDismiss={onDismissCallback} />);
        });

        expect(onDismissCallback).not.toHaveBeenCalled();
        act(() => {
            jest.runAllTimers();
        });
        expect(onDismissCallback).toHaveBeenCalled();
    });
});
