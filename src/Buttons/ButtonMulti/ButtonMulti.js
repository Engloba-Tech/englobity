import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useButtonStyles } from './buttonMulti.styles';
import clsx from 'clsx';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Button } from '../Button';
import {
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  ButtonGroup,
  MenuItem,
} from '@material-ui/core';

export function ButtonMulti({
  text,
  icon,
  actions,
  tooltip,
  disabled,
  className,
  popperClassName,
  ...props
}) {
  const styles = useButtonStyles();
  const [popperOpened, setPopperOpened] = useState(false);
  const anchorRef = useRef(null);

  function renderButton() {

    const onClickAction = action => {
      setPopperOpened(false);
      action.action();
    };

    return (
      <>
          <ButtonGroup ref={anchorRef}>
            <Button
              disabled={disabled}
              type="button"
              onClick={() => setPopperOpened(true)}
              tooltip={tooltip}
              className={clsx(popperOpened && styles.buttonToggled, className, styles.button)}
              {...props}
            >
              <div className={styles.wrapperButton}>
                {icon || <ArrowDropDownIcon />}
                <p className={styles.textButton}>{text}</p>
              </div>
            </Button>
          </ButtonGroup>
          {actions && (
            <Popper
              open={popperOpened}
              anchorEl={anchorRef.current}
              transition
              disablePortal
              className={clsx(popperClassName, styles.multiActionButtonPopper)}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <ClickAwayListener onClickAway={() => setPopperOpened(false)}>
                    <MenuList
                      id="split-button-menu"
                      style={{
                        width: anchorRef.current.clientWidth
                      }}
                    >
                      {actions.map((action, index) => (
                        <MenuItem key={action.text} onClick={() => onClickAction(action)}>
                          {action.text}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Grow>
              )}
            </Popper>
          )}
      </>
    );
  }
  return renderButton();
}

ButtonMulti.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.node,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      action: PropTypes.func,
    })
  ).isRequired,
  disabled: PropTypes.bool,
  tooltip: PropTypes.shape({
    title: PropTypes.string,
    placement: PropTypes.string,
  }),
  className: PropTypes.string,
  popperClassName: PropTypes.string,
};
