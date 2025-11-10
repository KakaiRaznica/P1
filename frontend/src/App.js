import React, { useState } from "react";
import { FiUser, FiMessageCircle, FiX, FiPlus } from "react-icons/fi";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Начальные данные (недели и дни)
  const [weeks, setWeeks] = useState([
    { id: 1, days: generateWeekTasks() },
    { id: 2, days: generateWeekTasks() },
    { id: 3, days: generateWeekTasks() },
  ]);

  function generateWeekTasks() {
    const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    return days.map((day) => ({ name: day, tasks: [] }));
  }

  const addTask = (weekIndex, dayIndex, task) => {
    const updated = [...weeks];
    updated[weekIndex].days[dayIndex].tasks.push(task);
    setWeeks(updated);
  };

  return (
    <div style={styles.container}>
      {/* ---------- Шапка ---------- */}
      <header style={styles.header}>
        <div style={styles.logo}>MyPlanner</div>
        <button
          onClick={() => setShowLogin(!showLogin)}
          style={styles.iconButton}
        >
          <FiUser size={24} />
        </button>
      </header>

      {/* ---------- Окно авторизации ---------- */}
      {showLogin && (
        <div style={styles.modalOverlay} onClick={() => setShowLogin(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Авторизация</h2>
            <input type="text" placeholder="Email" style={styles.input} />
            <input type="password" placeholder="Пароль" style={styles.input} />
            <button style={styles.loginButton}>Войти</button>
          </div>
        </div>
      )}

      {/* ---------- Основная часть (Планировщик) ---------- */}
      <main style={styles.main}>
        <h2>Планировщик по неделям</h2>
        <div style={styles.calendarContainer}>
          {weeks.map((week, wIdx) => (
            <div key={week.id} style={styles.weekRow}>
              {week.days.map((day, dIdx) => (
                <DayColumn
                  key={day.name}
                  day={day}
                  onAddTask={(task) => addTask(wIdx, dIdx, task)}
                />
              ))}
            </div>
          ))}
        </div>
      </main>

      {/* ---------- Виджет чата ---------- */}
      <div style={styles.chatWidget}>
        {showChat ? (
          <div style={styles.chatWindow}>
            <div style={styles.chatHeader}>
              <span>Чат с Ollama</span>
              <button
                onClick={() => setShowChat(false)}
                style={styles.closeButton}
              >
                <FiX />
              </button>
            </div>
            <div style={styles.chatBody}>
              <p>💬 Здесь будет чат с Ollama...</p>
            </div>
          </div>
        ) : (
          <button onClick={() => setShowChat(true)} style={styles.chatButton}>
            <FiMessageCircle size={24} />
          </button>
        )}
      </div>
    </div>
  );
}

// ---------- Компонент одного дня ----------
function DayColumn({ day, onAddTask }) {
  const [newTask, setNewTask] = useState("");
  return (
    <div style={styles.dayColumn}>
      <div style={styles.dayHeader}>{day.name}</div>
      <ul style={styles.taskList}>
        {day.tasks.map((t, i) => (
          <li key={i} style={styles.taskItem}>
            {t}
          </li>
        ))}
      </ul>
      <div style={styles.addTask}>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Новое дело..."
          style={styles.taskInput}
        />
        <button
          onClick={() => {
            if (newTask.trim()) {
              onAddTask(newTask);
              setNewTask("");
            }
          }}
          style={styles.addButton}
        >
          <FiPlus />
        </button>
      </div>
    </div>
  );
}

// ---------- Стили ----------
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f7fa",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    backgroundColor: "#2d89ef",
    color: "white",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
  },
  iconButton: {
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
  main: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
  },
  calendarContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginTop: "20px",
  },
  weekRow: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "10px",
  },
  dayColumn: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
  },
  dayHeader: {
    fontWeight: "bold",
    marginBottom: "8px",
    textAlign: "center",
  },
  taskList: {
    listStyle: "none",
    padding: 0,
    flex: 1,
    overflowY: "auto",
  },
  taskItem: {
    backgroundColor: "#e9f3ff",
    margin: "4px 0",
    padding: "6px",
    borderRadius: "5px",
  },
  addTask: {
    display: "flex",
    alignItems: "center",
    marginTop: "8px",
  },
  taskInput: {
    flex: 1,
    padding: "6px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  addButton: {
    backgroundColor: "#2d89ef",
    border: "none",
    color: "white",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    marginLeft: "6px",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "300px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  loginButton: {
    backgroundColor: "#2d89ef",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
  chatWidget: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
  },
  chatButton: {
    backgroundColor: "#2d89ef",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "55px",
    height: "55px",
    cursor: "pointer",
    boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
  },
  chatWindow: {
    width: "300px",
    height: "400px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
    overflow: "hidden",
  },
  chatHeader: {
    backgroundColor: "#2d89ef",
    color: "white",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chatBody: {
    padding: "15px",
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
};

export default App;
