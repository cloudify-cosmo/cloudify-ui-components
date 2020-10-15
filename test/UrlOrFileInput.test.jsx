import React from 'react';
import { mount } from 'enzyme';
import _ from 'lodash';
import { act } from 'react-dom/test-utils';
import UrlOrFileInput from '../src/components/form/UrlOrFileInput';

describe('<UrlOrFileInput />', () => {
    it('selects a file and resets its state on reset button click', () => {
        let wrapper;
        act(() => {
            wrapper = mount(<UrlOrFileInput onChangeUrl={_.noop} onChangeFile={_.noop} placeholder="" name="test" />);
        });

        expect(wrapper.find('.label').text()).toEqual('URL');

        const name = 'test';
        act(() => wrapper.find('FileInput').prop('onChange')({ name }));

        expect(wrapper.find('.label').text()).toEqual('File');
        expect(wrapper.find('input[type="text"]').instance().value).toEqual(name);

        act(() => {
            wrapper.find('Button').last().props().onClick({ preventDefault: _.noop });
        });

        expect(wrapper.find('.label').text()).toEqual('URL');
        expect(wrapper.find('input[type="text"]').instance().value).toEqual('');
    });
});
