import React from 'react';
import { mount } from 'enzyme';

import Pagination from '../src/components/data/common/Pagination';

describe('<Pagination />', () => {
    it('renders default page size', () => {
        const fetchDataMock = jest.fn();
        const wrapper = mount(
            <Pagination fetchData={fetchDataMock} pageSize={25}>
                <div />
            </Pagination>
        );
        wrapper.setProps({ totalSize: 10 });
        wrapper.setProps({ pageSize: 5 });

        expect(
            wrapper
                .find('.gridPagination .dropdown .text')
                .first()
                .text()
        ).toEqual('5');
        expect(
            wrapper
                .find('div.gridPagination')
                .childAt(0)
                .text()
        ).toEqual('Page size: 5510152550  1 to 5 of 10 entries');
    });

    it('allows changing page size', () => {
        const fetchDataMock = jest.fn();
        const wrapper = mount(
            <Pagination fetchData={fetchDataMock} pageSize={25} totalSize={100}>
                <div />
            </Pagination>
        );

        expect(wrapper.state()).toEqual({
            currentPage: 1,
            pageSize: 25,
            showWarningPopup: false
        });

        wrapper.find('DropdownSearchInput').simulate('click');
        wrapper
            .find('DropdownItem')
            .filterWhere(item => item.prop('value') === 10)
            .simulate('click');

        expect(wrapper.state()).toEqual({
            currentPage: 1,
            pageSize: 10,
            showWarningPopup: false
        });
        expect(fetchDataMock).toHaveBeenCalledTimes(1);
        expect(fetchDataMock).toHaveBeenCalledWith();
        expect(
            wrapper
                .find('.gridPagination .dropdown .text')
                .first()
                .text()
        ).toEqual('10');
    });

    it('is shown/hidden depending on total size', () => {
        const wrapper = mount(
            <Pagination fetchData={() => {}} pageSize={5} totalSize={5}>
                <div />
            </Pagination>
        );
        expect(wrapper.find('.gridPagination').exists()).toEqual(false);

        wrapper.setProps({ totalSize: 7 });
        expect(wrapper.find('.gridPagination').exists()).toEqual(true);
    });

    it('shows page links and navigation buttons according to page size and total size', () => {
        const wrapper = mount(
            <Pagination fetchData={() => {}} pageSize={5} totalSize={25}>
                <div />
            </Pagination>
        );
        const pagination = wrapper.find('.pagination');

        const firstPage = pagination.childAt(0).find('Icon');
        expect(firstPage.prop('name')).toEqual('angle double left');
        const prevPage = pagination.childAt(1).find('Icon');
        expect(prevPage.prop('name')).toEqual('angle left');

        const page1 = pagination.childAt(2);
        expect(page1.prop('active')).toEqual(true);
        expect(page1.text()).toEqual('1');

        const page6 = pagination.childAt(6);
        expect(page6.text()).toEqual('5');

        const nextPage = pagination.childAt(7).find('Icon');
        expect(nextPage.prop('name')).toEqual('angle right');
        const lastPage = pagination.childAt(8).find('Icon');
        expect(lastPage.prop('name')).toEqual('angle double right');
    });

    it('shows page links and navigation buttons when number of pages is big', () => {
        const wrapper = mount(
            <Pagination fetchData={() => {}} pageSize={5} totalSize={36}>
                <div />
            </Pagination>
        );

        const pagination = wrapper.find('.pagination');

        const firstPage = pagination.childAt(0).find('Icon');
        expect(firstPage.prop('name')).toEqual('angle double left');
        const prevPage = pagination.childAt(1).find('Icon');
        expect(prevPage.prop('name')).toEqual('angle left');

        const page1 = pagination.childAt(2);
        expect(page1.prop('active')).toEqual(true);
        expect(page1.text()).toEqual('1');

        const page5 = pagination.childAt(5).find('Icon');
        expect(page5.prop('name')).toEqual('ellipsis horizontal');

        const page6 = pagination.childAt(6);
        expect(page6.text()).toEqual('8');

        const nextPage = pagination.childAt(7).find('Icon');
        expect(nextPage.prop('name')).toEqual('angle right');
        const lastPage = pagination.childAt(8).find('Icon');
        expect(lastPage.prop('name')).toEqual('angle double right');
    });

    it('allows changing page by page link', () => {
        const fetchDataMock = jest.fn();
        const wrapper = mount(
            <Pagination fetchData={fetchDataMock} pageSize={5} totalSize={100}>
                <div />
            </Pagination>
        );
        expect(wrapper.state()).toEqual({
            currentPage: 1,
            pageSize: 5,
            showWarningPopup: false
        });

        const pagination = wrapper.find('.pagination');
        pagination.childAt(3).simulate('click');

        expect(fetchDataMock).toHaveBeenCalledTimes(1);
        expect(fetchDataMock).toHaveBeenCalledWith();
        expect(wrapper.state()).toEqual({
            currentPage: 2,
            pageSize: 5,
            showWarningPopup: false
        });
    });

    it('allows changing pages by arrows', () => {
        const fetchDataMock = jest.fn();
        const wrapper = mount(
            <Pagination fetchData={fetchDataMock} pageSize={5} totalSize={100}>
                <div />
            </Pagination>
        );
        expect(wrapper.state()).toEqual({
            currentPage: 1,
            pageSize: 5,
            showWarningPopup: false
        });

        const pagination = wrapper.find('.pagination');

        pagination
            .find('PaginationItem')
            .filterWhere(item => item.prop('type') === 'nextItem')
            .simulate('click');

        expect(fetchDataMock).toHaveBeenCalledTimes(1);
        expect(fetchDataMock).toHaveBeenCalledWith();
        expect(wrapper.state()).toEqual({
            currentPage: 2,
            pageSize: 5,
            showWarningPopup: false
        });

        pagination
            .find('PaginationItem')
            .filterWhere(item => item.prop('type') === 'prevItem')
            .simulate('click');

        expect(fetchDataMock).toHaveBeenCalledTimes(2);
        expect(fetchDataMock).toHaveBeenCalledWith();
        expect(wrapper.state()).toEqual({
            currentPage: 1,
            pageSize: 5,
            showWarningPopup: false
        });
    });

    it('handles invalid page size', () => {
        const fetchDataMock = jest.fn();
        const wrapper = mount(
            <Pagination fetchData={fetchDataMock} pageSize={5} totalSize={100}>
                <div />
            </Pagination>
        );
        expect(wrapper.state().showWarningPopup).toEqual(false);

        wrapper.find('PaginationInfo').prop('onPageSizeChange')('invalid');

        expect(wrapper.state().showWarningPopup).toEqual(true);
    });
});
