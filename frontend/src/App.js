import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import NewTaskPage from './pages/NewTaskPage';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to='/login' />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/todos' element={<PrivateRoute><TodoPage /></PrivateRoute>} />
          <Route path='/todos/new' element={<PrivateRoute><NewTaskPage /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

