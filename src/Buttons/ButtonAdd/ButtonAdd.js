import React from 'react';
import PropTypes from 'prop-types';
import { useButtonStyles } from './buttonAdd.styles';
import clsx from 'clsx';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Button } from '../Button';

export function ButtonAdd({ text, icon, tooltip, disabled, className, loading, ...props }) {
  const styles = useButtonStyles();

  function renderButton() {
    return (
      <Button
        disabled={disabled}
        type="button"
        tooltip={tooltip}
        className={clsx(className, styles.buttonAdd)}
        loading={loading}
        {...props}
      >
        <div className={styles.wrapperButton}>
          {!loading && (icon || <AddCircleIcon />)}
          <p className={styles.textButton}>{text || 'Add'}</p>
        </div>
      </Button>
    );
  }
  return renderButton();
}

ButtonAdd.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.node,
  disabled: PropTypes.bool,
  tooltip: PropTypes.shape({
    title: PropTypes.string,
    placement: PropTypes.string
  }),
  className: PropTypes.string,
  loading: PropTypes.bool
};
