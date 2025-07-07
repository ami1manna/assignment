import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { EmployeeProvider } from './context/EmployeeContext'
import RootLayout from './RootLayout'
import EmployeeDetailPage from './pages/EmployeeDetailPage'
import EditEmployeePage from './pages/EditEmployeePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <EmployeeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<App />} />
            <Route path="employee/:id" element={<EmployeeDetailPage />} />
            <Route path="employee/:id/edit" element={<EditEmployeePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </EmployeeProvider>
  // </React.StrictMode>
)
