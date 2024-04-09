import { color } from './color.styles';

export const globals = {
  html: {
    fontSize: '16px' // 1rem = 16px,
  },
  body: {
    fontFamily: 'Montserrat',
    '& *': {
      fontFamily: 'Montserrat'
    },
    backgroundColor: color.secondary.main,
    '& hr': {
      opacity: 0.2
    }
  },
  '.MuiInputBase-input': {
    fontFamily: 'Montserrat'
  },
  '.MuiInputLabel-outlined': {
    backgroundColor: 'white',
    padding: '0 0.5rem 0 0.2rem'
  },
  '.MuiFormHelperText-root.Mui-error': {
    position: 'absolute',
    bottom: '-18px'
  },
  '#nprogress': {
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: '9999',
    '& bar': {
      zIndex: '9999',
      backgroundColor: color.primary.main
    },
    '& peg': {
      zIndex: '9999',
      boxShadow: 'none'
    }
  },
  '.MuiTypography-root': {
    fontFamily: 'Montserrat'
  },
  '.MuiDialog-root': {
    zIndex: '2200 !important'
  },
  '.MuiAutocomplete-popper': {
    zIndex: '2300 !important'
  },
  '.MuiPopover-root': {
    zIndex: '2300 !important'
  },
  '#global div .MuiSnackbar-root': {
    zIndex: '2300 !important'
  }
};
