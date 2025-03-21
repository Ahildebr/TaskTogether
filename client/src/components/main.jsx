import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import '.CssStyling/index.css'
import App from './App.jsx'
import {AuthProvider } from '../context/AuthContext.jsx'
import { BrowserRouter as Router } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
    <AuthProvider>
    <App />
    </AuthProvider>
    </Router>
  </StrictMode>,
)
