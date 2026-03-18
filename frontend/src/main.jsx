import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Aplicar tema guardado antes de renderizar para evitar flash
if (localStorage.getItem('theme') === 'light') {
  document.documentElement.classList.add('light-theme');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
