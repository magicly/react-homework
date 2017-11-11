import React, {Component} from 'react';
import styled, {injectGlobal} from 'styled-components';

import ListTable from './ListTable.jsx';
import StatusFilterBar from './StatusFilterBar.jsx';
import TodoForm from './TodoForm.jsx';
import StorageService from './StorageService';

injectGlobal`
    body {
        font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
        line-height: 1.4em;
        background: #f5f5f5;
        color: #4d4d4d;
        min-width: 230px;
        max-width: 550px;
        margin: 0 auto;
        font-smoothing: antialiased;
        font-weight: 300;
        padding: 0;
    }
    input:matches([type="radio"], [type="checkbox"]){
        margin-top: 3px;
        margin-right: 2px;
        margin-bottom: 3px;
        margin-left: 2px;
        padding-top: initial;
        padding-right: initial;
        padding-bottom: initial;
        padding-left: initial;
        background-color: initial;
        border-top-color: initial;
        border-top-style: initial;
        border-top-width: initial;
        border-right-color: initial;
        border-right-style: initial;
        border-right-width: initial;
        border-bottom-color: initial;
        border-bottom-style: initial;
        border-bottom-width: initial;
        border-left-color: initial;
        border-left-style: initial;
        border-left-width: initial;
    }
    input{
        margin-top: 0em;
        margin-right: 0em;
        margin-bottom: 0em;
        margin-left: 0em;
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        font-family: -apple-system;
        font-variant-caps: normal;
        color: initial;
        letter-spacing: normal;
        word-spacing: normal;
        line-height: normal;
        text-transform: none;
        text-indent: 0px;
        text-shadow: none;
        display: inline-block;
        text-align: start;
        -webkit-writing-mode: horizontal-tb !important;
        outline: none;
    }
    ul {
        display: block;
        list-style-type: disc;
        -webkit-margin-before: 1em;
        -webkit-margin-after: 1em;
        -webkit-margin-start: 0px;
        -webkit-margin-end: 0px;
        -webkit-padding-start: 40px;
    }
    li {
        display: list-item;
        text-align: -webkit-match-parent;
    }
    label {
        cursor: default;
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
        appearance: none;
        font-smoothing: antialiased;
        outline: none;
    }
`
const Todoapp = styled.section`
    background: #fff;
    margin: 130px 0 40px 0;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`
const STORAGE_KEY = 'todos';
class TodoListContainer extends Component {
    constructor(props) {
        super(props);
        StorageService.init(STORAGE_KEY);
        this.todos = StorageService.getItems(STORAGE_KEY);
        this.state = {
            todoInput: '',
            isCheckedAll: false,
            todosToShow: [],
            showClear: false,
            currentAction: 'all',
        };
    }

    componentDidMount() {
        const { pathname } = this.props.location;
        const action = pathname !== '/' ? pathname.substr(1) : 'all';
        let todoArr = this.todos;
        if(pathname === '/active') {
            todoArr = this.todos.filter(value => !value.checked);
        }
        if(pathname === '/completed') {
            todoArr = this.todos.filter(value => value.checked);
        }
        this.setState({
            todosToShow: todoArr,
            showClear: todoArr.length > 0,
            currentAction: action
        });
    }
    
    handleInputDone = (e) => {
        const ENTER_KEY = 13;
        if(e.keyCode !== ENTER_KEY) {
            return ;
        }
        e.preventDefault();
        let newID = 0;
        if(this.todos.length > 0) {
            newID = this.todos[0].id + 1;
        }
        this.todos = StorageService.addItem(STORAGE_KEY, {checked: false, content: e.currentTarget.value, id: newID});
        this.setState({
            todoInput: e.currentTarget.value,
            todosToShow: this.todos,
        });
        e.currentTarget.value = '';
    }
    handleAllCheckChange = (e) => {
        this.todos.map(value => value.checked = e.currentTarget.checked);
        StorageService.setItems(STORAGE_KEY, this.todos);
        this.setState({
            isCheckedAll: e.currentTarget.checked,
            showClear: e.currentTarget.checked,
            todosToShow: this.todos,
        });
    }
    handleRemove = (e) => {
        this.todos = this.todos.filter(value => !value.checked);
        StorageService.setItems(STORAGE_KEY, this.todos);
        const showTodos = this.state.todosToShow.filter(value => !value.checked);
        this.setState({todosToShow: showTodos, showClear: false});
    }
    handleFilter = (code) => {
        let todoArr = this.todos;
        if(code === 'active') {
            todoArr = this.todos.filter(value => !value.checked);
        }
        if(code === 'completed') {
            todoArr = this.todos.filter(value => value.checked);
        }
        this.setState({todosToShow: todoArr});
    }
    handleItem = (status, todoId) => {
        this.todos.forEach(function(element) {
            if(element.id === todoId) {
                element.checked = status;
            }
        }, this);
        StorageService.setItems(STORAGE_KEY, this.todos);
        let clearShowStatus = this.todos.filter(e => e.checked).length > 0;
        this.setState({todosToShow: this.todos, showClear: clearShowStatus});
    }
    handleItemRemove = (todoId) => {
        this.todos = this.todos.filter(e => e.id !== todoId);
        StorageService.setItems(STORAGE_KEY, this.todos);
        let clearShowStatus = this.todos.filter(e => e.checked).length > 0;
        this.setState({todosToShow: this.todos, showClear: clearShowStatus});
    }
    render() {
        return (
            <Todoapp>   
                <TodoForm handleInputDone={this.handleInputDone} handleAllCheckChange={this.handleAllCheckChange}/>
                <ListTable todoList={this.state.todosToShow} handleItem={this.handleItem} handleItemRemove={this.handleItemRemove}/>
                <StatusFilterBar todosCount={this.todos.filter(e => !e.checked).length}
                        showClear={this.state.showClear}
                        action={this.state.currentAction}
                        handleRemove={this.handleRemove} 
                        handleFilter={this.handleFilter}/>
            </Todoapp>
        );
    };
}

export default TodoListContainer;