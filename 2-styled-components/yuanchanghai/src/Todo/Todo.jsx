import React, { Component } from 'react';
import styled, {injectGlobal} from 'styled-components';
import TodoHeader from './TodoHeader.jsx';
import TodoSection from './TodoSection.jsx';
import TodoFooter from './TodoFooter.jsx';
//CSS全局样式用的
injectGlobal`
    html,body {
      margin: auto;
      padding: 0;
      font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
      line-height: 1.4em;
      background: #f5f5f5;
      color: #4d4d4d;
      min-width: 230px;
      max-width: 550px;
      -webkit-font-smoothing: antialiased;
      -moz-font-smoothing: antialiased;
      font-smoothing: antialiased;
      font-weight: 300;
    }
`;
const Todo = styled.div`
    background: #fff;
    margin: 130px 0 40px 0;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
    0 25px 50px 0 rgba(0, 0, 0, 0.1);
    h1{
        position: absolute;
        top: -155px;
        width: 100%;
        font-size: 100px;
        font-weight: 100;
        text-align: center;
        color: rgba(175, 47, 47, 0.15);
        -webkit-text-rendering: optimizeLegibility;
        -moz-text-rendering: optimizeLegibility;
        text-rendering: optimizeLegibility;
    }
    input::-webkit-input-placeholder,input::-moz-placeholder,input::input-placeholder{
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }
    input{
    }
`;
//数量计算
function todoNumber(arr, f) {
    let newArr = [];
    for (let i = 0; i < arr.length; i += 1) {
        if (f(arr[i])) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
//删除、修改
function todoTaskOperation(arr, f, operation) {
    for (let i = 0; i < arr.length; i += 1) {
        if(operation === "save"){
            if (f(arr[i])) {
                arr[i].inpState = true;
            }
            if (f(arr[i])) {
                arr[i].inpState = false;
            }
        }else{
            if (f(arr[i])) {
                arr.splice(i, 1);
            }
        }
    }
    return arr;
}
//显示状态
function todoAccording(arr, f) {
    for (let i = 0; i < arr.length; i += 1) {
        if (f(arr[i])) {
            arr[i].show = false;
        }else{
            arr[i].show = true;
        }
    }
    return arr;
}
class TodoData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inpValue: [],
            count:0,
            inputValue:"",
            todoState:1,
            inputState:false,
        }
    }
    //全选
    allTodo = () => {
        const inputState = this.state.inputState;
        const array = this.state.inpValue;
        if(inputState){
            this.state.inputState = false;
            for (let i = 0; i < array.length; i++) {
                array[i].inpState = false;
            }
            this.state.count = array.length;
        }else{
            this.state.inputState = true;
            for (let i = 0; i < array.length; i++) {
                array[i].inpState = true;
            }
            this.state.count = 0;
        }
        this.setState({inpValue: array});
    };
    //输入框的键盘监听 //添加TodoTask
    handleKeyUp = (event) => {
        const valOne = event.target.value;
        const val = valOne.replace(/(^\s+)|(\s+$)/g,"");
        if( event.keyCode ===13 ){
            if(!val){
                return false;
            }
            const inp =  this.state.inputValue;
            const array = this.state.inpValue;
            const arr = todoNumber(array, e => e.name === inp);
            const arrLength = arr.length;
            if (arrLength > 0) {
                alert("重复值")
                return false;
            }
            array.push({id:array.length + 1,name: inp, inpState: false, show:true});
            event.target.value = "";
            const arr2 = todoNumber(array, e => e.inpState === false);
            this.state.count = arr2.length;
            this.setState({inpValue: array});
        }else{
            this.state.inputValue = val;
        }
    };
    //删除TodoTask
    deleteTodoTask = (name) => {
        const array = this.state.inpValue;
        const arr = todoTaskOperation(array, e => e.name === name, "delete");
        const arr2 = todoNumber(array, e => e.inpState === false);
        this.state.count = arr2.length;
        this.setState({inpValue: arr});
    };
    //修改Todo状态
    saveTodoState = (name, inpState) => {
        const array = this.state.inpValue;
        let arr = [];
        if(!inpState){
            arr = todoTaskOperation(array, e => e.inpState === false  && e.name === name, "save");
        }else{
            arr = todoTaskOperation(array, e => e.inpState === true  && e.name === name, "save");
        }
        const arr2 = todoNumber(array, e => e.inpState === false);
        this.state.count = arr2.length;
        this.setState({inpValue: arr});
    };
    //完成TodoTask
    completeTodoTask = () => {
        const array = this.state.inpValue;
        const arr = todoAccording(array, e => e.inpState === false);
        this.state.todoState = 2;
        this.setState({inpValue: arr});
    };
    //未完成TodoTask
    unfinishedTodoTask = () => {
        const array = this.state.inpValue;
        const arr = todoAccording(array, e => e.inpState === true);
        this.state.todoState = 3;
        this.setState({inpValue: arr});
    };
    //全部TodoTask
    allTodoTask = () => {
        const array = this.state.inpValue;
        for (let i = 0; i < array.length; i++) {
            array[i].show = true;
        }
        this.state.todoState = 1;
        this.setState({inpValue: array});
    };
    render() {
        return (
            <Todo>
                <TodoHeader
                    handleKeyUp = {this.handleKeyUp}
                    allTodo ={this.allTodo}
                />
                <TodoSection
                    list = {this.state.inpValue}
                    saveTodoState = {this.saveTodoState}
                    deleteTodoTask = {this.deleteTodoTask}
                />
                <TodoFooter
                    count = {this.state.count}
                    todoState = {this.state.todoState}
                    completeTodoTask = {this.completeTodoTask}
                    unfinishedTodoTask = {this.unfinishedTodoTask}
                    allTodoTask = {this.allTodoTask}
                />
            </Todo>
        )
    }
}
export default TodoData;
