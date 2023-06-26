import { makeStyles } from '@material-ui/core/styles';

export const useButtonStyles = makeStyles((theme) => ({
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
