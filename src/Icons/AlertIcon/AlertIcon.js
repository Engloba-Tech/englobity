import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import React from 'react';

import { useAlertIconStyles } from './alertIcon.styles';

export function AlertIcon() {
  const classes = useAlertIconStyles();

  return (
    <PriorityHighIcon className={classes.exclamation} />
  );
}
