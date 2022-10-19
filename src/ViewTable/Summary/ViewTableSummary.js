import { TableCell, TableRow } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import shortid from 'shortid';

export function ViewTableSummary(props) {
  const { classes, headCells, summaryCells, allowRowChecking, allowRowToggling } = props;
  return (
    <TableRow className={classes.summaryRow}>
      {(allowRowChecking || allowRowToggling) && <TableCell key={shortid.generate()}></TableCell>}

      {headCells.map(headCell => {
        return (
          <TableCell key={shortid.generate()} align={headCell.numeric ? 'right' : 'left'}>
            <span className={classes.summaryCell}>{summaryCells[headCell.id] || ''}</span>
          </TableCell>
        );
      })}
    </TableRow>
  );
}

ViewTableSummary.propTypes = {
  classes: PropTypes.object.isRequired,
  summaryCells: PropTypes.object.isRequired,
  headCells: PropTypes.array.isRequired,
  allowRowChecking: PropTypes.bool,
  allowRowToggling: PropTypes.bool,
  actions: PropTypes.array
};
