import { useState } from "react";

function TaskManger() {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState("");
  const [editingId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const addTask = () => {
    if (inputText.trim() === "") return; 
    setTasks([

      ...tasks,
      { 
        id: Math.round(Math.random() * 10000000), 
        text: inputText, 
        done: false
      },
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
          />
          <button onClick={() => saveEdit(t.id)}>
            ✅
          </button>
          <button onClick={cancelEdit}>
            Отмена
          </button>
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
          <span>
            {t.text}
          </span>
          <button onClick={() => startEditing(t)}>
            📝
          </button>
          <button onClick={() => removeTask(t.id)}>
            ❌
          </button>
        </div>
      );
    }
  };

  return (
    <div>
      <h2>Менеджер задач</h2>
      
      <div>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={addTask}>
          Добавить задачу
        </button>
      </div>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {showTask(t)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManger;