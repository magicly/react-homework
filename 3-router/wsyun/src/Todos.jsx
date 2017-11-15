import React, { Component } from 'react';
import TodosContainer from './TodosUI.jsx';

class Todos extends Component {
    
    constructor(props) {
        super(props);
        this.state = this.initState(props);
    }

    initState = (props) => {
        let items = [];
        let localItems = localStorage.getItem("items");

        if(localItems){
            items = JSON.parse(localItems);
        }
        
        return {
            inputValue : "" ,//输入框的值
            filterStatus : props.filterStatus ,//筛选类型
            isAllChecked : false,//是否全选
            items : items
        }
    }

    stateToLocal = (data) => {
        localStorage.setItem("items", JSON.stringify(data||this.state.items));
    }

    pushItem = (e) => {
        if(e.keyCode === 13 && this.state.inputValue!==""){
            let items = this.state.items;
            items.push({
                name : this.state.inputValue,
                status : 'active'
            });
            this.setState({
                items:items,
                inputValue:""
            });
            this.stateToLocal();
        }
    }

    changeInputText = (e) =>{
        this.setState({ inputValue: e.target.value });
        this.stateToLocal();
    }

    updateItem = (index) => {
        let items=this.state.items;
        items[index].status = items[index].status === 'active' ? 'completed' : 'active';
        this.setState({items:items});
        this.stateToLocal();
    }
    
    delItem = (index) => {
        let items = this.state.items;
        items.splice(index,1);
        this.setState({items:items});
        this.stateToLocal();
    }
    
    checkAll = () =>{
        let checked = !this.state.isAllChecked;
        let items = this.state.items;
        items = items.map((item) => {
            item.status = checked ? 'completed' : 'active';
            return item;
        });
        this.setState({
            isAllChecked:checked,
            items:items
        });
        this.stateToLocal();
    }

    clearCompletedItem = () =>{
        let items = this.state.items.filter(e => e.status==='active');
        this.setState({items:items});
        this.stateToLocal(items);
    }

    render() {
        return <TodosContainer
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

const TodosAll = () =>{
    return <Todos filterStatus="all" />
}
const TodosActive = () =>{
    return <Todos filterStatus="active" />
}
const TodosCompleted = () =>{
    return <Todos filterStatus="completed" />
}

export {TodosAll,TodosActive,TodosCompleted};