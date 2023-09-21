import React from 'react';
import PropTypes from 'prop-types';
import { useButtonStyles } from './buttonDelete.styles';
import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '../Button';

export function ButtonDelete({ text, icon, tooltip, disabled, className, loading, ...props }) {
  const styles = useButtonStyles();

  function renderButton() {
    return (
      <Button
        disabled={disabled}
        type="button"
        tooltip={tooltip}
        className={clsx(className, styles.button)}
        loading={loading}
        {...props}
      >
        <div className={styles.wrapperButton}>
          {!loading && (icon || <DeleteIcon />)}
          <p className={styles.textButton}>{text || 'Delete'}</p>
        </div>
      </Button>
    );
  }
  return renderButton();
}

ButtonDelete.propTypes = {
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
