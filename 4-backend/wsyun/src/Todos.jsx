import React, { Component } from 'react';
import Todos from './TodosUI.jsx';
import TodosService from './TodosService.jsx';


class TodosContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",//输入框的值
            filterStatus: props.filterStatus,//筛选类型
            isAllChecked: false,//是否全选
            items: []
        };
    }

    componentDidMount() {
        let _this = this;
        new TodosService().query(this.props.filterStatus, function (data) {
            _this.setState({ items: data });
        });
    }

    stateToLocal = (data) => {
        if (data === undefined) {
            data = this.state.items;
        }
        new TodosService().save(data);
    }

    pushItem = (e) => {
        if (e.keyCode === 13 && this.state.inputValue !== "") {
            let items = this.state.items;
            items.push({
                name: this.state.inputValue,
                status: 'active'
            });
            this.setState({
                items: items,
                inputValue: ""
            });
            this.stateToLocal();
        }
    }

    changeInputText = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    updateItem = (index) => {
        let items = this.state.items;
        items[index].status = items[index].status === 'active' ? 'completed' : 'active';
        this.setState({ items: items });
        this.stateToLocal();
    }

    delItem = (index) => {
        let items = this.state.items;
        items.splice(index, 1);
        this.setState({ items: items });
        this.stateToLocal();
    }

    checkAll = () => {
        let checked = !this.state.isAllChecked;
        let items = this.state.items;
        items = items.map((item) => {
            item.status = checked ? 'completed' : 'active';
            return item;
        });
        this.setState({
            isAllChecked: checked,
            items: items
        });
        this.stateToLocal();
    }

    clearCompletedItem = () => {
        let items = this.state.items.filter(e => e.status === 'active');
        this.setState({ items: items });
        this.stateToLocal(items);
    }

    render() {
        return <Todos
            inputValue={this.state.inputValue}
            items={this.state.items}
            filterStatus={this.state.filterStatus}
            isAllChecked={this.state.isAllChecked}
            changeInputText={this.changeInputText}
            pushItem={this.pushItem}
            updateItem={this.updateItem}
            delItem={this.delItem}
            checkAll={this.checkAll}
            clearCompletedItem={this.clearCompletedItem}
        />
    }
}

const TodosAll = () => {
    return <TodosContainer filterStatus="all" />
}
const TodosActive = () => {
    return <TodosContainer filterStatus="active" />
}
const TodosCompleted = () => {
    return <TodosContainer filterStatus="completed" />
}

export { TodosAll, TodosActive, TodosCompleted };