import React, {Component} from 'react';

import ListTable from './ListTable.jsx';
import StatusFilterBar from './StatusFilterBar.jsx';

class TodoListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoInput: '',
            isCheckedAll: false,
            todosToShow: [],
            todos: []
        };
    }
    handleKeyDown = (e) => {
        const ENTER_KEY = 13;
        if(e.keyCode !== ENTER_KEY) {
            return ;
        }
        e.preventDefault();
        let origin = this.state.todos;
        let newID = 0;
        if(origin.length > 0) {
            newID = origin[origin.length-1].id + 1;
        }
        origin.push({checked: false, content: e.currentTarget.value, id: newID});
        this.setState({
            todoInput: e.currentTarget.value,
            todos: origin,
            todosToShow: origin,
        });
        e.currentTarget.value = '';
    };
    handleCheckboxChange = (e) => {
        let todoArr = this.state.todos;
        todoArr.map(value => value.checked = e.currentTarget.checked);
        this.setState({
            isCheckedAll: e.currentTarget.checked,
            showClear: e.currentTarget.checked,
            todos: todoArr,
            todosToShow: todoArr,
        });
    }
    handleRemove = (e) => {
        //清除所有已选择的任务
        let todoArr = this.state.todos;
        todoArr = todoArr.filter(value => value.checked !== true);
        this.setState({todos: todoArr, todosToShow: todoArr});
    }
    handleFilter = (e) => {
        let todoArr = this.state.todos;
        if(e.currentTarget.value === 'active') {
            todoArr = this.state.todos.filter(value => value.checked !== true);
        }
        if(e.currentTarget.value === 'completed') {
            todoArr = this.state.todos.filter(value => value.checked === true);
        }
        this.setState({todosToShow: todoArr});
    }
    handleItem = (status, todoId) => {
        let todoArr = this.state.todos;
        todoArr.forEach(function(element) {
            if(element.id === todoId) {
                element.checked = status;
            }
        }, this);
        let clearShowStatus = todoArr.filter(e => e.checked).length > 0;
        this.setState({todos: todoArr, todosToShow: todoArr, showClear: clearShowStatus});
    }
    handleItemRemove = (todoId) => {
        let todoArr = this.state.todos.filter(e => e.id !== todoId);
        this.setState({todos: todoArr, todosToShow: todoArr});
    }
    render() {
        return (
            <div>
                <h1>TodoMVC <span style={{"fontSize": "14px"}}>by zhaodanfeng</span></h1>
                <form className="inputForm">
                    <input className="todoInputClass" type="text" placeholder="少年，你要做甚？" onKeyDown={this.handleKeyDown}/>
                    <input type="checkbox" onChange={this.handleCheckboxChange}/>{' '}全选
                </form>
                {/*ListTableComponent*/}
                <ListTable todoList={this.state.todosToShow} handleItem={this.handleItem} handleItemRemove={this.handleItemRemove}/>
                {/*StatusFilterBarComponent */}
                <StatusFilterBar
                    todosCount={this.state.todos.filter(e => !e.checked).length}
                    showClear={this.state.showClear} 
                    handleRemove={this.handleRemove}
                    handleFilter={this.handleFilter}
                    />
            </div>
        );
    };
}

export default TodoListContainer;