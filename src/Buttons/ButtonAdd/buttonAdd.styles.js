import { makeStyles } from '@material-ui/core/styles';
import { color } from '../../App/styles/color.styles';

const defaultButton = (font) => ({
  height: '2.4rem',
  padding: '0rem 1rem',
  // minWidth: '6.25rem',
  borderRadius: '8px',
  fontStyle: 'normal',
  fontWeight: font.weight.seminormal,
  fontSize: font.size.s,
});

export const useButtonStyles = makeStyles((theme) => ({
  buttonAdd: {
    ...defaultButton(theme.font),
    background: color.buttons.add.light,
    color: color.buttons.add.main,
    '&:hover': {
	  background: color.buttons.add.main,
      color: 'white',
    },
    textTransform: 'none',
  },
  wrapperButton: {
    display: 'flex',
    alignItems: 'center',
  },
  textButton: {
    margin: 0,
    marginLeft: '0.2rem',
    marginTop: '0.1rem',
    marginRight: '0.2rem',
    whiteSpace: 'nowrap',
  },
}));
