import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { store } from './store/store.ts'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage.tsx'
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
