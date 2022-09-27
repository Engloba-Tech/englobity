import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import React from 'react';

import { useWarningIconStyles } from './warningIcon.styles';

export function WarningIcon() {
  const classes = useWarningIconStyles();

  return (
    <PriorityHighIcon className={classes.warning} />
  );
}
