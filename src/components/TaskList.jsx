import React, { useState } from 'react';
import TaskForm from './TaskForm';
import { FaExclamationTriangle, FaExclamationCircle, FaCheckCircle, FaEdit, FaTrash, FaCalendarAlt } from 'react-icons/fa';

const TaskList = ({ tasks, groupedTasks, deleteTask, editTask, categories }) => {
  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleUpdateTask = (id, updatedTask) => {
    editTask(id, updatedTask);
    setEditingTask(null);
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'High':
        return <FaExclamationTriangle className="priority-icon high" />;
      case 'Medium':
        return <FaExclamationCircle className="priority-icon medium" />;
      case 'Low':
        return <FaCheckCircle className="priority-icon low" />;
      default:
        return null;
    }
  };

  return (
    <div className="task-list">
      {Object.entries(groupedTasks).map(([category, tasks]) => (
        <div key={category} className="category-column">
          <h2 className="category-title">{category}</h2>
          {tasks.map((task) => (
            <div key={task.id} className="task-item">
              <div className="task-details">
                <h3>
                  {getPriorityIcon(task.priority)}
                  {task.title}
                </h3>
                {task.deadline && (
                    <p className="task-deadline">
                      <FaCalendarAlt className="deadline-icon" />
                      {task.deadline}
                    </p>
                )}

                <p className="task-description">{task.description}</p>
              </div>
              <div className="task-actions">
                <button className="edit" onClick={() => handleEdit(task)}>
                  <FaEdit />
                </button>
                <button className="delete" onClick={() => deleteTask(task.id)}>
                  <FaTrash />
                </button>
              </div>
              {editingTask && editingTask.id === task.id && (
                <TaskForm
                  taskToEdit={editingTask}
                  editTask={handleUpdateTask}
                  onCancelEdit={handleCancelEdit}
                  categories={categories}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
