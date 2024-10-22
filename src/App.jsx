import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts';
import TodoForm from './components/TodoFrom';
import TodoItem from './components/TodoItem';

function App() {

  // Create Todo state for store to do list
  const [todos, setTodos] = useState([]);

  // set functionality of addTodo funtion
  const addTodo=(todo)=>{

    setTodos((prev)=>[{id:Date.now(),...todo},...prev])
  }

  // update todo list using id
  const updateTodo=(id,todo)=>{
    setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id===id?todo:prevTodo)));
  }

  //delete the todo least using id
  const deleteTodo=(id)=>{
    setTodos((prev)=>prev.filter((todo)=>todo.id!==id))
  }

  // just underline on completed task using toggleComplete
  const toggleComplete=(id)=>{
    setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id===id?{...prevTodo, completed:!prevTodo.completed}:prevTodo)));
  }

  // code 1
  useEffect(() => {
   const todos=JSON.parse( localStorage.getItem("todos"))
   if(todos && todos.length > 0){
    setTodos(todos)
   }

  },[])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])


  


  return (
    <TodoProvider value={{todos,addTodo,deleteTodo,updateTodo, toggleComplete}}>
    <div className="bg-[#172842] min-h-screen py-8">
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
        <div className="mb-4">
          {/* Todo form goes here */}
          <TodoForm/>
        </div>
        <div className="flex flex-wrap gap-y-3">
          {/*Loop and Add TodoItem here */}
          {todos.map((todo)=>(
            <div key={todo.id}
            className='w-full'>
              <TodoItem todo={todo}/>
            </div>
          ))}
        </div>
      </div>
    </div>
    </TodoProvider>
  )
}

export default App
