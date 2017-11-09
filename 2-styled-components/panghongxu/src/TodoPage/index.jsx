import React, { Component } from 'react';
import styled, { injectGlobal } from "styled-components";


const TodoPage = (props) => {
    return (
        <TodoApp>
            <Header>
                <h1>todos</h1>
                <InputWord type="text" onKeyDown={props.keyDownSearch} onChange={props.valueListener} value={props.inputValue} placeholder="What needs to be done?"></InputWord>
                <AddButton onClick={props.addTodoWords}>ADD</AddButton>
            </Header>
            <TodoBody primary={props.todoList.length}>
                <CheckBox type="checkbox" onClick={props.checkedAll} primary={(props.todoList.length - props.completeCount) === 0 && (props.completeCount > 0)}></CheckBox>
                <ShowListNew data={props.todoList} deleteList={props.deleteList} chooseList={props.chooseList} />
            </TodoBody>
            <Footer primary={props.todoList.length}>
                <Span>
                    <strong>{props.notCompleteCount}</strong>
                    <span></span>
                    <span>items</span>
                    <span>left</span>
                </Span>
                <UlBottom primary={props.todoList.length}>
                    <li><a className={props.botton_status === 0 ? "selected" : ""} onClick={() => props.showAll()}>All</a></li>
                    <span> </span>
                    <li><a className={props.botton_status === 1 ? "selected" : ""} onClick={() => props.active()}>Active</a></li>
                    <span> </span>
                    <li><a className={props.botton_status === 2 ? "selected" : ""} onClick={() => props.complete()}>Completed</a></li>
                </UlBottom>
                <ClearBotton onClick={() => props.clearComplete()} primary={props.completeCount}>Clear completed</ClearBotton>
            </Footer>
        </TodoApp>
    );
}

