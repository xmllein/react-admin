import { createBrowserRouter, Navigate } from 'react-router-dom'

import Welcome from '@/views/welcome'
import Login from '@/views/login/Login'
import Error404 from '@/views/404'
import Error403 from '@/views/403'
import LayoutFC from '@/layout'
import User from '@/views/system/user'
import AuthLoader from '@/router/AuthLoader'

export const router = [
  {
    path: '/',
    element: <Navigate to='/welcome' />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    id: 'layout',
    element: <LayoutFC />,
    loader: AuthLoader,
    children: [
      {
        path: '/welcome',
        element: <Welcome />,
      },
      {
        path: '/userList',
        element: <User />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to='/404' />,
  },
  {
    path: '/404',
    element: <Error404 />,
  },
  {
    path: '/403',
    element: <Error403 />,
  },
]

export default createBrowserRouter(router)
