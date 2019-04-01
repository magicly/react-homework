import React, { Component } from 'react';
import styled, {injectGlobal} from 'styled-components';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom';
//头部样式
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
const StyledCheckbox = styled.input`
    outline: none;
    position: absolute;
    z-index: 99;
    top: 20px;
    left: -12px;
    width: 60px;
    height: 34px;
    text-align: center;
    border: none;
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-appearance: none;
    appearance: none;
    :before {
    content: '❯';
    font-size: 22px;
    color: #e6e6e6;
    padding: 10px 27px 10px 27px;
    }
    :checked:before {
      color: #737373;
    }
`;
//内容样式
const Section = styled.section`
    position: relative;
    z-index: 2;
    border-top: 1px solid #e6e6e6;
`;
const Ul = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`;
const Li = styled.li`
    position: relative;
    font-size: 24px;
    border-bottom: 1px solid #ededed;
    display:block;
    input{
        text-align: center;
        width: 40px;
        /* auto, since non-WebKit browsers doesn't support input styling */
        height: auto;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        border: none; /* Mobile Safari */
        -webkit-appearance: none;
        appearance: none;
    }
     input[type="checkbox"]{
         outline: none;
     }
    input:after {
      content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
    }
    input:checked:after {
      content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
    }
    label {
      white-space: pre-line;
      word-break: break-all;
      padding: 15px 60px 15px 15px;
      margin-left: 45px;
      display: block;
      line-height: 1.2;
      transition: color 0.4s;
    }
    :hover button {
      display: block;
    }