injectGlobal`
    html,
    body {
        margin: 0;
        padding: 0;
    }

    button {
        margin: 0;
        padding: 0;
        border: 0;
        background: none;
        font-size: 100%;
        vertical-align: baseline;
        font-family: inherit;
        font-weight: inherit;
        color: inherit;
        -webkit-appearance: none;
        -webkit-font-smoothing: antialiased;
        -moz-font-smoothing: antialiased;
    }

    body {
        font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
        line-height: 1.4em;
        background: #f5f5f5;
        color: #4d4d4d;
        min-width: 230px;
        max-width: 550px;
        margin: 0 auto;
        -webkit-font-smoothing: antialiased;
        -moz-font-smoothing: antialiased;
        font-weight: 300;
    }
`;
//page样式
const TodoApp = styled.div`
    outline: none;
	background: #fff;
	margin: 130px 0 40px 0;
	position: relative;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
	            0 25px 50px 0 rgba(0, 0, 0, 0.1);

    input::-webkit-input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }

    input::-moz-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }

    input::input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }

    h1 {
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
`
const Header = styled.header`
    display: block;
    
    :hover {
      cursor: pointer;
    }
`
const InputWord = styled.input`
    width: 78%;
    outline: none;
	padding: 16px 16px 16px 60px;
	border: none;
	background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    font: 24px Arial;
    cursor: auto;
    .edit {
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 44px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        outline: none;
        color: inherit;
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
    }
`
const TodoBody = styled.div`
    outline: none;  
    display: ${props => props.primary === 0 ? 'none' : 'block'};
    position: relative;
    z-index: 2;
    border-top: 1px solid #e6e6e6;
`
const CheckBox = styled.input`
    color: ${props => props.primary ? '737373' : '#e6e6e6'};
    outline: none;
	position: absolute;
	top: -55px;
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
        padding: 10px 27px 10px 27px;
    }

    :checked:before {  
    }
`
const ClearBotton = styled.button`
    display: ${props => props.primary === 0 ? 'none' : 'block'};
    float: right;
    position: relative;
    line-height: 20px;
    text-decoration: none;
    cursor: pointer;
    position: relative;
    :hover {
        text-decoration: underline;
    }
`
const AddButton = ClearBotton.extend`
    display:block;
    color: tomato;
    float:right;
    height:100%;
    width: 8%;
    line-height:60px;  
    border-radius: 2px;
    background-color:#7a7d9e;  
    :hover {
    }
`
const Footer = styled.footer`
    outline: none;
    display: ${props => props.primary === 0 ? 'none' : 'block'};
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
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
    }
`
const UlBottom = styled.ul`
    outline: none;
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    right: 0;
    left: 0;

    li {
        display: inline;
    }

    li a {
        color: inherit;
        margin: 3px;
        padding: 3px 7px;
        text-decoration: none;
        border: 1px solid transparent;
        border-radius: 3px;
        cursor: pointer;
    }

    li a.selected,li a:hover {
        border-color: rgba(175, 47, 47, 0.1);
    }

    li a.selected {
        border-color: rgba(175, 47, 47, 0.2);
    }
`
const Span = styled.span`
    float: left;
    text-align: left;
    span{
        padding-left:6px;
    }
    strong {
        font-weight: 300;
    }
`
const UlList = styled.ul`
    outline: none;
    margin: 0;
    padding: 0;
    list-style: none;

    li {
        position: relative;
        font-size: 24px;
        border-bottom: 1px solid #ededed;
    }

    li.editing {
        border-bottom: none;
        padding: 0;
    }

    li.editing .edit {
        display: block;
        width: 506px;
        padding: 13px 17px 12px 17px;
        margin: 0 0 0 43px;
    }

    li.editing .view {
        display: none;
    }

    li .toggle {
        outline: none;
        text-align: center;
        width: 40px;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        border: none; /* Mobile Safari */
        -webkit-appearance: none;
        appearance: none;
        background: none;
        height:40px;
    }

    li .toggle:after {
        content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
    }

    li .toggle:checked:after {
        content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
    }

    li label {
        white-space: pre-line;
        word-wrap: break-word;
        word-break: break-all;
        padding: 15px 60px 15px 15px;
        margin-left: 45px;
        display: block;
        line-height: 1.2;
        transition: color 0.4s;
    }

    li.completed label {
        color: #d9d9d9;
        text-decoration: line-through;
    }

    li .destroy {
        display: none;
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        width: 40px;
        margin: auto 0;
        font-size: 30px;
        color: #cc9a9a;
        margin-bottom: 11px;
        transition: color 0.2s ease-out;
        cursor: pointer;
    }

    li .destroy:hover {
        color: #af5b5e;
    }

    li .destroy:after {
        content: '×';
    }

    li:hover .destroy {
        display: block;
    }

    li .edit {
        display: none;
    }

    li.editing:last-child {
        margin-bottom: -1px;
    }

`
const ListOne = styled.div`
    display: ${props => props.primary? 'block' : 'none'};
`
const ShowListNew = (props) => {
    console.log();
    return (
        <UlList className={props.className}>
            {
                props.data.map(element1 =>
                    <ListOne key={element1.id} primary={element1.show}>
                        <li className={element1.status === "complete" ? "completed" : ""}>
                            <div className="view">
                                <input className="toggle" type="checkbox" onClick={() => props.chooseList(element1.id, props.data)} checked={element1.status === "complete" ? "checked" : ""}>
                                </input>
                                <label>{element1.content}</label>
                                <button className="destroy" onClick={() => props.deleteList(element1.id, props.data)}></button>
                            </div>
                            {/* <input className="editing edit" value={element1.content} onChange = {() => CheckedUpdateWords(element1.id, data)}></input> */}
                        </li>
                    </ListOne>
                )
            }
        </UlList>
    );
}

