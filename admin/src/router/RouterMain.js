import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App';
import Main from '../components/Main';
import EmployeePage from '../page/EmployeePage';
import Login from '../components/Login';
import { AuthProvider } from '../components/AuthContext';
import ProtectedRoute from '../components/PotectedRoute';
import Register from '../components/Register';

function RouterMain() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><App /></ProtectedRoute>}>
            <Route index element={<Main />} />
            <Route path='/employee' element={<EmployeePage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default RouterMain;
