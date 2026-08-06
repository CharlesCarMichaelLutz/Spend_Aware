import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import { router } from "./router"
import "@fontsource/inter/400.css"
import "@fontsource/inter/500.css"
import "@fontsource/inter/600.css"
import "@fontsource/inter/700.css"
import { ErrorBoundary } from "./components/ErrorBoundary"

import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      {/*can pass in component here*/}
      <ErrorBoundary fallback={<h1>Error</h1>}>
          <RouterProvider router={router}/>
      </ErrorBoundary>
  </StrictMode>,
)
