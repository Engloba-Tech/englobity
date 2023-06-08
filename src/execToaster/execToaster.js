import { Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import shortid from 'shortid';

import { color } from '../App/styles/color.styles';
import { AlertIcon, BooleanIcon, InfoIcon, WarningIcon } from '../Icons';
import { useExecToasterStyles } from './execToaster.styles';

// import globalStyles from 'styles';

// https://material-ui.com/es/components/snackbars/

export const TOASTER_TYPES = {
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  SUCCESS: 'success'
};

export function SnackAlert({ name, text, type, unmount, position, onClose, duration = 200000, className }) {
  const classes = useExecToasterStyles(type);
  const [showDetail, setShowDetail] = useState(false);
  const toggleDetail = () => {
    setShowDetail(prevDetail => !prevDetail);
  };
  const isMultiLine = text && typeof text !== 'string';

  return (
    <Snackbar anchorOrigin={position} open={true} autoHideDuration={duration} onClose={unmount}>
      <div
        className={clsx(classes.alert, type, className)}
        style={{
          color: color.icons[type].main,
          backgroundColor: color.icons[type].light,
          fontWeight: text && 'bold'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', width: '99%' }}>
          {type === TOASTER_TYPES.ERROR && <AlertIcon />}
          {type === TOASTER_TYPES.SUCCESS && <BooleanIcon condition={true} />}
          {type === TOASTER_TYPES.INFO && <InfoIcon />}
          {type === TOASTER_TYPES.WARNING && <WarningIcon />}
          <div>
            <span>{name}</span>
            {text &&
              (isMultiLine ? (
                <>
                  {showDetail &&
                    text.map((line, index) => {
                      return (
                        <span
                          key={index}
                          style={{
                            fontWeight: 'normal',
                            display: 'block',
                            marginLeft: '1rem'
                          }}
                        >
                          {`- ${line}`}
                        </span>
                      );
                    })}
                </>
              ) : (
                <>
                  <br />
                  <span style={{ fontWeight: 'normal', display: 'block' }}>{text}</span>
                </>
              ))}
          </div>
        </div>
        {isMultiLine && (
          <span onClick={toggleDetail} style={{ display: 'flex' }}>
            {showDetail ? (
              <ExpandLessIcon className={classes.showMoreIcon} />
            ) : (
              <ExpandMoreIcon className={classes.showMoreIcon} />
            )}
          </span>
        )}
        <CloseIcon className={classes.closeIcon} onClick={unmount || onClose} />
      </div>
    </Snackbar>
  );
}

export function execToaster({ name, text, type, position = { vertical: 'bottom', horizontal: 'right' }, className }) {
  const idGenerated = shortid.generate();
  const entryPointToasterDom = document.createElement('div');
  entryPointToasterDom.setAttribute('id', idGenerated);

  const global = document.getElementById('global');
  global.appendChild(entryPointToasterDom);

  ReactDOM.render(
    <SnackAlert
      name={name}
      text={text}
      type={type}
      position={position}
      unmount={() => {
        ReactDOM.unmountComponentAtNode(document.getElementById(idGenerated));
        global.removeChild(entryPointToasterDom);
      }}
      className={className}
    />,
    document.getElementById(idGenerated)
  );
}

export function successToaster(text, detail, duration = 6000, className) {
  execToaster({
    name: text,
    text: detail,
    type: TOASTER_TYPES.SUCCESS,
    duration,
    className
  });
}

export function warningToaster(text, detail, duration, className) {
  execToaster({
    name: text,
    text: detail,
    type: TOASTER_TYPES.WARNING,
    duration,
    className
  });
}

export function errorToaster(text, detail, duration, className) {
  execToaster({
    name: text,
    text: detail,
    type: TOASTER_TYPES.ERROR,
    duration,
    className
  });
}
export function infoToaster(text, detail, duration, className) {
  execToaster({
    name: text,
    text: detail,
    type: TOASTER_TYPES.INFO,
    duration,
    className
  });
}

SnackAlert.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  name: PropTypes.string,
  type: PropTypes.oneOf(['error', 'warning', 'info', 'success']).isRequired,
  position: PropTypes.object,
  unmount: PropTypes.func,
  duration: PropTypes.number,
  className: PropTypes.object
};
