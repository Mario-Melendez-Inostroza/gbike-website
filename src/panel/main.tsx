import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PanelApp from './PanelApp.js'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PanelApp />
  </StrictMode>,
)
