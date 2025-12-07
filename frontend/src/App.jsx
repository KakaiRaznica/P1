import React, { useState } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import './App.css';

const AppContent = () => {
  const auth = useAuth();
  
  return (
    <div className="app">
      {auth.isLoggedIn ? <HomePage /> : <LoginPage onLogin={() => {}} />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;