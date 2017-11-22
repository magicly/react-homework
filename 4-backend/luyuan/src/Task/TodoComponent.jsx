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
        this.ID = 0; 
        this.listOriginal = [];   

        let ID = 0;
        let filterStatus = props.filterStatus; 
        let listOriginal=[];
        let newlist = listOriginal;

        this.state={
            listOriginal: listOriginal,
            filterStatus: filterStatus,
            itemcount: listOriginal.filter(x => x.Completed === false).length,
            list:newlist
        }
              
        let setTaskState = (props) =>{
            this.ID = ID;
            this.listOriginal = listOriginal;
            this.setState(props);
        }
        var formData = new FormData();
        formData.append('userId', 'luyuan');
        fetch("http://cloudapi.yoloke.com/rest/todo/get-todos.json", {
            method: 'POST',
            mode: 'cors',
            body:formData
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            listOriginal = JSON.parse(data.data.todos[0].todosJson);
            if (filterStatus != null) {
                newlist = listOriginal.filter(x => x.Completed === filterStatus);
            }else{
                newlist = listOriginal;
            }
            if (listOriginal != null && listOriginal.length > 0) {
                ID = listOriginal[listOriginal.length - 1].ID;
            }
            setTaskState({            
                listOriginal: listOriginal,         
                filterStatus: filterStatus,     
                itemcount: listOriginal.filter(x=>x.Completed===false).length,
                list: newlist            
           });
        }).catch(function (e) {
            console.log("error:"+e);
        });

    }
    setTolocalStorage = (data) => {
        var formData = new FormData();
        formData.append('userId', 'luyuan');
        formData.append('todosJson', JSON.stringify(data));
        fetch("http://cloudapi.yoloke.com/rest/todo/set-todos.json", {
            method: 'POST',
            mode: 'cors',
            body: formData
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            return data;
        }).catch(function (e) {
            //错误提示
        });
        //localStorage.setItem("todo", JSON.stringify(data || this.listOriginal));
    }
    getTolocalStorage = () => {
        //return localStorage.getItem("todo") === null ? [] : JSON.parse(localStorage.getItem("todo"));
    }
    handlerAdd = (e) => {
        if (e.keyCode == 13) {
            let value = e.target.value;
            if (!value) return false;
            this.ID = this.ID + 1;
            let item = {
                ID: this.ID, //任务主键标识
                Title: value, //任务名称
                Completed: false, //任务状态 false = 未完成 ，true = 已完成
            };
            e.target.value = "";
            this.listOriginal.push(item);
            let newlist = this.listOriginal;
            if (this.state.filterStatus != null) {
                newlist = this.listOriginal.filter(x => x.Completed === this.state.filterStatus);
            }
            this.setTolocalStorage(newlist);
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
        let flag = !item.Completed;
        this.listOriginal.map((obj, index) => {
            if (obj.ID === item.ID) {
                obj.Completed = flag;
            }
        })
        let newlist = this.listOriginal;
        this.setTolocalStorage(this.listOriginal);
        if (this.state.filterStatus != null) {
            newlist = this.listOriginal.filter(x => x.Completed === this.state.filterStatus);
        }
        this.setState(
            {
                filterStatus: this.state.filterStatus,
                list: newlist,
                itemcount: this.listOriginal.filter(x => x.Completed === false).length
            }
        )
    }
    handlerCheckAll = () => {
        let checkCount = this.listOriginal.filter(x => x.Completed === true).length;
        let completeflag = checkCount === this.listOriginal.length ? false : true;
        this.listOriginal.map((obj, index) => {
            obj.Completed = completeflag;
        })
        this.setTolocalStorage(this.listOriginal);
        this.setState(
            {
                filterStatus: this.state.filterStatus,
                list: this.listOriginal,
                itemcount: this.listOriginal.filter(x => x.Completed === false).length
            }
        )
    }
    handlerDel = (item) => {
        this.listOriginal = this.listOriginal.filter(x => x.ID != item.ID)//原始数组同时更新
        let newlist = this.listOriginal;
        if (this.state.filterStatus != null) {
            newlist = this.listOriginal.filter(x => x.Completed === this.state.filterStatus);
        }
        this.setTolocalStorage(newlist);
        this.setState({
            list: newlist,
            filterStatus: this.state.filterStatus,
            itemcount: this.listOriginal.filter(x => x.Completed === false).length
        })
    }
    handlerDelAll = () => {
        this.listOriginal = this.listOriginal.filter(x => x.Completed === false);
        this.setTolocalStorage(this.listOriginal);
        let newlist = this.listOriginal;
        if (this.state.filterStatus != null) {
            newlist = this.listOriginal.filter(x => x.Completed === this.state.filterStatus);
        }
        this.setState({
            filterStatus: this.state.filterStatus,
            list: newlist,
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
            newlist = this.listOriginal.filter(x => x.Completed === this.state.filterStatus)
        } if (type == 2) {  //已完成任务
            this.state.filterStatus = true;
            newlist = this.listOriginal.filter(x => x.Completed === this.state.filterStatus)
        }
        this.setState(
            {
                filterStatus: this.state.filterStatus,
                list: newlist
            }
        )
    }
    render() {
        this.listOriginal = this.state.listOriginal;
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
const AuthorizationTodosAll = () => {
    return <TodoComponent filterStatus={null} />
}
const AuthorizationTodosActive = () => {
    return <TodoComponent filterStatus={false} />
}
const AuthorizationTodosCompleted = () => {
    return <TodoComponent filterStatus={true} />
}
export { AuthorizationTodosAll, AuthorizationTodosActive, AuthorizationTodosCompleted };