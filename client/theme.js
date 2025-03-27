// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // medium blue
      light: '#63a4ff', // soft accent
      dark: '#004ba0',  // deeper shade
    },
    secondary: {
      main: '#1565c0', // subtle alternate blue
    },
    background: {
      default: '#f4f6f8', // darker neutral light
      paper: '#ffffff',   // crisp white cards/dialogs
    },
    text: {
      primary: '#1a1a1a', // readable but not pure black
      secondary: '#4f4f4f',
    },
  },
  typography: {
    fontFamily: `'Roboto Slab', serif`,
    h1: { fontWeight: 700, fontSize: '2.5rem' },
    h2: { fontWeight: 600, fontSize: '2rem' },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  shape: {
    borderRadius: 12, // softer rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

export default theme;
