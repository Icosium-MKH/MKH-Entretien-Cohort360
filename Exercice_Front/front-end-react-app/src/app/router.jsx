import { createBrowserRouter } from 'react-router-dom'
import MainLayout from 'shared/layout/MainLayout'

import HomePage from 'features/dashboard/pages/HomePage'
import PrescriptionPage from 'features/prescriptions/pages/PrescriptionPage'

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/prescription', element: <PrescriptionPage /> },
    ],
  },
])