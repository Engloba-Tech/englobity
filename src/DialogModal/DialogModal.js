import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import React from 'react';
import { Button } from '../Buttons';
import { useDialogModalStyles } from './dialogModal.styles';

export function DialogModal({
  title,
  description,
  isOpen,
  buttons,
  children,
  showDefaultButtons = true,
  customButtons,
  ...rest
}) {
  const classes = useDialogModalStyles();

  return (
    <Dialog open={isOpen} aria-labelledby={title} {...rest}>
      <DialogTitle className={classes.title} id={title}>
        {title}
        <CloseIcon
          aria-label="close"
          onClick={rest.onClose}
          style={{
            float: 'right',
            color: theme => theme.palette.grey[500],
            cursor: 'pointer'
          }}
        />
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {description && <DialogContentText id="dialog_description">{description}</DialogContentText>}
        {children}
      </DialogContent>
      {buttons && (
        <DialogActions className={classes.actions}>
          {customButtons && customButtons}
          {showDefaultButtons &&
            buttons.map(
              (button, i) =>
                button && (
                  <Button
                    tooltip={{
                      title: button.text,
                      placement: 'top'
                    }}
                    id={button.id || `dialog_button_${i}`}
                    key={`dialog_button_${i}`}
                    {...button}
                  >
                    <div className={classes.wrapperButton}>
                      {button.children}
                      <p className={classes.textButton}>{button.text}</p>
                    </div>
                  </Button>
                )
            )}
        </DialogActions>
      )}
    </Dialog>
  );
}

DialogModal.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      onClick: PropTypes.func,
      text: PropTypes.string,
      children: PropTypes.element,
      type: PropTypes.string
    })
  ),
  children: PropTypes.element.isRequired,
  showDefaultButtons: PropTypes.bool,
  customButtons: PropTypes.element
};
