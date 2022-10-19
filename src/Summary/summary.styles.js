import { makeStyles } from '@material-ui/core/styles';

export const useSummaryStyles = makeStyles((theme) => ({
  summary: {
    position: 'relative',
    width: '100%',
  },
  divSummary: {
    '& .MuiSnackbar-root': {
      position: 'relative',
      width: '100%',
      bottom: 0
    },
  },
}));
