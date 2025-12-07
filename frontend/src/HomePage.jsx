import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// NOTE: This authentication context is designed to be easily moved to a separate file
// (e.g., src/context/AuthContext.jsx) in the future. Simply copy this entire AuthContext
// structure and the useAuth hook to a new file and import it where needed.
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in on initial load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (userData) => {
    // In a real app, you would set the token from the response
    localStorage.setItem('authToken', 'fake-token');
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const HomePage = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const addTask = () => {
    if (isLoggedIn) {
      const newTask = {
        id: Date.now(),
        title: `Задача от ${new Date().toLocaleString()}`
      };
      setTasks([...tasks, newTask]);
    }
  };

  const [message, setMessage] = useState('');
  const handleSendMessage = () => {
    if (isLoggedIn && message.trim()) {
      console.log(message);
      setMessage('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      {/* Top right corner buttons */}
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        {isLoggedIn ? (
          <button onClick={handleLogout} style={{ padding: '8px 16px', fontSize: '14px' }}>
            Выйти
          </button>
        ) : (
          <button onClick={handleLogin} style={{ padding: '8px 16px', fontSize: '14px' }}>
            Войти
          </button>
        )}
      </div>

      {/* Main content */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 300px', 
        gap: '20px', 
        maxWidth: '1200px', 
        margin: '60px auto 20px', 
        padding: '0 20px' 
      }}>
        {/* Center content - task list */}
        <div>
          <h1>Список задач</h1>
          
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {tasks.map(task => (
              <li 
                key={task.id} 
                style={{ 
                  padding: '10px', 
                  margin: '5px 0', 
                  backgroundColor: '#f5f5f5', 
                  borderRadius: '4px' 
                }}
              >
                {task.title}
              </li>
            ))}
          </ul>
          
          {isLoggedIn && (
            <button 
              onClick={addTask} 
              style={{ 
                marginTop: '20px', 
                padding: '10px 20px', 
                fontSize: '16px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              + Добавить задачу
            </button>
          )}
        </div>

        {/* Right column - Calendar Widget */}
        <div>
          <div 
            style={{ 
              padding: '20px', 
              backgroundColor: '#e9ecef', 
              borderRadius: '8px',
              height: 'fit-content'
            }}
          >
            <h3>📅 Календарь</h3>
            {isLoggedIn ? (
              <p>Сегодня: {new Date().toLocaleDateString()}</p>
            ) : (
              <p>Календарь доступен после входа</p>
            )}
          </div>
        </div>
      </div>

      {/* ChatWidget - bottom right fixed position */}
      <div 
        style={{ 
          position: 'fixed', 
          bottom: '20px', 
          right: '20px', 
          width: '300px',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '15px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}
      >
        <h4>Чат</h4>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={!isLoggedIn}
            placeholder={isLoggedIn ? "Введите сообщение..." : "Войдите, чтобы писать"}
            style={{
              flex: 1,
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: isLoggedIn ? 'white' : '#f5f5f5'
            }}
          />
          <button 
            onClick={handleSendMessage}
            disabled={!isLoggedIn || !message.trim()}
            style={{
              padding: '8px 12px',
              backgroundColor: isLoggedIn ? '#2196F3' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoggedIn ? 'pointer' : 'not-allowed'
            }}
          >
            Отправить
          </button>
        </div>
        
        {!isLoggedIn && (
          <small style={{ color: '#666', marginTop: '5px', display: 'block' }}>
            Войдите, чтобы писать
          </small>
        )}
      </div>
    </div>
  );
};

export default HomePage;