import './style.scss'
import { useState } from 'react'

function App() {
  const [todos, addTodos]=useState([])
  const [todo, setTodo]=useState('')
  const [showPending, showTodo]=useState(true)

  const addToDo = () =>{
    addTodos([...todos, {id:Date.now(), todo: todo, status:false}])
    setTodo('')
  }
  const makeTodo = (e) =>{
    setTodo(e.target.value)
  }
  const getPendingTodos = () =>{
    showTodo(true)
  }
  const getCompletedTodos = () =>{
    showTodo(false)
  }
  const changeStatus = (id) =>{
    const updatedTodos = todos.map(todo=>
      todo.id==id? {...todo, status:!todo.status}:todo
    )
    addTodos(updatedTodos)
  }
  const removeTodo = (id) =>{
    const updatedTodos = todos.filter(todo=>todo.id!=id)
    addTodos(updatedTodos)
  }
  const editTodo = (todo,id) =>{
    const updatedTodos = todos.filter(todo=>
      todo.id!=id
    )
    addTodos(updatedTodos)
    setTodo(todo)
  }

  return(
    <div className="main">
      <div className="todoBox">
        <div className="todoHeading">
          To-Do List
        </div>
        <div className="todoAdd">
          <input value={todo} type="text" onChange={makeTodo}/>
          <i onClick={addToDo} class="bi bi-plus-circle"></i>
        </div>
        <div className="todosMain">
          <div className="todos">
            <div className="todoCat">
              <div onClick={getPendingTodos} className="todoPending">
                Pending Tasks
              </div>
              <div onClick={getCompletedTodos} className="todoDone">
                Completed Tasks
              </div>
            </div>
            <div className="allTodos">

              {showPending? (
                todos.slice().reverse().map(todo=>{
                  if(!todo.status){
                    return(
                      <div className="todoList" style={{backgroundColor:'#ff4d4d'}}>
                        <div className="todoDesc">
                          <p>{todo.todo}</p>
                        </div>
                        <div className="todoAction">
                          <i class="bi bi-check-circle-fill doneTodo" onClick={()=>changeStatus(todo.id)}></i>
                          <i class="bi bi-pencil-fill" onClick={()=>editTodo(todo.todo, todo.id)}></i>
                        </div>
                      </div>
                    )
                  }
                })
              ) : (
                todos.slice().reverse().map(todo=>{
                  if(todo.status){
                    return(
                      <div className="todoList" style={{backgroundColor:'#26da71'}}>
                        <div className="todoDesc">
                          <p>{todo.todo}</p>
                        </div>
                        <div className="todoAction">
                          <i class="bi bi-x-circle-fill cancelTodo" onClick={()=>removeTodo(todo.id)}></i>
                        </div>
                      </div>
                    )
                  }
                })
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
