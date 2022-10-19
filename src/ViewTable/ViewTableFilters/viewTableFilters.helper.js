import { FILTER_TYPE, FILTER_SUFFIX } from './viewTableFilters.const';

function mapAsFilter(filteredCells) {
  let filters = {};

  filteredCells.forEach(cell => {
    if (cell.filterValue) {
      filters[cell.id] = cell.filterValue;
    }
  });

  return filters;
}

function mapCellsToFilteredCells(cells) {
  let filteredCells = [];

  cells.forEach(cell => {
    if (cell.filterType === FILTER_TYPE.DATE) {
      filteredCells.push({ ...cell, id: cell.id + FILTER_SUFFIX.START });
      filteredCells.push({ ...cell, id: cell.id + FILTER_SUFFIX.END });
    } else {
      filteredCells.push(cell.filterBy ? {...cell, id: cell.filterBy} : cell);
    }
  });

  return filteredCells;
}

export const viewTableFiltersHelper = { mapAsFilter, mapCellsToFilteredCells };
