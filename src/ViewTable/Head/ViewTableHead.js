import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { FILTER_TYPE } from '../ViewTableFilters';

export function ViewTableHead(props) {
  const {
    classes,
    onCheckAllClick,
    order,
    orderBy,
    disableOrderBy,
    numChecked,
    rowCount,
    onRequestSort,
    cells,
    allowRowChecking = true,
    allowRowFilter,
    allowRowToggling,
    onlyOneCheck
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow hover={!disableOrderBy}>
        {allowRowChecking ? (
          <TableCell padding="checkbox">
            {!onlyOneCheck && (
              <Checkbox
                color="primary"
                indeterminate={numChecked > 0 && numChecked < rowCount}
                checked={rowCount > 0 && numChecked === rowCount}
                onChange={onCheckAllClick}
                inputProps={{ 'aria-label': 'select all desserts' }}
              />
            )}
          </TableCell>
        ) : allowRowToggling ? (
          <TableCell padding="checkbox"></TableCell>
        ) : (
          <></>
        )}
        {cells.map(headCell => (
          <TableCell
            className={clsx(
              headCell.filterType === FILTER_TYPE.DATE && classes.cellDate,
              headCell.action && classes.actionCell
            )}
            key={headCell.id}
            align={headCell.formatAsColumn ? 'center' : headCell.numeric ? 'right' : 'left'}
            style={headCell.style && headCell.style}
            sortDirection={
              disableOrderBy || headCell.isSortable === false ? false : orderBy === headCell.id ? order : false
            }
          >
            {headCell.label &&
              (disableOrderBy || headCell.isSortable === false ? (
                <span className={classes.headCell}>{headCell.label}</span>
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  <span className={classes.headCell}>{headCell.label}</span>
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : (
                    <></>
                  )}
                </TableSortLabel>
              ))}
          </TableCell>
        ))}
        {allowRowFilter && !cells.some(cell => cell.action) && <TableCell padding="checkbox" />}
      </TableRow>
    </TableHead>
  );
}

ViewTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  cells: PropTypes.arrayOf(PropTypes.object).isRequired,
  numChecked: PropTypes.number,
  onRequestSort: PropTypes.func.isRequired,
  onCheckAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  rowCount: PropTypes.number.isRequired,
  allowRowChecking: PropTypes.bool,
  disableOrderBy: PropTypes.bool,
  allowRowFilter: PropTypes.bool,
  allowRowToggling: PropTypes.bool,
  onlyOneCheck: PropTypes.bool
};
