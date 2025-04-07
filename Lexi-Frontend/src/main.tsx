import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { store } from './store/store.ts'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage.tsx'
import { SignIn } from './pages/SignIn.tsx'
import { SignUp } from './pages/Signup.tsx'
import { Provider } from 'react-redux'
import {Home} from './pages/Home.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />
      },
      {
        path: "/signin",
        element: <SignIn />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/home",
        element: <Home />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
