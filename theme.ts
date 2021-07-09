import { createTheme } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: blue,
    background: {
      default: '#121212',
      paper: '#333',
    },
  },
});

export default theme;
