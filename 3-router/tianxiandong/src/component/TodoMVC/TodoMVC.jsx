import React from 'react';
import LogoutContainer from './../Authorization/LogoutContainer';
import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom';

//界面
const TodoMVC = (props) => {
  return (
    <div className={props.className}>
      <LogoutContainer />

      <div className="todoapp">
        <header>
          <h1>todos</h1>
          <input type="text" className="new-todo" placeholder="What needs to be done?" value={props.inputText}
            onChange={(e) => {
              //console.log(e.currentTarget.value)
              props.changeInputText(e.currentTarget.value)
            }}
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                props.addTodo()
              }
            }}
          />
        </header>
        <section className="main">
          {
            props.todoList.length > 0 ?
              <input className="toggle-all" type="checkbox"
                checked={props.todoList.filter(e => e.status === 'completed').length === props.todoList.length}
                onChange={(e) => {
                  //console.log(e.target.checked)
                  props.changeAllStatus(e.target.checked)
                }}
              />
              : null
          }

          <ul className="todo-list">
            {/*列表*/}
            {
              props.todoList.map((todo) => {
                let isShow = props.range === todo.status ? true : (props.range === 'all' ? true : false);
                return (
                  !isShow ? null :
                    <li className={todo.status === 'completed' ? 'completed' : ''} key={todo.id}>
                      <div>
                        <input className="toggle" type="checkbox" checked={todo.status === 'completed'} onChange={() => {
                          props.changeTodo(props.todoList.indexOf(todo))
                        }} />
                        <label>{todo.name}</label>
                        <button className="destroy" onClick={() => {
                          props.deleteTodo(props.todoList.indexOf(todo))
                        }}></button>
                      </div>
                    </li>
                )
              })
            }
            {/*列表*/}
          </ul>
        </section>

        {
          props.todoList.length === 0 ? null :
            <footer className="footer">
              <span className="todo-count">
                <strong>{props.todoList.filter(e => e.status === 'active').length}</strong>
                <span> </span>
                <span>items</span>
                <span> left</span>
              </span>
              <Router>
                <ul className="filters">
                  <li><Link to="/all" className={props.range === 'all' ? 'selected' : ''} onClick={() => { props.changeRange('all') }}>All</Link></li><span> </span>
                  <li><Link to="/active" className={props.range === 'active' ? 'selected' : ''} onClick={() => { props.changeRange('active') }}>Active</Link></li><span> </span>
                  <li><Link to="/completed" className={props.range === 'completed' ? 'selected' : ''} onClick={() => { props.changeRange('completed') }}>Completed</Link></li>
                </ul>
              </Router>
              {
                props.todoList.filter(e => e.status === 'completed').length === 0 ? null :
                  <button className="clear-completed"
                    onClick={() => {
                      props.clearCompleted()
                    }}
                  >Clear completed</button>
              }
            </footer>
        }
      </div>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>Created by <a href="http://github.com/petehunt/">petehunt</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    </div>
  )
}


export default TodoMVC;
