import { makeStyles } from '@material-ui/core/styles';

import { color } from '../../App/styles/color.styles';

const defauldButton = (font) => ({
  height: '2.4rem',
  padding: '0rem 1rem',
  // minWidth: '6.25rem',
  borderRadius: '8px',
  fontStyle: 'normal',
  fontWeight: font.weight.seminormal,
  fontSize: font.size.s,
});

export const useButtonStyles = makeStyles((theme) => ({
  button: {
    ...defauldButton(theme.font),
    // background: color.buttons.add.light,
    // color: color.buttons.add.main,
    // '&:hover': {
    //   background: color.buttons.add.main,
    //   color: 'white',
    // },
    // textTransform: 'none',
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
  multiActionButtonPopper: {
    zIndex: '2400 !important',
    marginLeft: '1px',
    // marginLeft: theme.spacing(2),
    '& .MuiList-padding': {
      padding: '0 !important',
      // border: '1px solid #4d5df1',
      background: theme.palette.primary.main,
      borderTop: 'none',
      '& .MuiMenuItem-root': {
        fontSize: '14px',
        color: 'white',
      },
    },
  },
  buttonToggled:{
    borderBottom: 'none !important',
    // marginLeft: theme.spacing(2),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  actions: {
    flex: 11,
    alignSelf: 'end',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  '& .primary': {
    background: 'red'
  },

  '& .scondary': {
    background: 'yellow'
  },
  '.multiActionButtonPopper': {
    zIndex: '5 !important',
    '& .MuiList-padding':{
      padding: '0 !important'
    }
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    '& form': {
      flexGrow: 0
    }
  },
  noWritePermission: {
    marginBottom: '1rem',
    flexBasis: 'auto'
  }
}));