//生成一个用不重复的ID
const GenNonDuplicateID = () => {
    let idStr = Date.now().toString(36);
    idStr += Math.random().toString(36).substr(3);
    return idStr;
}
//动态渲染
class TodoPageActive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: [], //展示的列表[{"content":"example1","status":"active","show": true},{"content":"example2","status":"active", "show":false}];
            inputValue: "",//输入的值
            notCompleteCount: 0,//未完成的活动
            bool_check: false,//全选标志
            botton_status: 0,//按钮状态
            completeCount: 0,//已完成活动数目
        }
    }
    //监听键盘回车键
    keyDownSearch = (event) => {
        if (event.keyCode === 13) {
            let value = event.target.value;
            if (value === undefined || value === '') {
                return;
            }
            //name:名字  state:状态 active:未完成  completed:完成 
            let todoList = this.state.todoList;
            todoList.unshift({ "content": value, "status": "active", "show": true, "id": value + GenNonDuplicateID() });
            this.setState({
                todoList: todoList,
                inputValue: "",
                notCompleteCount: this.state.notCompleteCount + 1,
                completeCount: this.state.completeCount,
            });
        }
    }
    //监听输入框的值变化
    valueListener = (e) => {
        let value = e.target.value;
        this.setState({
            inputValue: value
        });
    }
    //添加活动
    addTodoWords = () => {
        let value = this.state.inputValue;
        if (value === undefined || value === '') {
            return;
        }
        //name:名字  state:状态 active:未完成  completed:完成 
        let todoList = this.state.todoList;
        todoList.unshift({ "content": value, "status": "active", "show": true, "id": value + GenNonDuplicateID() });
        this.setState({
            todoList: todoList,
            inputValue: "",
            notCompleteCount: this.state.notCompleteCount + 1,
            completeCount: this.state.completeCount,
        });
    }
    //全选（取消）
    checkedAll = () => {
        let bool = this.state.bool_check ? false : true;
        let todoList = this.state.todoList;
        let notCompleteCount = !bool ? todoList.length : 0;
        //显示状态
        let bool_show;
        let botton_status = this.state.botton_status;
        if (botton_status === 1) {//active
            bool_show = bool ? false : true;
        } else if (botton_status === 2) {//complete
            bool_show = bool ? true : false;
        } else {//all
            bool_show = true;
        }
        todoList = todoList.map(
            element => ({
                "content": element.content,
                "status": (bool ? "complete" : "active"),
                "show": bool_show,
                "id": element.id,
            })
        );
        this.setState({
            todoList: todoList,
            inputValue: "",
            completeCount: todoList.length - notCompleteCount,
            notCompleteCount: notCompleteCount,
            bool_check: bool,
        });
    }
    //显示所有
    showAll = () => {
        let todoList = this.state.todoList;
        for (let item of todoList) {
            item.show = true;
        }
        this.setState({
            todoList: todoList,
            botton_status: 0,
        });
    }
    // 显示未完成
    active = () => {
        let todoList = this.state.todoList;
        for (let item of todoList) {
            item.show = item.status === "complete" ? false : true;
        }
        this.setState({
            todoList: todoList,
            botton_status: 1,
        });
    }
    // 显示已经完成  
    complete = () => {
        let todoList = this.state.todoList;
        for (let item of todoList) {
            item.show = item.status === "active" ? false : true;
        }
        this.setState({
            todoList: todoList,
            botton_status: 2,
        });
    }
    //清除完成任务
    clearComplete = () => {
        let todoList = this.state.todoList;
        todoList = todoList.filter(element => (element.status === "active"));
        this.setState({
            todoList: todoList,
            completeCount: 0,
        });
    }
    //删除任务
    deleteList = (id, data) => {
        let count = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                if (data[i].status === "active") {
                    count = 1;
                }
                //注意删除要写在统计count记数之后
                data.splice(i, 1);
                break;
            }
        }
        this.setState({
            todoList: data,
            completeCount: data.length - (this.state.notCompleteCount - count),//写在前面
            notCompleteCount: this.state.notCompleteCount - count,
        });
    }
    // 任务勾选事件 
    chooseList = (id, data) => {
        let count = 1;
        let botton_status = this.state.botton_status;

        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                //记录完成数
                count = data[i].status === "complete" ? 1 : -1;
                //显示 隐藏
                if (botton_status === 1) {//active
                    data[i].show = data[i].status === "complete" ? true : false;
                } else if (botton_status === 2) {//complete
                    data[i].show = data[i].status === "complete" ?  false : true;
                } else {//all
                    data[i].show = true;
                }
                //状态
                data[i].status = data[i].status === "complete" ? "active" : "complete";
                break;
            }
        };
        this.setState({
            todoList: data,
            completeCount: data.length - (this.state.notCompleteCount + count),
            notCompleteCount: this.state.notCompleteCount + count,
        });
    }

    render() {
        return (
            <TodoPage
                todoList={this.state.todoList}
                inputValue={this.state.inputValue}
                notCompleteCount={this.state.notCompleteCount}
                botton_status={this.state.botton_status}
                completeCount={this.state.completeCount}

                clearComplete={this.clearComplete}
                checkedAll={this.checkedAll}
                valueListener={this.valueListener}
                keyDownSearch={this.keyDownSearch}
                addTodoWords={this.addTodoWords}
                showAll={this.showAll}
                active={this.active}
                complete={this.complete}
                deleteList={this.deleteList}
                chooseList={this.chooseList}
            />
        );
    }
}


export default TodoPageActive;
