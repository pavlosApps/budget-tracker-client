import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Dashboard from './pages/Dashboard'
import AddTransaction from './pages/AddTransaction'
import Users from './pages/Users'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/add" element={<AddTransaction />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  </BrowserRouter>
)
