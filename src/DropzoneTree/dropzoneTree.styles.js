import { makeStyles } from '@material-ui/core/styles';

export const useDropzoneTreeStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    cursor: 'pointer',
    borderRadius: '8px',
    border: `2px dashed ${theme.palette.primary.main}`,
    flex: 1,
    padding: '13.5px 4px',
    '&.Mui-error': {
      border: '2px dashed #f44336 !important'
    },
    '&.Mui-disabled': {
      border: '2px dashed #c2c5ca !important'
    }
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    minHeight: '1rem',
    alignItems: 'center',
    alignContent: 'center'
  },
  choose: {
    margin: '0 0 0 0.5rem'
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  button: {
    background: theme.palette.secondary.main,
    marginRight: '0.5rem'
  },
  chip: {
    width: '215px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingLeft: '10px',
    margin: theme.spacing(0.5)
  },
  inputHelper: {
    color: '#f76e65',
    margin: '3px 14px 0 14px'
  },
  label: {
    margin: `0px ${theme.spacing(0.2)}rem 0px 0px`
  },
  requiredLabel: {
    color: '#f76e65',
    marginLeft: '2px'
  }
}));
