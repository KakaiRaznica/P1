import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './App'; // Import the AuthContext from App.jsx

// NOTE: This authentication context implementation can be easily moved to a separate file
// like src/context/AuthContext.jsx in the future. Just copy the AuthContext, useAuth hook,
// and the authentication state/logic to that file and import it here instead.
const HomePage = ({ onLogout }) => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    if (onLogout) {
      onLogout();
    } else {
      navigate('/');
    }
  };
  const [tasks, setTasks] = useState([]);
  
  const handleAddTask = () => {
    const newTask = `Задача от ${new Date().toLocaleString()}`;
    setTasks([...tasks, newTask]);
  };

  const [chatMessage, setChatMessage] = useState('');

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      console.log(chatMessage);
      setChatMessage('');
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div style={styles.pageContainer}>
      {/* Top right corner buttons */}
      <div style={styles.topRight}>
        {isLoggedIn ? (
          <button onClick={handleLogout} style={styles.logoutButton}>
            Выйти
          </button>
        ) : (
          <button onClick={handleLogin} style={styles.loginButton}>
            Войти
          </button>
        )}
      </div>

      {/* Main content */}
      <div style={styles.mainContent}>
        <div style={styles.tasksSection}>
          <h1>Список задач</h1>
          <ul style={styles.taskList}>
            {tasks.map((task, index) => (
              <li key={index} style={styles.taskItem}>
                {task}
              </li>
            ))}
          </ul>
          
          {isLoggedIn && (
            <button onClick={handleAddTask} style={styles.addButton}>
              + Добавить задачу
            </button>
          )}
        </div>
        
        {/* Calendar widget */}
        <div style={styles.calendarWidget}>
          {isLoggedIn ? (
            <div>📅 Сегодня: {new Date().toLocaleDateString()}</div>
          ) : (
            <div>📅 Календарь доступен после входа</div>
          )}
        </div>
      </div>

      {/* Chat widget - fixed position at bottom right */}
      <div style={styles.chatWidget}>
        <form onSubmit={handleChatSubmit} style={styles.chatForm}>
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            disabled={!isLoggedIn}
            placeholder={isLoggedIn ? "Введите сообщение..." : "Войдите, чтобы писать"}
            style={styles.chatInput}
          />
          <button type="submit" disabled={!isLoggedIn} style={styles.chatButton}>
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  pageContainer: {
    minHeight: '100vh',
    padding: '20px',
    position: 'relative',
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateColumns: '1fr 300px', // Main content and calendar widget
    gap: '20px'
  },
  topRight: {
    justifySelf: 'end',
    gridRow: 1,
    gridColumn: 2
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    gridRow: 2,
    gridColumn: '1 / span 2', // Span both columns for main content
  },
  tasksSection: {
    marginBottom: '20px'
  },
  taskList: {
    listStyle: 'none',
    padding: 0,
  },
  taskItem: {
    padding: '10px',
    borderBottom: '1px solid #eee'
  },
  addButton: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  loginButton: {
    padding: '8px 16px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  logoutButton: {
    padding: '8px 16px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  calendarWidget: {
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
    alignSelf: 'start',
    gridRow: 2,
    gridColumn: 2,
  },
  chatWidget: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '300px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  },
  chatForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  chatInput: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px'
  },
  chatButton: {
    padding: '8px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  }
};

export default HomePage;