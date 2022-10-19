import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { SnackAlert } from '../execToaster';
import { useSummaryStyles } from './summary.styles';

export const SUMMARY_TYPES = {
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  SUCCESS: 'success',
};

export function Summary({ text, severity, className, ...props }) {
  const classes = useSummaryStyles();
  const [display, setDisplay] = useState(true);
  return (
    (display && text && (
      <div className={clsx(classes.divSummary, className)}>
        <SnackAlert
          className={classes.summary}
          name={text}
          type={severity}
          onClose={() => {
            setDisplay(false);
          }}
        />
      </div>
    )) || <></>
  );
}

export function SuccessSummary({ text, className }) {
  return (
    <Summary
      text={text}
      className={className}
      severity={SUMMARY_TYPES.SUCCESS}
    />
  );
}

export function WarningSummary({ text, className }) {
  return (
    <Summary
      text={text}
      className={className}
      severity={SUMMARY_TYPES.WARNING}
    />
  );
}

export function ErrorSummary({ text, className }) {
  return (
    <Summary text={text} className={className} severity={SUMMARY_TYPES.ERROR} />
  );
}
export function InfoSummary({ text, className }) {
  return (
    <Summary text={text} className={className} severity={SUMMARY_TYPES.INFO} />
  );
}

Summary.propTypes = {
  text: PropTypes.string,
  detail: PropTypes.string,
  className: PropTypes.string,
  seeMoreText: PropTypes.string,
  severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']).isRequired,
};
