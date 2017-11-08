import React, { Component } from 'react';
import styled from "styled-components";


const TodoPage = (props) => {
    return (
        <TodoApp>
            <Header>
                <h1>todos</h1>
                <InputWord type="text" onKeyDown={props.keyDownSearch} onChange={props.valueListener} value={props.inputValue} placeholder="What needs to be done?"></InputWord>
                <AddButton onClick={props.addTodoWords}>+</AddButton>
            </Header>
            <TodoBody primary={props.todoList.length}>
                <CheckBox type="checkbox" onClick={props.checkedAll} primary={(props.todoList.length - props.completeCount) === 0 && (props.completeCount > 0)}></CheckBox>
                <ShowListNew data={props.todoList} deleteList={props.deleteList} chooseList={props.chooseList} showUpdateEvent={props.showUpdateEvent} hideUpdateEvent={props.hideUpdateEvent} updateWords={props.updateWords}/>
            </TodoBody>
            <Footer primary={props.todoList.length}>
                <Span>
                    <strong>{props.notCompleteCount}</strong>
                    <span></span>
                    <span>items</span>
                    <span>left</span>
                </Span>
                <UlBottom primary={props.todoList.length}>
                    <li><a className={props.botton_status === "all" ? "selected" : ""} onClick={() => props.showAll()}>All</a></li>
                    <span> </span>
                    <li><a className={props.botton_status === "active" ? "selected" : ""} onClick={() => props.active()}>Active</a></li>
                    <span> </span>
                    <li><a className={props.botton_status === "complete" ? "selected" : ""} onClick={() => props.complete()}>Completed</a></li>
                </UlBottom>
                <ClearBotton onClick={() => props.clearComplete()} primary={props.completeCount}>Clear completed</ClearBotton>
            </Footer>
        </TodoApp>
    );
}

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
    display:inline;
    width:75%;
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
        font-size: 44px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        outline: none;
        color: inherit;
        box-sizing: border-box;
    }
    @media screen and (min-width: 430px) {
        width:50%;
    }

    @media (min-width: 430px) {
        width:50%;
    }
