import React, {Component} from 'react';

import ListTable from './ListTable.jsx';
import StatusFilterBar from './StatusFilterBar.jsx';
import TodoForm from './TodoForm.jsx';

class TodoListContainer extends Component {
    constructor(props) {
        super(props);
        this.todos = [];
        this.state = {
            todoInput: '',
            isCheckedAll: false,
            todosToShow: []
        };
    }
    handleInputDone = (value) => {
        let newID = 0;
        if(this.todos.length > 0) {
            newID = this.todos[this.todos.length-1].id + 1;
        }
        this.todos.unshift({checked: false, content: value, id: newID});
        this.setState({
            todoInput: value,
            todosToShow: this.todos,
        });
    }
    handleAllCheckChange = (status) => {
        this.todos.map(value => value.checked = status);
        this.setState({
            isCheckedAll: status,
            showClear: status,
            todosToShow: this.todos,
        });
    }
    handleRemove = (e) => {
        this.todos = this.todos.filter(value => !value.checked);
        this.setState({todosToShow: this.todos});
    }
    handleFilter = (e) => {
        let todoArr = this.todos;
        if(e.currentTarget.value === 'active') {
            todoArr = this.todos.filter(value => !value.checked);
        }
        if(e.currentTarget.value === 'completed') {
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
        let clearShowStatus = this.todos.filter(e => e.checked).length > 0;
        this.setState({todosToShow: this.todos, showClear: clearShowStatus});
    }
    handleItemRemove = (todoId) => {
        this.todos = this.todos.filter(e => e.id !== todoId);
        this.setState({todosToShow: todoArr});
    }
    render() {
        return (
            <div>
                <h1>TodoMVC <span style={{"fontSize": "14px"}}>by zhaodanfeng</span></h1>
                <TodoForm  handleInputDone={this.handleInputDone} handleAllCheckChange={this.handleAllCheckChange}/>
                <ListTable todoList={this.state.todosToShow} handleItem={this.handleItem} handleItemRemove={this.handleItemRemove}/>
                <StatusFilterBar
                    todosCount={this.todos.filter(e => !e.checked).length}
                    showClear={this.state.showClear} 
                    handleRemove={this.handleRemove}
                    handleFilter={this.handleFilter}
                    />
            </div>
        );
    };
}

export default TodoListContainer;