import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { SnackAlert } from '../execToaster';
import { useSummaryStyles } from './summary.styles';

export const SUMMARY_TYPES = {
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  SUCCESS: 'success'
};

export function Summary({ text, detail, severity, className, ...props }) {
  const classes = useSummaryStyles();
  const [display, setDisplay] = useState(true);
  return (
    (display && text && (
      <div className={clsx(classes.divSummary, className)}>
        <SnackAlert
          className={classes.summary}
          name={text}
          text={detail}
          type={severity}
          onClose={() => {
            setDisplay(false);
          }}
        />
      </div>
    )) || <></>
  );
}

export function SuccessSummary({ text, detail, className }) {
  return <Summary text={text} detail={detail} className={className} severity={SUMMARY_TYPES.SUCCESS} />;
}

export function WarningSummary({ text, detail, className }) {
  return <Summary text={text} detail={detail} className={className} severity={SUMMARY_TYPES.WARNING} />;
}

export function ErrorSummary({ text, detail, className }) {
  return <Summary text={text} detail={detail} className={className} severity={SUMMARY_TYPES.ERROR} />;
}
export function InfoSummary({ text, detail, className }) {
  return <Summary text={text} detail={detail} className={className} severity={SUMMARY_TYPES.INFO} />;
}

Summary.propTypes = {
  text: PropTypes.string,
  detail: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string,
  seeMoreText: PropTypes.string,
  severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']).isRequired
};
