import { makeStyles } from '@material-ui/core/styles';

export const useExecToasterStyles = makeStyles((theme) => ({
  alert: {
    display: 'flex',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    justifyContent: 'space-between',
    alignItems: 'center',
    lineHeight: '21px',
    borderRadius: '8px',
    '& svg': {
      fontSize: '13px',
      marginRight: theme.spacing(1.5),
    }
  },
  closeIcon: {
    marginLeft: theme.spacing(3),
    marginRight: '0 !important',
    fontSize: '20px !important',
    cursor:'pointer'
  },
  showMoreIcon: {
    marginLeft: theme.spacing(1),
    marginRight: '0 !important',
    fontSize: '20px !important',
    cursor:'pointer'
  }
}));
