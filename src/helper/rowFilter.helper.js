function getFilteredRows(initialRows, filters) {
  if (!Object.keys(filters).length) {
    return initialRows;
  }

  const filterFields = Object.keys(filters);
  let filteredRows = [...initialRows];

  filterFields.forEach(field => {
    filteredRows = filteredRows.filter(row => {
      if (!row[field]) {
        return false;
      }
      if (row[field].props) {
        return row[field].props.value.toString().replace('.', ',').includes(filters[field]);
      } else if (filters[field]) {
        return row[field].toString().toLowerCase().includes(filters[field].toLowerCase());
      }
      return false;
    });
  });

  return filteredRows;
}

export const rowFilterHelper = {
  getFilteredRows
};
