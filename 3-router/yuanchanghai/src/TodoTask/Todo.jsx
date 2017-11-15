import React, { Component } from 'react';
import styled, {injectGlobal} from 'styled-components';
import TodoHeader from './TodoHeader.jsx';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom';
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
            completingcount:0,
            inputValue:"",
            todoState:1,
            inputState:false,
        }
    }
    //全部TodoTask
    allTodoTask = () => {
        const array = this.state.inpValue;
        for (let i = 0; i < array.length; i++) {
            array[i].show = true;
        }
        const todoState = 1;
        this.setState({todoState:todoState,inpValue: array});
    };
    //确定成功
    completing = () => {
        const loginState = localStorage.getItem("inpValue");
        let students = JSON.parse(loginState);
        let newArr = [];
        for (let i = 0; i < students.length; i += 1) {
            if (students[i].inpState === false) {
                newArr.push(students[i]);
            }
        }
        const jsonStudents = JSON.stringify(newArr);
        localStorage.setItem('inpValue', jsonStudents);
        const completingcount = 0;
        this.setState({completingcount:completingcount,inpValue: newArr});
    };
}
const TodoFooter = (props) => {
    return (
        <Router>
            <Todo>
                <Route exact path="/" component={LoginTodo}/>
                <Route path="/all" component={TodoHeader}/>
                <Route path="/complete" component={TodoHeader}/>
                <Route path="/unfinished" component={TodoHeader}/>
            </Todo>
        </Router>
    );
};
class LoginTodo extends React.Component{
    state = {
        loginState : false,
        login:"",
        password:"",
    }
    loginUp = (event) => {
        const valOne = event.target.value;
        this.setState({login:valOne});
    };
    passwordUp = (event) => {
        const valOne = event.target.value;
        this.setState({password:valOne});
    };
    loginBtn = () => {
        const login = this.state.login;
        const password = this.state.password;
        if(login == ""){
            alert("请输入账号！");
            return false;
        }
        if(password == ""){
            alert("请输入密码！");
            return false;
        }
        setTimeout(() =>{
            localStorage.removeItem('login');
            localStorage.setItem("login", true);
            const loginState = localStorage.getItem("login");
            this.setState({loginState:loginState});
        },10);
    };
    render() {
        if(this.state.loginState){
            return <Redirect to="/all" />
        }
        return (
            <div>
                <header>
                    <h1>Todo登录</h1>
                    <Input onKeyUp={this.loginUp}  placeholder="账号" />
                    <Input onKeyUp={this.passwordUp}  placeholder="密码" />
                </header>
                <LoginBtn onClick={this.loginBtn}>登录</LoginBtn>
                <div style={{clear:"both"}} ></div>
            </div>
        )
    }
}
const Input = styled.input`
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    outline: none;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    font-smoothing: antialiased;
    padding: 16px 16px 16px 60px;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
`
const LoginBtn = styled.button`
    display:inline-block;
    float: right;
    background:#77FFFF;
    color: #fff;
    margin: 10px 20% 10px 0px;
    padding: 3px 7px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;
`;
export default TodoFooter;
