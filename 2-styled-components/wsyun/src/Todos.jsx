import React, { Component } from 'react';
import TodosElement from './TodosUi.jsx';

class Todos extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            inputValue : "" ,//输入框的值
            filterStatus : "all" ,//筛选类型
            isAllChecked : false,//是否全选
            items : []
        }
    }

    /**
     * 添加任务
     */
    pushItem = (e) => {
        if(e.keyCode === 13 && this.state.inputValue!=""){
            let items = this.state.items;
            items.push({
                name : this.state.inputValue,
                status : 'active'
            });
            this.setState({
                items:items,
                inputValue:""
            });
        }
    }

    /**
     * 改变输入框的值
     */
    changeInputText = (e) =>{
        this.setState({ inputValue: e.target.value });
    }

    /**
     * 更新任务状态
     */
    updateItem = (index) => {
        let items=this.state.items;
        items[index].status = items[index].status === 'active' ? 'completed' : 'active';
        this.setState({items:items});
    }
    
    /**
     * 删除任务
     */
    delItem = (index) => {
        let items = this.state.items;
        items.splice(index,1);
        this.setState({items:items});
    }
    
    /**
     * 筛选任务
     */
    filterItem = (e) =>{
        this.setState({filterStatus : e.target.innerText});
    }

    /**
     * 全选
     */
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
    }

    /**
     * 清空已完成的任务
     */
    clearCompletedItem = () =>{
        let items = this.state.items.filter(e => e.status==='active');
        this.setState({items:items});
    }


    render() {
        return <TodosElement
                    inputValue={this.state.inputValue}
                    items={this.state.items}
                    filterStatus={this.state.filterStatus}
                    isAllChecked={this.state.isAllChecked}
                    changeInputText={this.changeInputText}
                    pushItem={this.pushItem}
                    updateItem={this.updateItem}
                    delItem={this.delItem}
                    filterItem={this.filterItem}
                    checkAll={this.checkAll}
                    clearCompletedItem={this.clearCompletedItem}
                />        
    }
}

export default Todos;