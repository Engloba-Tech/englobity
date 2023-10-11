import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Toolbar,
  Tooltip,
  Typography
} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FilterListIcon from '@material-ui/icons/FilterList';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import WarningRounded from '@material-ui/icons/WarningRounded';
import { Rating, Skeleton } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import shortid from 'shortid';

import { color } from '../App/styles/color.styles';
import { skeletonHelper } from '../helper/skeleton.helper';
import { BooleanIcon } from '../Icons/BooleanIcon';
import { InfoSummary } from '../Summary';
import { ViewTableFooter } from './Footer';
import { ViewTableHead } from './Head';
import { ViewTableSummary } from './Summary';
import { usePagination } from './usePagination';
import { getComparator, stableSort } from './viewTable.helper';
import { useViewTableStyles } from './viewTable.styles';
import { ViewTableFilters } from './ViewTableFilters';

export function _viewTable({
  rows,
  cells,
  summaryCells,
  onFetchData,
  serverSidePaging,
  totalRows,
  allowPaging = true,
  defaultOrderBy,
  disableOrderBy,
  onlyRows,
  allowRowFilter = true,
  checkRowWhen,
  allowRowChecking = true,
  onCheckElement,
  isChecked,
  isAnyChecked,
  checkedElementsCount,
  onCheckAllElements,
  allowRowToggling,
  onToggleElement,
  isToggled,
  isVisible,
  emptyText,
  rowsPerPageText,
  checkedElementsCountText,
  checkRowDisabledReason = '',
  displayedRowsText = 'of',
  clearFiltersText = 'Clear filters',
  backIconButtonText = 'Back',
  nextIconButtonText = 'Next',
  dateFromText = 'From',
  dateUntilText = 'Until',
  todayDatePickerLabel = 'Today',
  clearDatePickerLabel = 'Clear',
  cancelDatePickerLabel = 'Cancel',
  okDatePickerLabel = 'Accept',
  onlyOneCheck = false
}) {
  allowPaging = allowPaging && !allowRowToggling;
  allowRowFilter = allowRowFilter && !allowRowToggling && !onlyRows;

  const { order, orderBy, page, rowsPerPage, changeSort, changePage, changeRows, changeFilter, resetFilter } =
    usePagination(cells, onFetchData, defaultOrderBy || (disableOrderBy ? '' : cells[0].id));

  const classes = useViewTableStyles();

  function getVisibleRows(rows) {
    if (allowPaging && serverSidePaging) return rows;

    let sortedRows = disableOrderBy ? rows : stableSort(rows, getComparator(order, orderBy));
    if (allowPaging) {
      sortedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }
    return sortedRows;
  }

  const totalRowCount = serverSidePaging ? totalRows : rows.length;

  const ableSelectRow = element => {
    if (checkRowWhen) {
      return !element.isAccordionHeader && checkRowWhen(element);
    }
    if (element.isAccordionHeader) {
      return false;
    }
    return allowRowChecking;
  };

  useEffect(() => {
    if (page > 0 && !rows.length) changePage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows.length]);

  const renderAction = (action, row) => {
    return (
      (action.component && <Tooltip title={action.title}>{action.component}</Tooltip>) || (
        <TableCell key={shortid.generate()} padding="checkbox"></TableCell>
      )
    );
  };

  return (
    <div className={`${classes.root} viewtable`}>
      <TableContainer className={classes.tableContainer}>
        <Table className={classes.table} stickyHeader>
          {!onlyRows && (
            <ViewTableHead
              classes={classes}
              cells={cells}
              numChecked={checkedElementsCount}
              order={order}
              orderBy={orderBy}
              disableOrderBy={disableOrderBy}
              onCheckAllClick={() =>
                rows.some(row => row.canBeDeleted != null)
                  ? onCheckAllElements(rows?.filter(row => row.canBeDeleted))
                  : onCheckAllElements(rows)
              }
              onRequestSort={changeSort}
              rowCount={totalRowCount}
              allowRowChecking={allowRowChecking}
              allowRowFilter={allowRowFilter}
              allowRowToggling={allowRowToggling}
              onlyOneCheck={onlyOneCheck}
            />
          )}
          {/* Tr can't appear as a child of table BUT if thead is used, when scrolling down
             the list, filters will stick instead of column names*/}
          {allowRowFilter && (
            <TableRow className={classes.filterRow}>
              {allowRowChecking && (
                <TableCell className={classes.filterCell}>
                  <FilterListIcon />
                </TableCell>
              )}

              <ViewTableFilters
                cells={cells}
                onFilterCellChange={changeFilter}
                onFilterClear={resetFilter}
                clearFiltersText={clearFiltersText}
                dateFromText={dateFromText}
                dateUntilText={dateUntilText}
                todayDatePickerLabel={todayDatePickerLabel}
                clearDatePickerLabel={clearDatePickerLabel}
                cancelDatePickerLabel={cancelDatePickerLabel}
                okDatePickerLabel={okDatePickerLabel}
              />
            </TableRow>
          )}

          {!rows.length ? (
            <TableBody>
              <TableRow>
                <TableCell style={{ borderBottom: 'none', background: 'white' }} colSpan="100%">
                  <InfoSummary className={classes.summary} text={emptyText} />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {getVisibleRows(rows).map((row, index) => {
                const isItemChecked = isChecked && isChecked(row);
                const isItemVisible =
                  (isVisible && isVisible(row)) ||
                  (allowRowToggling && isToggled(row)) ||
                  // row.isAccordionHeader ||
                  !allowRowToggling;
                const isItemToggled = (allowRowToggling && isToggled(row)) || !allowRowToggling;
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    // TODO: fix hover is object instead of boolean
                    hover
                    role="checkbox"
                    aria-checked={isItemChecked}
                    tabIndex={-1}
                    key={shortid.generate()}
                    onClick={() => (row.isAccordionHeader ? onToggleElement(row) : undefined)}
                    selected={isItemChecked}
                    style={{
                      height: 53,
                      cursor: row.isAccordionHeader && 'pointer',
                      display: (isItemVisible && 'table-row') || 'none'
                    }}
                  >
                    {!allowRowChecking && !row.isAccordionHeader && allowRowToggling && (
                      <TableCell padding="checkbox"></TableCell>
                    )}

                    {allowRowChecking && !row.isAccordionHeader && (
                      <TableCell padding="checkbox">
                        <Tooltip title={!ableSelectRow(row) ? checkRowDisabledReason : ''} placement={'top'}>
                          <div>
                            <Checkbox
                              onClick={() => onCheckElement(row)}
                              color="primary"
                              disabled={!ableSelectRow(row)}
                              checked={isItemChecked}
                              inputProps={{ 'aria-labelledby': labelId }}
                              style={{
                                marginLeft: row.tabulationLevel ? (row.tabulationLevel === 1 ? '15px' : '30px') : '0px'
                              }}
                            />
                          </div>
                        </Tooltip>
                      </TableCell>
                    )}

                    {row.isAccordionHeader && (
                      <TableCell padding="checkbox">
                        {!isItemToggled ? (
                          <ChevronRightIcon
                            onClick={() => onToggleElement(row)}
                            color="primary"
                            style={{
                              marginLeft: row.tabulationLevel ? (row.tabulationLevel === 1 ? '15px' : '30px') : '0px'
                            }}
                          />
                        ) : (
                          <KeyboardArrowDownIcon
                            onClick={() => onToggleElement(row)}
                            color="primary"
                            style={{
                              marginLeft: row.tabulationLevel ? (row.tabulationLevel === 1 ? '15px' : '30px') : '0px'
                            }}
                          />
                        )}
                      </TableCell>
                    )}

                    {cells.map(cell => {
                      return (
                        <TableCell
                          key={shortid.generate()}
                          align={cell.numeric ? 'right' : cell.formatAsColumn ? 'center' : 'left'}
                          width={cell.formatAsColumn ? '20%' : ''}
                          style={cell.style && cell.style}
                          className={`${cell.ellipsis && classes.ellipsis} ${
                            row.isAccordionHeader && classes.isAccordionHeader
                          } ${Boolean(cell.action && !cell.formatAsColumn) && classes.actionCell} ${
                            cell.numeric && classes.numeric
                          }`}
                        >
                          {cell.additionalProperty &&
                            cell.additionalProperty.beforeParent &&
                            cell.additionalProperty.value(row)}

                          {skeletonHelper.isSkeletonLoading(row[cell.id]) ? (
                            <Skeleton />
                          ) : cell.ellipsis && row[cell.id]?.length > 20 ? (
                            <Tooltip classes={{ tooltip: classes.tooltip }} title={row[cell.id]} placement="top">
                              <span>{row[cell.id]}</span>
                            </Tooltip>
                          ) : cell.rating ? (
                            <Rating value={row[cell.id]} precision={0.5} readOnly />
                          ) : typeof row[cell.id] === 'boolean' ? (
                            // TODO: Smell... remove warning property and refactor with custom control property
                            cell.warning ? (
                              row[cell.id] && (
                                <Tooltip title={cell.warning} placement="top">
                                  <WarningRounded
                                    style={{
                                      color: color.toast.warn,
                                      fontSize: 30
                                    }}
                                  />
                                </Tooltip>
                              )
                            ) : (
                              <BooleanIcon
                                condition={row[cell.id]}
                                trueText={cell.tooltip && cell.tooltip.trueText}
                                falseText={cell.tooltip && cell.tooltip.falseText}
                                tooltipClasses={{ tooltip: classes.tooltip }}
                                showOnlyCheck={cell.showOnlyCheck}
                              />
                            )
                          ) : cell.additionalProperty ? (
                            <div className={classes.verticalAlign}>{row[cell.id]}</div>
                          ) : cell.action ? (
                            renderAction(row[cell.id], row)
                          ) : (
                            row[cell.id]
                          )}

                          {cell.additionalProperty &&
                            cell.additionalProperty.afterParent &&
                            cell.additionalProperty.value(row)}
                        </TableCell>
                      );
                    })}
                    {allowRowFilter && !cells.some(cell => cell.action) && <TableCell />}
                  </TableRow>
                );
              })}
              {summaryCells && cells && (
                <ViewTableSummary
                  classes={classes}
                  allowRowChecking={allowRowChecking}
                  allowRowFilter={allowRowFilter}
                  headCells={cells}
                  summaryCells={summaryCells}
                  allowRowToggling={allowRowToggling}
                />
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <div className={classes.footerWrapper}>
        <div className={classes.wrapper}>
          {isAnyChecked && (
            <Toolbar disableGutters className={`${classes.root} ${classes.selected} ${classes.highlight}`}>
              <Typography color="inherit" variant="subtitle1" component="div">
                {checkedElementsCount} {checkedElementsCountText}
              </Typography>
            </Toolbar>
          )}
          {allowPaging && rows.length > 0 && (
            <TablePagination
              component="div"
              style={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}
              rowsPerPageOptions={[5, 10, 15, 20, 25, 50]}
              count={totalRowCount}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true
              }}
              onPageChange={changePage}
              onRowsPerPageChange={changeRows}
              backIconButtonText={backIconButtonText}
              nextIconButtonText={nextIconButtonText}
              ActionsComponent={ViewTableFooter}
              labelRowsPerPage={rowsPerPageText}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to === -1 ? count : to} ${displayedRowsText} ${count}`
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export const ViewTable = React.memo(_viewTable);
_viewTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  cells: PropTypes.arrayOf(PropTypes.object).isRequired,
  summaryCells: PropTypes.arrayOf(PropTypes.object),
  onFetchData: PropTypes.func,
  serverSidePaging: PropTypes.bool,
  totalRows: PropTypes.number,
  allowPaging: PropTypes.bool,
  defaultOrderBy: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  disableOrderBy: PropTypes.bool,
  onlyRows: PropTypes.bool,
  allowRowFilter: PropTypes.bool,
  checkRowWhen: PropTypes.func,
  checkedElementsCount: PropTypes.number,
  allowRowChecking: PropTypes.bool,
  onCheckElement: PropTypes.func,
  isChecked: PropTypes.func,
  isAnyChecked: PropTypes.bool,
  onCheckAllElements: PropTypes.func,
  checkRowDisabledReason: PropTypes.string,
  allowRowToggling: PropTypes.bool,
  onToggleElement: PropTypes.func,
  isToggled: PropTypes.func,
  isVisible: PropTypes.func,
  emptyText: PropTypes.string,
  rowsPerPageText: PropTypes.string,
  checkedElementsCountText: PropTypes.string,
  displayedRowsText: PropTypes.string,
  clearFiltersText: PropTypes.string,
  backIconButtonText: PropTypes.string,
  nextIconButtonText: PropTypes.string,
  todayDatePickerLabel: PropTypes.string,
  clearDatePickerLabel: PropTypes.string,
  cancelDatePickerLabel: PropTypes.string,
  okDatePickerLabel: PropTypes.string,
  dateFromText: PropTypes.string,
  dateUntilText: PropTypes.string
};
