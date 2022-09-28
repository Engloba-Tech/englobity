import { Snackbar } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import shortid from 'shortid';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import { AlertIcon, BooleanIcon, InfoIcon, WarningIcon } from '../Icons';
import { useExecToasterStyles } from './execToaster.styles';
import { color } from '../App/styles/color.styles';

// import globalStyles from 'styles';

// https://material-ui.com/es/components/snackbars/

export const TOASTER_TYPES = {
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  SUCCESS: 'success',
};

export function SnackAlert({
  name,
  text,
  type,
  unmount,
  position,
  duration = 200000,
}) {
  const classes = useExecToasterStyles(type);
  const [showDetail, setShowDetail] = useState(false);
  const toggleDetail = () => {
    setShowDetail((prevDetail) => !prevDetail);
  };
  const isMultiLine = text && typeof text !== 'string';

  return (
    <Snackbar
      anchorOrigin={position}
      open={true}
      autoHideDuration={duration}
      onClose={unmount}
    >
      <div
        className={clsx(classes.alert, type)}
        style={{
          color: color.icons[type].main,
          backgroundColor: color.icons[type].light,
          fontWeight: text && 'bold',
        }}
      >
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
                          marginLeft: '1rem',
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
                <span style={{ fontWeight: 'normal', display: 'block' }}>
                  {text}
                </span>
              </>
            ))}
        </div>
        {isMultiLine && (
          <span onClick={toggleDetail}>
            {showDetail ? (
              <ExpandLessIcon className={classes.showMoreIcon} />
            ) : (
              <ExpandMoreIcon className={classes.showMoreIcon} />
            )}
          </span>
        )}
        <CloseIcon className={classes.closeIcon} onClick={unmount} />
      </div>
    </Snackbar>
  );
}

export function execToaster({
  name,
  text,
  type,
  position = { vertical: 'bottom', horizontal: 'right' },
}) {
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
    />,
    document.getElementById(idGenerated)
  );
}

export function successToaster(text, detail) {
  execToaster({
    name: text,
    text: detail,
    type: TOASTER_TYPES.SUCCESS,
  });
}

export function warningToaster(text, detail) {
  execToaster({
    name: text,
    text: detail,
    type: TOASTER_TYPES.WARNING,
  });
}

export function errorToaster(text, detail) {
  execToaster({
    name: text,
    text: detail,
    type: TOASTER_TYPES.ERROR,
  });
}
export function infoToaster(text, detail) {
  execToaster({
    name: text,
    text: detail,
    type: TOASTER_TYPES.INFO,
  });
}

SnackAlert.propTypes = {
  text: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(['error', 'warning', 'info', 'success']).isRequired,
  position: PropTypes.object,
  unmount: PropTypes.func,
  duration: PropTypes.number,
};
