import React, { Component } from 'react';
import './Todos.css';

const Item = (props) => {
    let name = props.status ?  <del>{props.name}</del> : <font>{props.name}</font>;
    
    return (
        <div className={props.className}>
            <input type="checkbox" id={"chk"+props.index} checked={props.status} onChange={props.onChange} />
            <label htmlFor={"chk"+props.index}>{name}</label>
            <a onClick={props.onDelete}>del</a>
        </div>
    );
}

class Todos extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inputValue : "" ,//输入框的值
            filterStatus : "all" ,//筛选类型
            items : [],
            className : {  //筛选按钮className
                all : "checked", 
                active : "",
                completed : ""    
            }
        }
    }

    /**
     * 添加任务
     */
    pushItem = () => {
        let items = this.state.items;
        items.push({
            name : this.state.inputValue,
            status : false
        });
        this.setState({
            items:items,
            inputValue:""
        });
    }

    /**
     * 回车时添加任务
     */
    enterPushItem = (e) =>{
        if(e.keyCode === 13){
            this.pushItem();
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
        items[index].status = items[index].status ? false : true;
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
    filterItem = (value) =>{
        let className = this.state.className;
        for(let key in className){
            className[key] = key===value ? "checked" : "";
        }

        this.setState({
            filterStatus : value,
            className : className
        });
    }

    /**
     * 清空已完成的任务
     */
    clearCompletedItem = () =>{
        let items = this.state.items.filter(e => e.status===false);
        this.setState({items:items});
    }

    render() {

        return (
            <div className="box">
                <div className="box-additem">
                    <input type="text" value={this.state.inputValue} onKeyDown={this.enterPushItem} onChange={this.changeInputText} />
                    <button onClick={this.pushItem}>add</button>
                </div>

                <div className="box-items">
                    {
                        this.state.items.map((item,index) => 
                            <Item 
                                key={index}
                                index={index}
                                name={item.name} 
                                status={item.status} 
                                className={this.state.filterStatus==="all"||this.state.filterStatus===item.status?"":"hide"}
                                onChange={()=>{this.updateItem(index)}} 
                                onDelete={()=>{this.delItem(index)}} 
                            />
                        ) 
                    }
                </div>

                <div className="box-state">
                    <label>{this.state.items.reduce((total, value) => total + (value.status ? 0 : 1), 0)} items</label>

                    <button onClick = {() => { this.filterItem('all') }} 
                            className={this.state.className.all}>all</button>
                    <button onClick = {() => { this.filterItem(false) }} 
                            className={this.state.className.active}>active</button>
                    <button onClick = {() => { this.filterItem(true) }} 
                            className={this.state.className.completed}>completed</button>

                    <button onClick = {this.clearCompletedItem}>clearCompleted</button>
                </div>
            </div>
        )
    }
}

export default Todos;