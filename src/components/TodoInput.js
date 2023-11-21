import React, { useState, useEffect } from 'react';

const TodoInput = ({ addTodo, editing, setEditing, currentTodo, updateTodo }) => {
  const initialState = {name: '', done: false};
  const [todo, setTodo] = useState(initialState);
  const [mode, setMode] = useState('add');
  
  useEffect(() => {
    if (editing === false) {
      setMode('add');
      setTodo(initialState);
    } else {
      setMode('edit');
      setTodo(currentTodo);
    }
  }, [editing]);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setTodo({...todo, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.name) return;
    
    if (mode === 'add') {
      addTodo(todo);
    } else if (mode === 'edit') {
      updateTodo(todo._id, todo);
    }
    setTodo(initialState);
  };

  const handleCancel = () => {
    setEditing(false);
    setTodo(initialState);
  }
  
  return (
    <div className='header'>
      <form className='input-wrapper' onSubmit={handleSubmit}>
        <input
         className='input-text'
         type='text'
         name="name"
         value={todo.name}
         onChange={inputChange}
         placeholder='add todo..'
         ></input>
         {mode === 'add' ? (
            <button className="todo-btn">+Add</button>
         ) : (
          <>
            <button className="todo-btn">Update</button>
            <button className="todo-btn" onClick={handleCancel}>Cancel</button>
          </>
         )}
      </form>
    </div>
  )
}

export default TodoInput;