`
const AddButton = styled.button`
    outline:none;
    display:inline;
    color: tomato;
    float:right;
    height:100%;
    width:6%;
    line-height:60px;  
    border-radius: 2px;
    background-color:#e8e8e8;  
    cursor: pointer;
    position: relative;
    left:0px;
    top:0px;
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
    line-height: 20px;
    text-decoration: none;
    cursor: pointer;
    position: relative;
    :hover {
        text-decoration: underline;
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
    z-index: 2;
    li {
        position: relative;
        font-size: 24px;
        border-bottom: 1px solid #ededed;
    }

    li.editing {
        border-bottom: 1px solid #ededed;
        padding: 0;
    }

    li.editing .edit {
        display: block;
        width: 468px;
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

    li label[for='toggle'] {
        display: none;
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
        margin-bottom: 0px;
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
    display: ${props => props.primary ? 'block' : 'none'};
`
const ShowListNew = (props) => {
    return (
        <UlList className={props.className}>
            {
                props.data.map(element1 =>
                    <ListOne key={element1.id} primary={element1.show}>
                        <li className={(element1.status === "complete" ? "completed " : "")+ (element1.editor ? "editing " : "")}>
                            <div className="view">
                                <input className="toggle" 
                                    readOnly="true" type="checkbox" 
                                    onClick={() => props.chooseList(element1.id, props.data)}     
                                    checked={element1.status === "complete" ? "checked" : ""}>
                                </input>
                                <label 
                                    onDoubleClick={() => props.showUpdateEvent(element1.id, props.data)} >{element1.content}
                                </label>
                                <button className="destroy" 
                                    onClick={() => props.showUpdateEvent(element1.id, props.data)}>
                                </button>
                            </div>
                            <input className="edit" id={element1.id}
                                defaultValue={element1.content} 
                                onBlur = {() => props.hideUpdateEvent(element1.id, props.data)}
                                onChange={props.updateWords}>
                            </input>
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
class TodoPageComponent extends Component {
    constructor(props) {
        super(props);

        let todoList = localStorage.getItem("todoList");
        let completeCount = 0;
        let bool_checkAll = false;
        if (todoList !== "" && todoList !== null) {
            todoList = JSON.parse(todoList);
            completeCount = todoList.filter(item => item.status === "complete").length;
            bool_checkAll = todoList.length === todoList.filter(item => item.status === "complete").length;
        } else {
            todoList = [];
        }
        let botton_status = localStorage.getItem("botton_status");
        if (botton_status === "" || botton_status === null) {
            botton_status = "all";
        }
        this.state = {
            todoList: todoList, //展示的列表[{"content":"example1","status":"active","show": true},{"content":"example2","status":"active", "show":false}];
            inputValue: "",//输入的值
            notCompleteCount: todoList.length-completeCount,//未完成的活动
            bool_checkAll: bool_checkAll,//全选标志
            botton_status: botton_status,//按钮状态
            completeCount: completeCount,//已完成活动数目
        }
    }
    // 存储到浏览器， 刷新页面数据不丢失
    setLocalStorage = (todoList,botton_status) => {
        localStorage.setItem("todoList", JSON.stringify(todoList));
        if(botton_status !== null) {
            localStorage.setItem("botton_status", botton_status);
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
            //判断是否显示
            let botton_status = this.state.botton_status;
            let show = true;
            if (botton_status === "complete") {
                show =false;
            }
            todoList.unshift({ "content": value, "status": "active", "show": show,editor:false, "id": value + GenNonDuplicateID() });
            this.setState({
                todoList: todoList,
                inputValue: "",
                notCompleteCount: this.state.notCompleteCount + 1,
                completeCount: this.state.completeCount,
            });
            this.setLocalStorage(todoList,botton_status);
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
        //判断是否显示
        let botton_status = this.state.botton_status;
        let show = true;
        if (botton_status === "complete") {
            show =false;
        }
        todoList.unshift({ "content": value, "status": "active", "show": show, "id": value + GenNonDuplicateID() });
        this.setState({
            todoList: todoList,
            inputValue: "",
            notCompleteCount: this.state.notCompleteCount + 1,
            completeCount: this.state.completeCount,
        });
        this.setLocalStorage(todoList,botton_status);
    }
    //显示修改
    showUpdateEvent = (id, data) =>{
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                data[i].editor = true;
                break;
            }
        }
        this.setState({
            todoList: data,
        });
        this.setLocalStorage(data,this.state.botton_status);
    }
    //隐藏修改
    hideUpdateEvent = (id, data) =>{
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                data[i].editor = false;
                break;
            }
        }
        this.setState({
            todoList: data,
        });
        this.setLocalStorage(data,this.state.botton_status);
    }
    //修改活动内容
    updateWords = (e) =>{
        let content = e.target.value;
        let id = e.target.id;
        let data = this.state.todoList;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                data[i].content = content;
                data[i].editor = false;
                break;
            }
        }
        this.setState({
            todoList: data,
        });
        this.setLocalStorage(data,this.state.botton_status);
    }
    //全选（取消）
    checkedAll = () => {
        let bool = this.state.bool_checkAll ? false : true;
        let todoList = this.state.todoList;
        let notCompleteCount = !bool ? todoList.length : 0;
        //显示状态
        let bool_show;
        let botton_status = this.state.botton_status;
        if (botton_status === "active") {
            bool_show = bool ? false : true;
        } else if (botton_status === "complete") {
            bool_show = bool ? true : false;
        } else {
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
            bool_checkAll: bool,
        });
        this.setLocalStorage(todoList,botton_status);
    }
    //显示所有
    showAll = () => {
        let todoList = this.state.todoList;
        for (let item of todoList) {
            item.show = true;
        }
        this.setState({
            todoList: todoList,
            botton_status: "all",
        });
        this.setLocalStorage(todoList,"all");
    }
    // 显示未完成
    active = () => {
        let todoList = this.state.todoList;
        for (let item of todoList) {
            item.show = item.status === "complete" ? false : true;
        }
        this.setState({
            todoList: todoList,
            botton_status: "active",
        });
        this.setLocalStorage(todoList,"active");
    }
    // 显示已经完成  
    complete = () => {
        let todoList = this.state.todoList;
        for (let item of todoList) {
            item.show = item.status === "active" ? false : true;
        }
        this.setState({
            todoList: todoList,
            botton_status: "complete",
        });
        this.setLocalStorage(todoList,"complete");
    }
    //清除完成任务
    clearComplete = () => {
        let todoList = this.state.todoList;
        todoList = todoList.filter(element => (element.status === "active"));
        let botton_status = todoList.length<1 ? "all" : this.state.botton_status;
        this.setState({
            todoList: todoList,
            completeCount: 0,
            botton_status: botton_status,
        });
        this.setLocalStorage(todoList,botton_status);
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
        let botton_status = data.length<1 ? "all" : this.state.botton_status;
        this.setState({
            todoList: data,
            completeCount: data.length - (this.state.notCompleteCount - count),//写在前面
            notCompleteCount: this.state.notCompleteCount - count,
            botton_status: botton_status,
        });
        this.setLocalStorage(data,botton_status);
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
                if (botton_status === "active") {
                    data[i].show = data[i].status === "complete" ? true : false;
                } else if (botton_status === "complete") {
                    data[i].show = data[i].status === "complete" ? false : true;
                } else {
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
        this.setLocalStorage(data,botton_status);
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
                hideUpdateEvent={this.hideUpdateEvent}
                showUpdateEvent={this.showUpdateEvent}
                updateWords={this.updateWords}
            />
        );
    }
}


export default TodoPageComponent;
