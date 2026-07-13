import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { BusinessConfigProvider } from './config/BusinessConfigContext'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BusinessConfigProvider>
      <App />
    </BusinessConfigProvider>
  </StrictMode>,
)
