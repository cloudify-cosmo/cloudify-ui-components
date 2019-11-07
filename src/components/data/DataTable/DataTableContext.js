import { createContext } from 'react';

const DataTableContext = createContext({
    sortColumn: '',
    sortAscending: true,
    setSortColumn: undefined
});

export default DataTableContext;
