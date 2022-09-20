import { Tooltip } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

import { useBooleanIconStyles } from './booleanIcon.styles';

export function BooleanIcon({
  condition,
  trueText = '',
  falseText = '',
  placement = 'top',
  tooltipClasses,
  iconClasses,
  showOnlyCheck,
}) {
  const classes = useBooleanIconStyles();

  return condition ? (
    <Tooltip title={trueText} placement={placement} classes={tooltipClasses}>
      <CheckIcon className={clsx(iconClasses, classes.positive)} />
    </Tooltip>
  ) : showOnlyCheck ? (
    ''
  ) : (
    <Tooltip title={falseText} placement={placement} classes={tooltipClasses}>
      <CloseIcon className={clsx(iconClasses, classes.negative)} />
    </Tooltip>
  );
}

BooleanIcon.propTypes = {
  condition: PropTypes.bool.isRequired,
  trueText: PropTypes.string,
  falseText: PropTypes.string,
  placement: PropTypes.string,
  tooltipClasses: PropTypes.shape({
    tooltip: PropTypes.string,
  }),
  iconClasses: PropTypes.shape({
    root: PropTypes.string,
  }),
  showOnlyCheck: PropTypes.bool,
};
