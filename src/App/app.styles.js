import { makeStyles } from '@material-ui/core/styles';

export const useAppStyles = makeStyles(theme => ({
  yellow: {
    '& .MuiBadge-colorPrimary':{
      backgroundColor: 'orange'
    }
  }, greenBell: {
    color: 'green'
  },
  border: {
    border: '1px solid gray'
  },
  blue: {
    color: 'blue'
  },
  customInfoSummary: {
    border: '1px solid blue'
  }
}));
