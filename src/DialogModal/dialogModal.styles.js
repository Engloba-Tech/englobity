import { makeStyles } from '@material-ui/core/styles';

export const useDialogModalStyles = makeStyles(theme => ({
  dialogContent: {
    overflow: 'auto',
    padding: '24px',
    overflowX: 'hidden'
  },
  actions: {
    padding: '0 24px 24px 24px'
  },
  title: {
    padding: '16px 24px 0 24px'
  },
  textButton: {
    margin: 0,
    marginRight: '0.2rem',
    marginTop: '0.1rem',
    marginLeft: '0.2rem'
  },
  wrapperButton: {
    display: 'flex',
    alignItems: 'center'
  }
}));
