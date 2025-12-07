import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use auth context
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if user is logged in from localStorage
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const login = (username, password) => {
    // For this example, we'll just accept any non-empty credentials
    if (username && password) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

// Public Route Component (redirects if already logged in)
const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to="/" /> : children;
};

// Component to handle navigation in a functional way
const LoginPageWithAuth = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (username, password) => {
    const success = login(username, password);
    if (success) {
      navigate('/'); // Redirect to home after successful login
    }
    return success;
  };

  return <LoginPage onLogin={handleLogin} />;
};

const HomePageWithAuth = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Navigate back to home after logout
  };

  return <HomePage onLogout={handleLogout} />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Routes>
            <Route 
              path="/" 
              element={
                <PublicRoute>
                  <HomePageWithAuth />
                </PublicRoute>
              } 
            />
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <LoginPageWithAuth />
                </PublicRoute>
              } 
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;