import React, { Component } from 'react';
import './static/css/App.css';

//界面
function TodoMVC(props) {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Todo MVC</h1>
      </header>
      <input type="text" id="addTodoInput" style={{ marginTop: '10px' }} />

      <button onClick={() => {
        props.addTodo(document.getElementById('addTodoInput').value)
        document.getElementById('addTodoInput').value = ''
      }}>添加</button>

      <table style={{ margin: '0 auto' }} className="table">
        <tbody>
          {/*列表*/}
          {
            props.todoList.map((todo) => {
              return (
                <tr key={props.todoList.indexOf(todo)} style={{ display: props.range === todo.status ? '' : (props.range === 'all' ? '' : 'none') }} >
                  <td>
                    <input type="checkbox" checked={todo.status === 'completed'} onChange={() => {
                      props.changeTodo(props.todoList.indexOf(todo))
                    }}></input>
                  </td>
                  <td style={{ textDecoration: todo.status === 'completed' ? 'line-through' : '' }}>{todo.name}</td>
                  <td>
                    <button onClick={() => {
                      props.deleteTodo(props.todoList.indexOf(todo))
                    }}>x</button>
                  </td>
                </tr>
              )
            })
          }
          {/*列表*/}
        </tbody>
      </table>
      <span>未完成：{props.todoList.filter(e => e.status === 'active').length}条</span>
      <button style={{ color: props.range === 'all' ? 'red' : '' }} onClick={() => { props.changeRange('all') }}>全部</button>
      <button style={{ color: props.range === 'completed' ? 'red' : '' }} onClick={() => { props.changeRange('completed') }}>已完成</button>
      <button style={{ color: props.range === 'active' ? 'red' : '' }} onClick={() => { props.changeRange('active') }}>未完成</button>
    </div>
  )
}

//逻辑
class TodoMVCContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      range: 'all',  // all:全部  active:未完成  completed:完成 
    }
  }
  //添加
  addTodo = (name) => {
    if (name === undefined || name === '') {
      return;
    }
    //name:名字  state:状态 active:未完成  completed:完成 
    this.state.todoList.push({
      name: name,
      status: 'active'
    })
    console.log(this.state.todoList);
    this.setState({
      todoList: this.state.todoList
    })
  }

  //删除
  deleteTodo = (index) => {
    this.state.todoList.splice(index, 1)
    this.setState({
      todoList: this.state.todoList
    })
  }

  //修改任务状态
  changeTodo = (index) => {
    if (this.state.todoList[index].status === 'active') {
      this.state.todoList[index].status = 'completed'
    } else {
      this.state.todoList[index].status = 'active'
    }
    this.setState({
      todoList: this.state.todoList
    })
  }

  //修改范围状态
  changeRange = (range) => {
    this.setState({
      range: range
    })
  }

  render() {
    return (
      <TodoMVC
        todoList={this.state.todoList}
        range={this.state.range}
        addTodo={(name) => this.addTodo(name)}
        deleteTodo={(index) => this.deleteTodo(index)}
        changeTodo={(index) => this.changeTodo(index)}
        changeRange={(range) => this.changeRange(range)}
      />
    )
  }
}

export default TodoMVCContainer;
