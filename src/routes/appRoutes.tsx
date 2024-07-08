import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Dashboard from 'container/dashboard'
import LoginForm from 'container/loginForm'
import MapComponent from 'container/map'

const RouterData = (): any => {
  const strictRoute = createBrowserRouter([
    {
      path: '/',
      element: <MapComponent />
    },
    {
      path: '/login',
      element: <LoginForm />
    },
    {
      path: '/dashboard',
      element: <Dashboard />
    }
  ])

  return strictRoute
}

export default RouterData
