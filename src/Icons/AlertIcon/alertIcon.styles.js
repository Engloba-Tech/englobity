import { makeStyles } from '@material-ui/core/styles';

import { color } from '../../App/styles/color.styles';

export const useAlertIconStyles = makeStyles((theme) => ({
  exclamation: {
    color: 'white !important',
    fontSize: '16px',
    background: `${color.icons.error.main} !important`,
    borderRadius: '13px',
    width: '1.3em',
    height: '1.3em',
    padding: '3px',
  }
}));
