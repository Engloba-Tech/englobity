import React from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress, Tooltip } from '@material-ui/core';
import { usButtonStyles } from './button.styles';

export function CustomButton({
  type = 'primary',
  isSubmit = false,
  tooltip,
  disabled,
  children,
  className,
  rootClassName,
  loading,
  ...props
}) {
  const classes = usButtonStyles();

  function renderButton() {
    return (
      <div className={`${rootClassName} ${disabled || loading ? 'Mui-disabled' : ''}`}>
        <Button
          disabled={disabled || loading}
          type={isSubmit ? 'submit' : 'button'}
          {...props}
          className={`${className} ${classes[type] || classes.primary}`}
        >
          {loading ? (
            <>
              <CircularProgress color="inherit" size={'1rem'} />
              &nbsp;{children}
            </>
          ) : (
            children
          )}
        </Button>
      </div>
    );
  }
  return <>{tooltip ? <Tooltip {...tooltip}>{renderButton()}</Tooltip> : renderButton()}</>;
}

CustomButton.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary']).isRequired,
  isSubmit: PropTypes.bool,
  disabled: PropTypes.bool,
  tooltip: PropTypes.shape({
    title: PropTypes.string,
    placement: PropTypes.string
  }),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  className: PropTypes.string,
  rootClassName: PropTypes.string,
  loading: PropTypes.bool
};
