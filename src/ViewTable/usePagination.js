import { useCallback, useEffect, useState } from 'react';
import { execHelper } from '../helper/exec.helper';
import { viewTableFiltersHelper } from './ViewTableFilters';

const ASCENDING_ORDER_KEY = 'asc';
const DESCENDING_ORDER_KEY = 'desc';
const ROWS_PER_PAGE = 10;

// TODO :tests
export function usePagination(cells, onFetchPaginatedData, initialOrderBy, numberRowsPerPage) {
  const [order, setOrder] = useState(ASCENDING_ORDER_KEY);
  const [orderBy, setOrderBy] = useState(initialOrderBy);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(numberRowsPerPage);
  const [filters, setFilters] = useState(viewTableFiltersHelper.mapCellsToFilteredCells(cells));
  const [lastFilters, setLastFilters] = useState({});

  useEffect(() => {
    const filtersToBack = viewTableFiltersHelper.mapAsFilter(filters.filter(f => f.filterValue));
    setLastFilters(filtersToBack);
    const filtersHasChanged = JSON.stringify(lastFilters) !== JSON.stringify(filtersToBack);
    if (filtersHasChanged) {
      setPage(0);
    }
    const paging = { pageIndex: filtersHasChanged ? 0 : page, pageSize: rowsPerPage };
    const sorting = orderBy.property
      ? { orderBy: orderBy.property, orderDesc: orderBy.direction === DESCENDING_ORDER_KEY }
      : { orderBy: orderBy, orderDesc: order === DESCENDING_ORDER_KEY };

    onFetchPaginatedData && onFetchPaginatedData({ paging, sorting, filteredCells: filtersToBack });
  }, [page, rowsPerPage, orderBy, order, filters]);
  // WARN: dont add onFetchData method as depend

  function changeSort(event, property) {
    const newOrder = orderBy === property && order === ASCENDING_ORDER_KEY ? DESCENDING_ORDER_KEY : ASCENDING_ORDER_KEY;
    setOrder(newOrder);
    setOrderBy(property);
  }

  const changeFilter = useCallback((cellName, value) => {
    execHelper.delayed(
      () =>
        setFilters(prevFilters =>
          prevFilters.map(FCells => {
            if (FCells.id === cellName) {
              FCells.filterValue = value;
            }

            return FCells;
          })
        ),
      500
    );
  }, []);

  const resetFilter = useCallback(() => {
    setFilters(prevFilters =>
      prevFilters.map(FCells => {
        FCells.filterValue = null;

        return FCells;
      })
    );
  }, []);

  function changePage(event, newPage) {
    setPage(newPage);
  }

  function changeRows(event) {
    const newRowsPerPage = parseInt(event.target.value, ROWS_PER_PAGE);

    setRowsPerPage(newRowsPerPage);
    setPage(0);
  }

  return { order, orderBy, page, rowsPerPage, changeSort, changePage, changeRows, changeFilter, resetFilter };
}
