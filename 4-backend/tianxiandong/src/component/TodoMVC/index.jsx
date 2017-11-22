import React, { Component } from 'react';
import StyledTodoMVC from './StyledTodoMVC';


//逻辑
class TodoMVCContainer extends Component {
  constructor(props) {
    super(props);
    let range = props.range;
    if (!(range === 'all' || range === 'active' || range === 'completed')) {
      range = 'all';
    }
    //从localStorage 获取数据
    // let todoList = localStorage.getItem("todoList");
    // if (todoList === null || todoList === "") {
    //   todoList = [];
    // } else {
    //   todoList = JSON.parse(todoList);
    // }
    this.getTODOs();


    this.state = {
      todoList: [],
      range: range,  // all:全部  active:未完成  completed:完成
      inputText: '',//输入框内容
    }
  }

  //修改输入框内容
  changeInputText = (text) => {
    this.setState({
      inputText: text
    })
  }

  //添加
  addTodo = () => {
    if (this.state.inputText === '') {
      return;
    }
    //name:名字  state:状态 active:未完成  completed:完成
    this.state.todoList.unshift({
      id: new Date().getTime(),
      name: this.state.inputText,
      status: 'active'
    })
    console.log(this.state.todoList);
    this.setTODOs(this.state.todoList);
    this.setState({
      todoList: this.state.todoList,
      inputText: ''
    })

  }

  //删除
  deleteTodo = (index) => {
    this.state.todoList.splice(index, 1)
    this.setTODOs(this.state.todoList);
    this.setState({
      todoList: this.state.todoList
    })
  }

  //修改任务状态
  changeTodo = (index) => {
    let todo = this.state.todoList[index];
    if (todo.status === 'active') {
      todo.status = 'completed'
    } else {
      todo.status = 'active'
    }
    this.setTODOs(this.state.todoList);
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

  //完成所有任务
  changeAllStatus = (checkboxStatus) => {
    let status = 'active';
    if (checkboxStatus) {  //如果全选框选中，则表示全部完成
      status = 'completed';
    }
    for (let todo of this.state.todoList) {
      todo.status = status;
    }
    this.setTODOs(this.state.todoList);
    this.setState({
      todoList: this.state.todoList
    })
  }

  //清除所有完成的任务
  clearCompleted = () => {
    let todoList = this.state.todoList.filter(e => e.status === 'active');
    this.setTODOs(todoList);
    this.setState({
      todoList: todoList
    })
  }

  //任务保存
  setTODOs = (todoList) => {
    // let todoList = JSON.stringify(this.state.todoList);
    // localStorage.setItem("todoList", todoList);
    //改成存到网络中 start
    todoList = JSON.stringify(todoList)
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var request = new Request('http://cloudapi.yoloke.com/rest/todo/set-todos.json', {
      headers: headers,
      method: "POST",
      body: JSON.stringify({
        userId: '15198898989',
        todosJson: todoList
      })
    });
    fetch(request).then(function (response) {
      return response.json();
    }).then(function (json) {
      console.log(json);
    });
    //end
  }

  //网络获取
  getTODOs = () => {
    //改成从网络中获取 start
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let request = new Request('http://cloudapi.yoloke.com/rest/todo/get-todos.json', {
      headers: headers,
      method: "POST",
      body: JSON.stringify({
        userId: '15198898989'
      })
    });
    fetch(request).then(
      response => response.json()
    ).then(
      json => {
        // console.log(JSON.stringify(json.data.todos[0].todosJson));
        // console.log(json.data.todos[0].todosJson);
        let todosJson = json.data.todos[0].todosJson;
        if (todosJson !== null && todosJson !== "") {
          console.log(todosJson);
          let todoList = JSON.parse(todosJson);
          this.setState({
            todoList: todoList
          })
        }
      }
      );
  }

  render() {
    return (
      <StyledTodoMVC
        todoList={this.state.todoList}
        range={this.state.range}
        inputText={this.state.inputText}
        changeInputText={(text) => this.changeInputText(text)}
        addTodo={() => this.addTodo()}
        deleteTodo={(index) => this.deleteTodo(index)}
        changeTodo={(index) => this.changeTodo(index)}
        changeRange={(range) => this.changeRange(range)}
        changeAllStatus={(checkboxStatus) => this.changeAllStatus(checkboxStatus)}
        clearCompleted={() => this.clearCompleted()}
      />
    )
  }
}

export default TodoMVCContainer;
