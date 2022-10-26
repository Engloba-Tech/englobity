import { makeStyles } from '@material-ui/core/styles';

export const useCustomSelectStyles = makeStyles(theme => ({
  root: {
    minWidth: '13rem',
    display: 'flex'
  },
  customSelect: {
    '&& .MuiSelect-outlined': {
      display: 'flex',
      alignItems: 'center',
      height: '1.1875rem'
    },
    '& .Mui-error': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#f44336'
      }
    }
  },
  icon: {
    minWidth: 0,
    marginRight: '0.5rem'
  },
  inputHelper: {
    color: '#f76e65',
    margin: '3px 14px 0 14px'
  },
  requiredLabel: {
    color: '#f76e65',
    marginLeft: '2px'
  }
}));
