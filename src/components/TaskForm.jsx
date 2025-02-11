import React, { useState, useEffect } from 'react';

const TaskForm = ({ addTask, editTask, taskToEdit, onCancelEdit, categories }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [newCategory, setNewCategory] = useState(''); // Separate state for new category

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDeadline(taskToEdit.deadline);
      setCategory(taskToEdit.category);
      setPriority(taskToEdit.priority);
      setNewCategory(''); // Reset new category
    }
  }, [taskToEdit]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    if (e.target.value !== 'new') {
      setNewCategory(''); // Clear new category input if an existing category is selected
    }
  };

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a title for the task.');
      return;
    }

    // Determine the final category
    const finalCategory = category === 'new' ? newCategory : category;

    if (!finalCategory.trim()) {
      alert('Please select or enter a category.');
      return;
    }

    const newTask = {
      title,
      description,
      deadline,
      category: finalCategory,
      priority,
    };

    if (taskToEdit) {
      editTask(taskToEdit.id, newTask);
    } else {
      addTask(newTask);
    }

    // Reset form fields
    setTitle('');
    setDescription('');
    setDeadline('');
    setCategory('');
    setPriority('Medium');
    setNewCategory('');

    if (onCancelEdit) {
      onCancelEdit();
    }
  };

    const handleCancel = () => {
        setTitle('');
        setDescription('');
        setDeadline('');
        setCategory('');
        setPriority('Medium');
        setNewCategory('');

        if (onCancelEdit) {
            onCancelEdit();
        }
    }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        placeholder="Deadline"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <select value={category} onChange={handleCategoryChange}>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
        <option value="new">Add New Category</option>
      </select>

      {/* New Category Input */}
      {category === 'new' && (
        <input
          type="text"
          placeholder="Enter New Category"
          value={newCategory}
          onChange={handleNewCategoryChange}
        />
      )}

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <div className="button-group">
        <button type="submit">{taskToEdit ? 'Update' : 'Add'}</button>
        <button type="button" className="cancel" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default TaskForm;
