import { useState, useEffect } from "react";

function TaskManger() {
  const [tasks, setTasks] = useState(() => {
    const d = JSON.parse(localStorage.getItem("task"));
    return typeof d == "object" && d ? d : [];
  });
  const [inputText, setInputText] = useState("");
  const [editingId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });
  
  useEffect(() => {
    localStorage.setItem('task', JSON.stringify(tasks));
  }, [tasks]);
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    if (newMode) {
      document.body.style.backgroundColor = "#2b2828";
      document.body.style.color = "#fff";
    } else {
      document.body.style.backgroundColor = "#fff";
      document.body.style.color = "#2b2828";
    }
  };

  const filteredTasks = tasks.filter(task => 
    task.text.toLowerCase().includes(searchText.toLowerCase())
  );

  const addTask = () => {
    if (inputText.trim() === "") return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: inputText,
        done: false
      }
    ]);
    setInputText("");
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
    if (editingId === id) {
      setEditId(null);
    }
  };

  const saveEdit = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, text: editText } : t
    ));
    setEditId(null);
    setEditText("");
  };

  const startEditing = (task) => {
    setEditId(task.id);
    setEditText(task.text);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
  };

  const toggleDone = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  const showTask = (t) => {
    if (editingId === t.id) {
      return (
        <div>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            style={darkMode ? { backgroundColor: "#333", color: "#fff", border: "1px solid #555" } : {}}
          />
          <button onClick={() => saveEdit(t.id)}>✅</button>
          <button onClick={cancelEdit}>Отмена</button>
        </div>
      );
    } else {
      return (
        <div>
          <input
            type="checkbox"
            checked={t.done}
            onChange={() => toggleDone(t.id)}
          />
          <span>{t.text}</span>
          <button onClick={() => startEditing(t)}>📝</button>
          <button onClick={() => removeTask(t.id)}>❌</button>
        </div>
      );
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
        <button 
          onClick={toggleTheme}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            backgroundColor: darkMode ? "#fff" : "#333",
            color: darkMode ? "#333" : "#fff",
            border: "none",
            borderRadius: "4px"
          }}
        >
          {darkMode ? "☀️ Светлая тема" : "🌙 Темная тема"}
        </button>
      </div>
      <h2>Менеджер задач</h2>
      <div>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={darkMode ? { backgroundColor: "#838282", color: "#fff", border: "1px solid #6c00f8" } : {}}
        />
        <button onClick={addTask}>Добавить задачу</button>
      </div>
      <div>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Поиск задач"
          style={darkMode ? { backgroundColor: "#838282", color: "#ffffff", border: "1px solid #6c00f8" } : {}}
        />
      </div>
      <ul>
        {filteredTasks.map((t) => (
          <li key={t.id}>{showTask(t)}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManger;