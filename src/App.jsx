import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ConfirmationMessage from './components/ConfirmationMessage';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [showForm, setShowForm] = useState(false);
    const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

    const showConfirmation = (message) => {
        setConfirmation(message);
        setTimeout(() => {
            setConfirmation(null);
        }, 3000); // Hide after 3 seconds
    };

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setShowForm(false);
        showConfirmation('Task added successfully!');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
        showConfirmation('Task deleted successfully!');
  };

  const editTask = (id, updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
        showConfirmation('Task updated successfully!');
  };

  const groupedTasks = tasks.reduce((groups, task) => {
    const category = task.category || 'Uncategorized';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(task);
    return groups;
  }, {});

  const categories = [...new Set(tasks.map((task) => task.category || 'Uncategorized'))];

  return (
    <div className="container">
      <h1>My To-Do List</h1>
      <button className="add-task-button" onClick={() => setShowForm(true)}>
        Add Task
      </button>

      {showForm && (
        <div className="overlay">
          <div className="overlay-content">
            <button className="close-button" onClick={() => setShowForm(false)}>
              &times;
            </button>
            <TaskForm addTask={addTask} categories={categories} onCancelEdit={() => setShowForm(false)} />
          </div>
        </div>
      )}

      <TaskList
        tasks={tasks}
        groupedTasks={groupedTasks}
        deleteTask={deleteTask}
        editTask={editTask}
        categories={categories}
      />
            {confirmation && <ConfirmationMessage message={confirmation} />}
    </div>
  );
}

export default App;
