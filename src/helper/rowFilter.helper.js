function getFilteredRows(initialRows, filters) {
  if (!Object.keys(filters).length) {
    return initialRows;
  }
  const filterFields = Object.keys(filters);
  let filteredRows = [...initialRows];
  filterFields.forEach(field => {
    filteredRows = filteredRows.filter(row =>
      row[field].props
        ? row[field].props.value.toString().replace('.', ',').includes(filters[field])
        : filters[field]
        ? row[field].toString().toLowerCase().includes(filters[field].toLowerCase())
        : null
    );
  });
  return filteredRows;
}

export const rowFilterHelper = {
  getFilteredRows
};
