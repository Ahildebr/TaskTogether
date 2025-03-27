import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx'
import {AuthProvider } from '../context/AuthContext.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import theme from '../../theme.js'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
    <AuthProvider>
    <App />
    </AuthProvider>
    </Router>
    </ThemeProvider>
  </StrictMode>,
)
