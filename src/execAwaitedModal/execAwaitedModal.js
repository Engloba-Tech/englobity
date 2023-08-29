import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import globalStyles from '../App/styles';
import { DialogModal } from '../DialogModal';
import React from 'react';

export function execAwaitedgModal({ title, description, buttonsFn, children, idGenerated, ...rest }) {
  function rejectPromise(global, entryPointToasterDom, idGenerated, reject) {
    ReactDOM.unmountComponentAtNode(document.getElementById(idGenerated));
    global.removeChild(entryPointToasterDom);
    rest?.onCancel && rest.onCancel();
    reject('User clicked No');
  }

  function resolvePromise(global, entryPointToasterDom, idGenerated, resolve) {
    ReactDOM.unmountComponentAtNode(document.getElementById(idGenerated));
    global.removeChild(entryPointToasterDom);
    rest?.onConfirm && rest.onConfirm();
    resolve('User clicked Yes');
  }

  return new Promise((resolve, reject) => {
    const entryPointToasterDom = document.createElement('div');
    entryPointToasterDom.setAttribute('id', idGenerated);

    const global = document.getElementById('global');
    global.appendChild(entryPointToasterDom);

    ReactDOM.render(
      <ThemeProvider theme={globalStyles}>
        <CssBaseline />
        <DialogModal
          fullWidth
          title={title}
          description={description}
          isOpen
          buttons={buttonsFn(
            () => rejectPromise(global, entryPointToasterDom, idGenerated, reject),
            () => resolvePromise(global, entryPointToasterDom, idGenerated, resolve)
          )}
          onClose={() => {
            ReactDOM.unmountComponentAtNode(document.getElementById(idGenerated));
            global.removeChild(entryPointToasterDom);
          }}
          {...rest}
        >
          {children}
        </DialogModal>
      </ThemeProvider>,
      document.getElementById(idGenerated)
    );
  });
}

execAwaitedgModal.propTypes = {
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
  children: PropTypes.element.isRequired
};
