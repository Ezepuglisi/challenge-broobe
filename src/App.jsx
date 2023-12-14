import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import IssuesList from './pages/IssuesList';
import { ProtectedRoute } from './services/ProtectedRoute';
import CreateIssue from './pages/CreateIssue';
import './css/forms.css'
import UpdateIssue from './pages/UpdateIssue';

function App() {



  return (

    <Router>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <IssuesList />
          </ProtectedRoute>
        } />

        <Route path='/createIssue' element={
          <ProtectedRoute>
            <CreateIssue />
          </ProtectedRoute>
        } />

        <Route path='/updateIssue/:id' element={
          <ProtectedRoute>
            <UpdateIssue />
          </ProtectedRoute>
        } />

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>

  )
}

export default App
