import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const CalendarWidget = () => {
  return (
    <div className="calendar-widget">
      <h3>Календарь</h3>
      <div className="calendar-content">
        <p>Календарь здесь</p>
        <div className="calendar-grid">
          <div className="weekdays">
            <span>Пн</span>
            <span>Вт</span>
            <span>Ср</span>
            <span>Чт</span>
            <span>Пт</span>
            <span>Сб</span>
            <span>Вс</span>
          </div>
          <div className="days">
            {[...Array(35)].map((_, i) => (
              <div key={i} className="day">
                {i % 7 === 0 ? Math.floor(i/7) + 1 : ''}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatWidget = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      // In a real app, we would send this to a server
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-widget">
      <div className="chat-header">
        <h3>Сообщения</h3>
      </div>
      <div className="chat-input-area">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Введите сообщение..."
          rows="3"
        />
        <button onClick={handleSendMessage}>Отправить</button>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const auth = useAuth();

  const handleAddTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        title: newTask,
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  if (!auth.isLoggedIn) {
    // If not logged in, we would normally redirect to login
    // For now, we'll just return a message
    return (
      <div className="not-authorized">
        <p>Для доступа к этой странице необходимо войти в систему.</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Список задач</h1>
        <button 
          className="login-btn" 
          onClick={() => {
            // Logout the user
            auth.logout();
          }}
        >
          Выйти
        </button>
      </header>

      <main className="home-main">
        <section className="tasks-section">
          <div className="add-task-form">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Добавить новую задачу..."
            />
            <button onClick={handleAddTask}>Добавить</button>
          </div>
          
          <ul className="tasks-list">
            {tasks.length === 0 ? (
              <li className="no-tasks">Задач пока нет</li>
            ) : (
              tasks.map(task => (
                <li key={task.id} className="task-item">
                  <span>{task.title}</span>
                  <button 
                    onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
                    className="delete-task"
                  >
                    Удалить
                  </button>
                </li>
              ))
            )}
          </ul>
        </section>

        <aside className="sidebar">
          <CalendarWidget />
        </aside>
      </main>

      <ChatWidget />
    </div>
  );
};

export default HomePage;