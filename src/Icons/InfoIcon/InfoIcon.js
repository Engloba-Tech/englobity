import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import React from 'react';

import { useInfoIconStyles } from './infoIcon.styles';

export function InfoIcon() {
  const classes = useInfoIconStyles();

  return (
    <PriorityHighIcon className={classes.info} />
  );
}
