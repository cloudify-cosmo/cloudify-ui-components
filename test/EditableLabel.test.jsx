import React from 'react';
import { shallow } from 'enzyme';
import EditableLabel from '../src/components/elements/EditableLabel';

describe('<EditableLabel />', () => {
    describe('in edit mode', () => {
        it('renders', () => {
            const wrapper = shallow(<EditableLabel text="Text" isEditEnable placeholder="Enter something" />);
            expect(wrapper.exists()).toEqual(true);
        });

        it('renders label when in edit mode', () => {
            const wrapper = shallow(<EditableLabel text="Text" isEditEnable placeholder="Enter something" />);
            expect(wrapper.exists('label')).toEqual(true);
        });

        it('shows text properly', () => {
            const wrapper = shallow(<EditableLabel text="Text" isEditEnable placeholder="Enter something" />);
            expect(wrapper.find('label').text()).toEqual('Text');
            expect(wrapper.find('label').hasClass('editPlaceholder')).toEqual(false);
        });

        it('shows placeholder if text is empty (in edit mode)', () => {
            const emptyWrapper = shallow(<EditableLabel isEditEnable placeholder="Enter something" />);
            expect(emptyWrapper.find('label').text()).toEqual('Enter something');
            expect(emptyWrapper.find('label').hasClass('editPlaceholder')).toEqual(true);
        });

        it('allows to edit text', () => {
            const editDoneCallback = jest.fn();
            const wrapper = shallow(
                <EditableLabel isEditEnable placeholder="Enter something" onEditDone={editDoneCallback} />
            );

            // Click on label
            wrapper
                .find('label')
                .first()
                .simulate('click', { stopPropagation: () => {} });
            expect(wrapper.exists('label')).toEqual(false);
            expect(wrapper.exists('input')).toEqual(true);

            // Click on input
            wrapper
                .find('input')
                .first()
                .simulate('click', { stopPropagation: () => {} });
            expect(wrapper.exists('label')).toEqual(false);
            expect(wrapper.exists('input')).toEqual(true);

            // Write something
            wrapper
                .find('input')
                .first()
                .simulate('keydown', { key: 'X' });
            expect(editDoneCallback).not.toHaveBeenCalled();
            wrapper
                .find('input')
                .first()
                .simulate('keydown', { key: 'Y' });
            expect(editDoneCallback).not.toHaveBeenCalled();

            // Enter key press
            wrapper
                .find('input')
                .first()
                .simulate('keypress', { key: 'Enter' });
            expect(editDoneCallback).toHaveBeenCalled();
            expect(wrapper.exists('label')).toEqual(true);
            expect(wrapper.exists('input')).toEqual(false);
        });
    });

    describe('in non edit mode', () => {
        it('renders', () => {
            const wrapper = shallow(<EditableLabel text="Text" isEditEnable={false} placeholder="Enter something" />);
            expect(wrapper.exists()).toEqual(true);
        });

        it('shows text properly', () => {
            const wrapper = shallow(<EditableLabel text="Text" isEditEnable={false} placeholder="Enter something" />);
            expect(wrapper.find('label').text()).toEqual('Text');
        });

        it('shows empty string text is empty', () => {
            const emptyWrapper = shallow(<EditableLabel isEditEnable={false} placeholder="Enter something" />);
            expect(emptyWrapper.find('label').text()).toEqual('');
        });

        it('does not allow to edit text', () => {
            const wrapper = shallow(<EditableLabel isEditEnable={false} placeholder="Enter something" />);
            wrapper
                .find('label')
                .first()
                .simulate('click', { stopPropagation: () => {} });

            expect(wrapper.exists('label')).toEqual(true);
            expect(wrapper.exists('input')).toEqual(false);
        });
    });
});
