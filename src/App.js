// import dotenv from 'dotenv'
import React,{ useState } from 'react';
import axios from 'axios';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TodoInput from './components/TodoInput';
import Showtodos from './components/ShowTodos';

const baseUrl = process.env.REACT_APP_BASE_URL;

const showToast = (message, type) => {
  if(type === 'success') {
    return toast.success(
      <div>
        <p>{message}</p>
      </div>
    );
  }
  if(type === 'error') {
    return toast.error(
      <div>
        <p>{message}</p>
      </div>
    );
  }
  else {
    return toast(
      <div>
        <p>{message}</p>
      </div>
    );
  }
}

const App = () => {
    const [todos, setTodos] = useState([]);
    const initialState = { name: '', done: false };
    const [editing, setEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(initialState);
    const [count, setCount] = useState(0);

    const addTodo = async(todo) => {
      try {
        let result = await axios.post(`${baseUrl}/add-todo`, todo);
        if(result.status === 201) {
          showToast("Todo added", 'success');
          setCount(count + 1);
          setTodos([...todos, result.data.todo])
        }
      } catch(error) {
        showToast("Error in adding todo", 'error');
      }
    }

    const editTodo = async(todo) => {
      setEditing(true);
      setCurrentTodo({ ...todo });
    }
    
    const updateTodo = async(id, updatedTodo) => {
      setEditing(false);
      try {
        let result = await axios.put(`${baseUrl}/edit-todo/${id}`, updatedTodo);
        if(result.status === 200) {
          showToast("Todo updated", 'success');
          setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)))
        }
      } catch(error) {
        showToast("Error in editing todo", 'error');
      }
    }
    
    const deleteTodo = async(id) => {
      setEditing(false);
      try {
        let result = await axios.delete(`${baseUrl}/delete-todo/${id}`);
        if(result.status === 200) {
          showToast("Todo deleted", 'success');
          setCount(count - 1);
          setTodos(todos.filter((todo) => todo._id !== id))
        }
      } catch(error) {
        showToast("Error in deleting todo", 'error');
      }
    }
  
    return (
      <>
        <div className='app-container'>
            <h1 className='heading'>TODO APP</h1>
            <hr></hr>
            <TodoInput
            addTodo={addTodo}
            editing={editing}
            setEditing={setEditing}
            currentTodo={currentTodo}
            updateTodo={updateTodo}
            />
            <Showtodos todos={todos} setTodos={setTodos} editTodo={editTodo} deleteTodo={deleteTodo} count={count} setCount={setCount}/>
        </div>
        <ToastContainer/>
      </>
    )
}

export default App; 
