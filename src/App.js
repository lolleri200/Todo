import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'
function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.SetItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const NewTodos = [...todos]
    const todo = NewTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(NewTodos)
  }
  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodo => {
      return [...prevTodo,{id:uuidv4(), name: name, complete:false}]
    }) 
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const NewTodos = todos.filter(todo => !todo.complete)
    setTodos(NewTodos)
  }

  return (
    <>
    <TodoList todos={todos} ToggleTodo={toggleTodo} />
    <TodoList todos={todos} />
    <input ref={todoNameRef} type="text" />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button  onClick={handleClearTodos}>Clear Complete</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;