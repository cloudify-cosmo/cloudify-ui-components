import React from 'react';
import { shallow, mount } from 'enzyme';
import EditableLabel from '../src/components/elements/EditableLabel';

describe('<EditableLabel />', () => {
    function expectEditMode(wrapper, editMode = true) {
        expect(wrapper.exists('Label')).toEqual(!editMode);
        expect(wrapper.exists('Input')).toEqual(editMode);
    }

    describe('in edit mode', () => {
        it('renders', () => {
            const wrapper = shallow(<EditableLabel value="Text" enabled placeholder="Enter something" />);
            expect(wrapper.exists()).toEqual(true);
        });

        // eslint-disable-next-line jest/expect-expect
        it('renders Label when in edit mode', () => {
            const wrapper = shallow(<EditableLabel value="Text" enabled placeholder="Enter something" />);
            expectEditMode(wrapper, false);
        });

        it('shows text properly', () => {
            const wrapper = mount(<EditableLabel value="Text" enabled placeholder="Enter something" />);
            expect(wrapper.find('Label').text()).toEqual('Text');
            expect(wrapper.find('Label').hasClass('editPlaceholder')).toEqual(false);
        });

        it('shows placeholder if text is empty (in edit mode)', () => {
            const emptyWrapper = mount(<EditableLabel enabled placeholder="Enter something" />);
            expect(emptyWrapper.find('Label').text()).toEqual('Enter something');
            expect(emptyWrapper.find('Label').hasClass('editPlaceholder')).toEqual(true);
        });

        it('allows to edit text', () => {
            const onChange = jest.fn();
            const wrapper = mount(<EditableLabel enabled placeholder="Enter something" onChange={onChange} />);

            // Click on Label
            wrapper
                .find('Label')
                .first()
                .simulate('click', { stopPropagation: () => {} });
            expectEditMode(wrapper);

            // Write something
            wrapper.find('input').simulate('change', { target: { value: 'XY' } });
            expect(onChange).not.toHaveBeenCalled();

            // Enter key press
            wrapper.find('input').simulate('keydown', { key: 'Enter' });
            expect(onChange).toHaveBeenCalled();
            expectEditMode(wrapper, false);
        });

        it('allows to cancel edit on Esc press', () => {
            const onChange = jest.fn();
            const initialValue = 'initial';
            const wrapper = mount(<EditableLabel enabled value={initialValue} onChange={onChange} />);

            // Click on Label
            wrapper
                .find('Label')
                .first()
                .simulate('click', { stopPropagation: () => {} });
            expectEditMode(wrapper);

            // Write something
            wrapper.find('input').simulate('change', { target: { value: 'XY' } });

            // Enter key press
            wrapper.find('input').simulate('keydown', { key: 'Escape' });
            expect(onChange).not.toHaveBeenCalled();
            expectEditMode(wrapper, false);
            expect(wrapper.find('Label').text()).toEqual(initialValue);
        });
    });

    describe('in non edit mode', () => {
        it('renders', () => {
            const wrapper = shallow(<EditableLabel value="Text" enabled={false} placeholder="Enter something" />);
            expect(wrapper.exists()).toEqual(true);
        });

        it('shows text properly', () => {
            const wrapper = mount(<EditableLabel value="Text" enabled={false} placeholder="Enter something" />);
            expect(wrapper.find('Label').text()).toEqual('Text');
        });

        it('shows empty string text is empty', () => {
            const emptyWrapper = mount(<EditableLabel enabled={false} placeholder="Enter something" />);
            expect(emptyWrapper.find('Label').text()).toEqual('');
        });

        // eslint-disable-next-line jest/expect-expect
        it('does not allow to edit text', () => {
            const wrapper = shallow(<EditableLabel enabled={false} placeholder="Enter something" />);
            wrapper
                .find('Label')
                .first()
                .simulate('click', { stopPropagation: () => {} });

            expectEditMode(wrapper, false);
        });
    });
});
