import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import FormContainer from './FormContainer'
import ListContainer from './ListContainer'
import FilterContainer from './FilterContainer'
import UserContainer from './UserContainer'

const SectionBody = styled.section`
background: #fff;
margin: 130px 0 40px 0;
position: relative;
box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`
class TodoComponent extends Component {
    constructor(props) {
        super(props);                
        this.filterStatus = props.filterStatus;
        this.id = 0;
        
        this.listOriginal = localStorage.getItem("todo") === null ? [] : JSON.parse(localStorage.getItem("todo"));
        let newlist = this.listOriginal;

        if (props.filterStatus!=null) {
            newlist = this.listOriginal.filter(x=>x.iscomplete===this.filterStatus);
        }
        if(this.listOriginal!=null && this.listOriginal.length>0){
            this.id = this.listOriginal[this.listOriginal.length-1].id;
        }
        this.state = {
            loginStauts: this.loginStauts,
            filterStatus: this.filterStatus,
            itemcount: this.listOriginal.filter(x=>x.iscomplete===false).length,
            list: newlist
        };
    }
    handlerAdd = (e) => {
        if (e.keyCode == 13) {
            let value = e.target.value;
            if (!value) return false;
            this.id = this.id + 1;
            let item = {
                id: this.id, //任务主键标识
                text: value, //任务名称
                iscomplete: false //任务状态 false = 未完成 ，true = 已完成
            };
            e.target.value = "";
            this.listOriginal.push(item);
            let newlist = this.listOriginal;
            if (this.state.filterStatus != null) {
                newlist = this.listOriginal.filter(x => x.iscomplete === this.state.filterStatus);
            }
            localStorage.setItem("todo", JSON.stringify(newlist));
            console.log("dd:"+this.state.filterStatus);
            this.setState(
                {
                    filterStatus: this.state.filterStatus,
                    itemcount: this.state.itemcount + 1,
                    list: newlist
                }
            )
        }
    }
    handlerComplete = (item) => {
        let flag = !item.iscomplete;
        this.listOriginal.map((obj, index) => {
            if (obj.id === item.id) {
                obj.iscomplete = flag;
            }
        })
        let newlist = this.listOriginal;
        localStorage.setItem("todo", JSON.stringify(this.listOriginal));
        console.log("this.state.filterStatus="+this.state.filterStatus);
        if (this.state.filterStatus != null) {
            newlist = this.listOriginal.filter(x => x.iscomplete === this.state.filterStatus);
        }      
        this.setState(
            {
                filterStatus: this.state.filterStatus,
                list: newlist,
                itemcount: this.listOriginal.filter(x => x.iscomplete === false).length
            }
        )
    }
    handlerCheckAll = () => {
        let checkCount = this.listOriginal.filter(x => x.iscomplete === true).length;
        let completeflag = checkCount == this.listOriginal.length ? false : true;
        this.listOriginal.map((obj, index) => {
            obj.iscomplete = completeflag;
        })
        localStorage.setItem("todo", JSON.stringify(this.listOriginal));
        this.setState(
            {
                filterStatus: this.state.filterStatus,
                list: this.listOriginal,
                itemcount: this.listOriginal.filter(x => x.iscomplete === false).length
            }
        )
    }
    handlerDel = (item) => {
        this.listOriginal = this.listOriginal.filter(x => x.id != item.id)//原始数组同时更新
        let newlist = this.listOriginal;
        if (this.state.filterStatus != null) {
            newlist = this.listOriginal.filter(x => x.iscomplete === this.state.filterStatus);
        }
        localStorage.setItem("todo", JSON.stringify(newlist));
        this.setState({
            list: newlist,
            filterStatus: this.state.filterStatus,
            itemcount: this.listOriginal.filter(x => x.iscomplete === false).length
        })
    }
    handlerDelAll = () => {
        this.listOriginal = this.state.list.filter(x => x.iscomplete === false);
        localStorage.setItem("todo", JSON.stringify(this.listOriginal));
        this.setState({
            filterStatus: this.state.filterStatus,
            list: this.listOriginal,
            itemcount: this.listOriginal.length
        })
    }
    handlerFilter = (type) => {
        let newlist = [];
        if (type == 0) {
            this.state.filterStatus = null;
            newlist = this.listOriginal //全部
        }
        else if (type == 1) { //未完成任务
            this.state.filterStatus = false;
            newlist = this.listOriginal.filter(x => x.iscomplete === this.state.filterStatus)
        } if (type == 2) {  //已完成任务
            this.state.filterStatus = true;
            newlist = this.listOriginal.filter(x => x.iscomplete === this.state.filterStatus)
        }
        this.setState(
            {
                filterStatus: this.state.filterStatus,
                list: newlist
            }
        )
    }
    render() {
        return (
            <SectionBody>    
                <UserContainer />           
                <FormContainer handlerAdd={this.handlerAdd} />
                <ListContainer
                    list={this.state.list}
                    handlerCheckAll={this.handlerCheckAll}
                    handlerComplete={this.handlerComplete}
                    handlerDel={this.handlerDel}
                />
                <FilterContainer
                    itemcount={this.state.itemcount}
                    list={this.listOriginal}
                    filterStatus={this.state.filterStatus}
                    handlerFilter={this.handlerFilter}
                    handlerDelAll={this.handlerDelAll}
                />
            </SectionBody>
        )
    }
}
const AuthorizationTodosAll = () =>{
    return <TodoComponent filterStatus={null} />
}
const AuthorizationTodosActive = () =>{
    return <TodoComponent filterStatus={false} />
}
const AuthorizationTodosCompleted = () =>{
    return <TodoComponent filterStatus={true} />
}
export {AuthorizationTodosAll,AuthorizationTodosActive,AuthorizationTodosCompleted};