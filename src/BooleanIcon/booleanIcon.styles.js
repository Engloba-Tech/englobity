import { makeStyles } from '@material-ui/core/styles';

import { color } from '../App/styles/color.styles';

export const useBooleanIconStyles = makeStyles((theme) => ({
  positive: {
    color: 'white !important',
    fontSize: '16px',
    background: `${color.buttons.add.main} !important`,
    borderRadius: '13px',
    width: '1.3em',
    height: '1.3em',
    padding: '3px',
  },
	negative: {
    color: 'white !important',
    fontSize: '16px',
    background: `${color.buttons.delete.main} !important`,
    borderRadius: '13px',
    width: '1.3em',
    height: '1.3em',
    padding: '3px',
  },
}));
