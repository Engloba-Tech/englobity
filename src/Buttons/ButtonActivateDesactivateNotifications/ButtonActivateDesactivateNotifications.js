import React from 'react';
import PropTypes from 'prop-types';
import { useButtonStyles } from './buttonActivateDesactivateNotifications.styles';
import clsx from 'clsx';
import { Button } from '../Button';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import { Skeleton } from '@material-ui/lab';

export function ButtonActivateDesactivateNotifications({
  textEnabled = 'Notifications enabled',
  textDisabled = 'Notifications disabled',
  iconEnabled = <NotificationsActiveIcon />,
  iconDisabled = <NotificationsOffIcon />,
  active,
  className,
  onClick,
  isLoading,
  ...props
}) {
  const styles = useButtonStyles();

  function renderButton() {
    return isLoading ? (
      <Skeleton width={400} height={40} />
    ) : (
      <Button className={clsx(className, styles.buttonNotif)} type="button" onClick={onClick} {...props}>
        <div className={styles.wrapperButton}>
          {(active && iconEnabled) || iconDisabled}&nbsp;
          <p className={styles.textButton}>{(active && textEnabled) || textDisabled}</p>
        </div>
      </Button>
    );
  }
  return renderButton();
}

ButtonActivateDesactivateNotifications.propTypes = {
  textEnabled: PropTypes.string,
  textDisabled: PropTypes.string,
  iconEnabled: PropTypes.node,
  iconDisabled: PropTypes.node,
  active: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
};
