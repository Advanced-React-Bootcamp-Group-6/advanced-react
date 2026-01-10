import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ProductProvider } from './modules/Products/index.tsx'
import { MantineProvider } from '@mantine/core'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <ProductProvider value={"this app"}>
        <App />
      </ProductProvider>
    </MantineProvider>
  </StrictMode>,
)
