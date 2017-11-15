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
    let todoList = localStorage.getItem("todoList");
    if (todoList === null || todoList === "") {
      todoList = [];
    } else {
      todoList = JSON.parse(todoList);
    }

    this.state = {
      todoList: todoList,
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
    this.setLocalStorage();
    this.setState({
      todoList: this.state.todoList,
      inputText: ''
    })

  }

  //删除
  deleteTodo = (index) => {
    this.state.todoList.splice(index, 1)
    this.setLocalStorage();
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
    this.setLocalStorage();
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
    this.setLocalStorage();
    this.setState({
      todoList: this.state.todoList
    })
  }

  //清除所有完成的任务
  clearCompleted = () => {
    this.setState({
      todoList: this.state.todoList.filter(e => e.status === 'active')
    })
  }

  //任务保存到本地
  setLocalStorage = () => {
    let todoList = JSON.stringify(this.state.todoList);
    localStorage.setItem("todoList", todoList);
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
