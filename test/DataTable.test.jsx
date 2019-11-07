import React from 'react';
import { mount } from 'enzyme';

import DataTable from '../src/components/data/DataTable';

describe('<DataTable />', () => {
    const clickRowMock = jest.fn();
    const wrapper = mount(
        <DataTable pageSize={25} sortColumn="col1" sortAscending={false}>
            <DataTable.Column label="Column one" name="col1" width="60%" />
            <DataTable.Column label="Column two" width="40%" />
            <DataTable.Column label="Column three" show={false} />
            {[{ k: 1 }, { k: 2 }, { k: 3, s: true }, { k: 4 }, { k: 5 }].map(item => {
                return (
                    <DataTable.Row key={item.k} selected={item.s} onClick={item.s ? clickRowMock : null}>
                        <DataTable.Data>Data {item.k}.1</DataTable.Data>
                        <DataTable.Data>Data {item.k}.2</DataTable.Data>
                        <DataTable.Data>Data {item.k}.3</DataTable.Data>
                    </DataTable.Row>
                );
            })}
        </DataTable>
    );

    it('renders', () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it('renders data rows', () => {
        wrapper.setProps({ totalSize: 5 });
        expect(wrapper.find('.gridTable tbody tr').length).toEqual(5);
    });

    it('renders selected row', () => {
        expect(wrapper.find('.gridTable tr.active').length).toEqual(1);
        expect(
            wrapper
                .find('.gridTable tr.active')
                .childAt(0)
                .text()
        ).toEqual('Data 3.1');
        expect(
            wrapper
                .find('.gridTable tr.active')
                .childAt(1)
                .text()
        ).toEqual('Data 3.2');
    });

    it('clicks selected row', () => {
        wrapper.find('.gridTable tr.active').simulate('click');
        expect(clickRowMock).toHaveBeenCalledTimes(1);
    });

    it('renders column attributes', () => {
        const col = wrapper.find('.gridTable thead tr').childAt(0);
        expect(col.prop('width')).toEqual('60%');
        expect(col.text()).toEqual('Column one');
    });

    it('disables sort column when no name is provided', () => {
        expect(
            wrapper
                .find('.gridTable thead tr')
                .childAt(1)
                .find('th')
                .prop('className')
        ).toContain('disabled');
    });

    it('sorts column by default props', () => {
        const col = wrapper
            .find('.gridTable thead tr')
            .childAt(0)
            .find('th');
        expect(col.prop('className')).toContain('sorted');
        expect(col.prop('className')).toContain('descending');
    });

    it('hides column', () => {
        expect(wrapper.find('.gridTable th').length).toEqual(2);
        expect(
            wrapper
                .find('.gridTable tbody')
                .childAt(0)
                .find('td').length
        ).toEqual(2);
    });

    it('renders search box', () => {
        wrapper.setProps({ searchable: false });
        expect(wrapper.find('.gridTable i.search').length).toEqual(0);
        wrapper.setProps({ searchable: true });
        expect(wrapper.find('.gridTable i.search').length).toEqual(1);
    });

    it('sorts column on click up/down', done => {
        const fetchDataMock = jest.fn(() => done());
        wrapper.setProps({ fetchData: fetchDataMock });

        wrapper
            .find('.gridTable thead tr')
            .childAt(0)
            .simulate('click');
        expect(fetchDataMock).toHaveBeenCalledTimes(1);
        expect(fetchDataMock).toHaveBeenCalledWith({
            gridParams: { _search: '', currentPage: 1, pageSize: 25, sortAscending: true, sortColumn: 'col1' }
        });

        wrapper
            .find('.gridTable thead tr')
            .childAt(0)
            .simulate('click');
        expect(fetchDataMock).toHaveBeenCalledTimes(2);
        expect(fetchDataMock).toHaveBeenCalledWith({
            gridParams: { _search: '', currentPage: 1, pageSize: 25, sortAscending: false, sortColumn: 'col1' }
        });
    });

    it('renders no data message if empty', () => {
        wrapper.setProps({ totalSize: 0 });

        expect(wrapper.find('.gridTable tr.noDataRow').length).toEqual(1);
        expect(wrapper.find('.gridTable tr.noDataRow td').text()).toEqual('No data available');
        expect(wrapper.find('.gridTable .gridPagination').length).toEqual(0);
    });
});
