import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const AuthRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isGuest = localStorage.getItem('isGuest');
  
  // Allow access if no token OR if guest (guests can register/login)
  return (token && isGuest !== 'true') ? <Navigate to="/dashboard" /> : children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route 
          path="/login" 
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <AuthRoute>
              <Register />
            </AuthRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
