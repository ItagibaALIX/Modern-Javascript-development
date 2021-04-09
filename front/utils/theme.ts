import { createMuiTheme } from '@material-ui/core/styles/';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#FABB7C',
    },
    success: {
      main: '#E7D6AC',
    },
    text: {
      primary: '#333',
      secondary: '#E0E0E0',
      disabled: '#BDBDBD',
    },
  },
  shape: {
    borderRadius: 5,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1025,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
