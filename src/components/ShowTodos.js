import React, { useEffect } from 'react';

const ShowTodos = ({ todos, setTodos, editTodo, deleteTodo, count, setCount }) => {  

  const handleChange = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) =>
        todo._id === id ? { ...todo, done: !todo.done } : todo
      );
    });
  };
  useEffect(() => {
    const remainingTodos = todos.filter(todo => !todo.done);
    setCount(remainingTodos.length);
  }, [todos, setCount]);

  return (
    <>
      {todos && todos.length > 0 ? (
        <div className='show-tasks'>
          <h3>Todo List</h3>
          {todos.map((todo) => (
              <div key={todo._id} className="todo-item">
                <input
                  type="checkbox"
                  name="done"
                  checked={todo.done}
                  onChange={()=>{handleChange(todo._id)}}
                />
                {todo.done}
                <span>{todo.name}</span>
                <button onClick={() => {editTodo(todo)}} className="button muted-button">
                  Edit
                </button>
                <button onClick={() => {deleteTodo(todo._id)}} className="button muted-button">
                  Delete
                </button>
              </div>
          ))}
          <p>Remaining todos are: {count}</p>
        </div>
      ) : ''}
    </>
  );
}

export default ShowTodos;