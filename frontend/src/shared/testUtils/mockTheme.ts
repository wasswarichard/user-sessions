import { createMuiTheme, Theme } from '@material-ui/core';

const mockTheme: Theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#2D4A72',
    },
  },
  typography: {
    h1: {
      fontSize: '1.6rem',
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '1.8rem',
      fontWeight: 400,
    },
  },
});

export default mockTheme;