`;
const Button = styled.button`
    border: 0;
    background: none;
    display: none;
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    width: 40px;
    height: 40px;
    margin: auto 0;
    font-size: 30px;
    color: #cc9a9a;
    margin-bottom: 11px;
    transition: color 0.2s ease-out;
    :hover {
      color: #af5b5e;
    }
    :after {
      content: '×';
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
                if(arr[i].inpState === true){
                    arr[i].inpState = false;
                }else{
                    arr[i].inpState = true;
                }
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

//Todo头部
class TodoHeader extends Component {
    state = {
        loginState : localStorage.getItem("login"),
        inpValue:[],
        count: 0,
        completingcount: 0,
        inputValue: "",
        inputState: false,
        todoState:"1",
    }
    //
    //输入框的键盘监听
    handleKeyUp = (event) => {
        const valOne = event.target.value;
        const val = valOne.replace(/(^\s+)|(\s+$)/g,"");
        if( event.keyCode ===13 ){
            if(!val){
                return false;
            }
            this.getData();
            let students = this.state.inpValue;
            students.push({id:students.length + 1,name: val, inpState: false, show:true});
            const arr2 = todoNumber(students, e => e.inpState === false);
            let count = arr2.length;
            this.setState({count:count,inpValue: students});
            let setData = this.setData(this.state);
        }
    };
    //全选
    allTodo = () => {
        const inputState = this.state.inputState;
        let inputState1;
        let count;
        let completingcount;
        const loginState = localStorage.getItem("inpValue");
        let students = JSON.parse(loginState);
        if(inputState){
            inputState1 = false;
            for (let i = 0; i < students.length; i++) {
                students[i].inpState = false;
            }
            completingcount = 0;
            count = students.length;
        }else{
            inputState1 = true;
            for (let i = 0; i < students.length; i++) {
                students[i].inpState = true;
            }
            completingcount = students.length;
            count = 0;
        }
        const jsonStudents = JSON.stringify(students);
        localStorage.setItem('inpValue', jsonStudents);
        localStorage.setItem('count', count);
        localStorage.setItem('completingcount', completingcount);
        this.setState({
            inputState:inputState1,
            count:count,
            completingcount:completingcount,
            inpValue: jsonStudents,
        });
    };
    //修改Todo状态
    saveTodoState = (id) => {
        const loginState = localStorage.getItem("inpValue");
        let students = JSON.parse(loginState);
        const arr = todoTaskOperation(students, e => e.id == id, "save");
        const jsonStudents = JSON.stringify(arr);
        localStorage.setItem('inpValue', jsonStudents);
        const arr2 = todoNumber(arr, e => e.inpState === false);
        const arr3 = todoNumber(arr, e => e.inpState === true);
        const count = arr2.length;
        const completingcount = arr3.length;
        localStorage.setItem('count', count);
        localStorage.setItem('completingcount', completingcount);
        this.setState({count:count,completingcount:completingcount,inpValue:arr});
    };
    //删除TodoTask
    deleteTodoTask = (id) => {
        const loginState = localStorage.getItem("inpValue");
        const students = JSON.parse(loginState);
        const del = todoTaskOperation(students, e => e.id === id, "delete");
        const arr2 = todoNumber(del, e => e.inpState === false);
        const arr3 = todoNumber(del, e => e.inpState === true);
        const count = arr2.length;
        const completingcount = arr3.length;
        const jsonStudents = JSON.stringify(del);
        localStorage.setItem('inpValue', jsonStudents);
        localStorage.setItem('count', count);
        localStorage.setItem('completingcount', completingcount);
        this.setState({count:count,completingcount:completingcount,inpValue:del});
    };
    //完成TodoTask
    completeTodoTask = () => {
        const loginState = localStorage.getItem("inpValue");
        let students = JSON.parse(loginState);
        const arr = todoAccording(students, e => e.inpState === false);
        const jsonStudents = JSON.stringify(arr);
        localStorage.setItem('inpValue', jsonStudents);
        localStorage.setItem('todoState', 2);
        let state = localStorage.getItem("todoState");
        this.setState({todoState:state,inpValue: arr});
    };
    //未完成TodoTask
    unfinishedTodoTask = () => {
        const loginState = localStorage.getItem("inpValue");
        let students = JSON.parse(loginState);
        const arr = todoAccording(students, e => e.inpState === true);
        const jsonStudents = JSON.stringify(arr);
        localStorage.setItem('inpValue', jsonStudents);
        localStorage.setItem('todoState', 3);
        this.setState({todoState:localStorage.getItem("todoState"),inpValue: arr});
    };
    //全部TodoTask
    allTodoTask = () => {
        const loginState = localStorage.getItem("inpValue");
        let students = JSON.parse(loginState);
        for (let i = 0; i < students.length; i++) {
            students[i].show = true;
        }
        const jsonStudents = JSON.stringify(students);
        localStorage.setItem('inpValue', jsonStudents);
        localStorage.setItem('todoState', 1);
        this.setState({todoState:localStorage.getItem("todoState"),inpValue: students});
    };
    //存数据
    setData = (data) => {
        fetch('http://cloudapi.yoloke.com/rest/todo/set-todos.json',{
               method:"POST",
                body:JSON.stringify(
                    {
                        "userId":"yuanchanghai",
                        "todos":JSON.stringify(data)
                }
            ),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(data => {
            console.log(data);
        })
        .then(error  => {
            console.log(data);
        });
    }
    //取数据
    getData = () => {
        const url = "http://cloudapi.yoloke.com/rest/todo/get-todos.json";
        fetch(url, {
              method: "POST",
              body: JSON.stringify({ userId: "yuanchanghai"}),
              headers: {
                "Content-Type": "application/json"
              }
        })
        .then(response => {
            return response.json();
        })
        .then(json => {
            console.log(json);
            let Data = json.data.todos;
            if (Data.length > 0) {
                  this.setState(Data);
                }
            })
        .catch(error => {
            console.log(1);
        });
    };
    //确定成功
    completing = () => {
        const array = this.state.inpValue;
        let newArr = [];
        for (let i = 0; i < array.length; i += 1) {
            if (array[i].inpState === false) {
                newArr.push(array[i]);
            }
        }
        const completingcount = 0;
        localStorage.setItem('completingcount', completingcount);
        this.setState({completingcount:completingcount,inpValue: newArr});
    };
    outLogin = () => {
        localStorage.removeItem('login');
        this.setState({loginState:false});
    }
    render() {
        if(!this.state.loginState){
            return <Redirect to="/" />
        }
        return (
            <div>
                <header>
                    <h1>Todo任务</h1>
                    <StyledCheckbox onClick={this.allTodo} type="checkbox"/>
                    <Input onKeyUp = {this.handleKeyUp} placeholder="输入内容"/>
                </header>
                <Section>
                    <Ul>
                        {this.state.inpValue.map(
                            todoData => {
                                return (
                                    <Li key={todoData.id} style={{display:todoData.show ? 'block':'none'}}>
                                        <div>
                                            <input type='checkbox' checked={todoData.inpState}
                                                   onClick={listTodoState =>{this.saveTodoState(todoData.id)}}/>
                                            <label
                                                style={{color:todoData.inpState ? '#d9d9d9':'', 'text-decoration':todoData.inpState ? 'line-through':''}}>
                                                {todoData.name}
                                            </label>
                                            <Button
                                                className="destroy"
                                                onClick={listDeleteTodo =>{this.deleteTodoTask(todoData.id)}}>
                                            </Button>
                                        </div>
                                    </Li>
                                )
                            }
                        )}
                    </Ul>
                </Section>
                <Router>
                    <Footer>
                        <Span>
                            <strong>{this.state.count}个未完成任务</strong>
                        </Span>
                        <FooterUl>
                            <li>
                                <FooterLink state={this.state.todoState === '1' ? true : false} to="/all" onClick={this.allTodoTask}>全部</FooterLink>
                            </li>
                            <li>
                                <FooterLink state={this.state.todoState === '2' ? true : false} to="/complete" onClick={this.completeTodoTask}>完成</FooterLink>
                            </li>
                            <li>
                                <FooterLink state={this.state.todoState === '3' ? true : false} to="/unfinished" onClick={this.unfinishedTodoTask}>未完成</FooterLink>
                            </li>
                            <li>
                                <LoginBtn onClick={this.outLogin}>退出</LoginBtn>
                            </li>
                        </FooterUl>
                        <FooterButton completingcount={this.state.completingcount === 0 ? false : true} onClick={this.completing}>确认完成</FooterButton>
                    </Footer>
                </Router>
            </div>
        )
    }
};
//Todo底部样式
const LoginBtn = styled.button`
    display:inline-block;
    float: right;
    background:#77FFFF;
    color: #fff;
    margin: 0px 20% 0px 0px;
    padding: 3px 7px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;
`;
const Footer = styled.footer`
    color: #777;
    padding: 10px 15px;
    height: 20px;
    text-align: center;
    border-top: 1px solid #e6e6e6;
    :before {
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 50px;
        overflow: hidden;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
        0 8px 0 -3px #f6f6f6,
        0 9px 1px -3px rgba(0, 0, 0, 0.2),
        0 16px 0 -6px #f6f6f6,
        0 17px 2px -6px rgba(0, 0, 0, 0.2);
    }
`;
const Span = styled.span`
    float: left;
    text-align: left;
    strong {
        font-weight: 300;
    }
}
`;
const FooterUl = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    right: 0;
    left: 0;
    li{
        display: inline;
    }
`;
const FooterLink = styled(Link)`
    color: inherit;
    margin: 3px;
    padding: 3px 7px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;
    border-color: ${props => props.state ? 'rgba(175, 47, 47, 0.1)' : ""};
    :hover {
        border-color: rgba(175, 47, 47, 0.1);
    }
`;
const FooterButton = styled.button`
    float: right;
    outline: none;
    border: 0;
    background: none;
    display:${props => props.completingcount ? 'block' : 'none'};
    line-height: 20px;
    text-decoration: none;
    cursor: pointer;
    position: relative;
    :hover {
        text-decoration: underline;
    }
`;
export default TodoHeader;
