import React, { Component } from 'react';
import styled, {injectGlobal} from 'styled-components';
import FormInputControl from './FormInputControl'
import ListControl from './ListControl'
import FilterControl from './FilterControl'

injectGlobal`
    html,
    body {
        margin: 0;
        padding: 0;
    }

    body {
        font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
        line-height: 1.4em;
        background: #f5f5f5;
        color: #4d4d4d;
        min-width: 230px;
        max-width: 550px;
        margin: 0 auto;
        -webkit-font-smoothing: antialiased;
        -moz-font-smoothing: antialiased;
        font-smoothing: antialiased;
        font-weight: 300;
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
        -webkit-appearance: none;
        appearance: none;
        -webkit-font-smoothing: antialiased;
        -moz-font-smoothing: antialiased;
        font-smoothing: antialiased;
    }    

    button,
    input[type="checkbox"] {
        outline: none;
    }

    .hidden {
        display: none;
    }
    .div{
        display: block;
    }
    .edit {
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        outline: none;
        color: inherit;
        padding: 6px;
        border: 1px solid #999;
        box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-font-smoothing: antialiased;
        font-smoothing: antialiased;
    }
`

const SectionBody = styled.section`
    background: #fff;
    margin: 130px 0 40px 0;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`

class TaskContainer extends Component {
    constructor(props) {
        super(props);
        this.listOriginal = [];//定义数组
        this.id = 0;//定义自动增长id（数组主键）
        this.state = {
            filterstauts: null,
            itemcount: 0,
            list: []
        };
    }
    //新增任务(键盘提交事件)
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
            e.target.value = "";//每次提交后清空文本框
            this.listOriginal.push(item);
            let newlist = this.listOriginal;
            if (this.state.filterstauts != null) {
                newlist = this.listOriginal.filter(x => x.iscomplete === this.state.filterstauts);
            }
            //this.state.filterstauts = false;
            this.setState(
                {
                    filterstauts: this.state.filterstauts,
                    itemcount: this.state.itemcount + 1,
                    list: newlist
                }
            )
        }
    }
    //某个任务 完成/未完成
    handlerComplete = (item) => {
        let flag = !item.iscomplete;
        this.listOriginal.map((obj, index) => {
            if (obj.id === item.id) {
                obj.iscomplete = flag;
            }
        })
        let newlist = this.listOriginal;
        if (this.state.filterstauts != null) {
            newlist = this.listOriginal.filter(x => x.iscomplete === this.state.filterstauts);
        }
        this.setState(
            {
                filterstauts: this.state.filterstauts,
                list: newlist,
                itemcount: this.listOriginal.filter(x => x.iscomplete === false).length
            }
        )
    }
    //全部任务 完成/未完成
    handlerCheckAll = () => {
        let checkCount = this.listOriginal.filter(x => x.iscomplete === true).length;
        let completeflag = checkCount == this.listOriginal.length ? false : true;
        this.listOriginal.map((obj, index) => {
            obj.iscomplete = completeflag;
        })
        this.setState(
            {
                filterstauts: this.state.filterstauts,
                list: this.listOriginal,
                itemcount: this.listOriginal.filter(x => x.iscomplete === false).length
            }
        )
    }
    //某个任务 删除
    handlerDel = (item) => {
        this.listOriginal = this.listOriginal.filter(x => x.id != item.id)//原始数组同时更新
        let newlist = this.listOriginal;
        if (this.state.filterstauts != null) {
            newlist = this.listOriginal.filter(x => x.iscomplete === this.state.filterstauts);
        }
        this.setState({
            list: newlist,
            filterstauts: this.state.filterstauts,
            itemcount: this.listOriginal.filter(x => x.iscomplete === false).length
        })
    }
    //选择的任务 删除
    handlerDelAll = () => {
        this.listOriginal = this.listOriginal.filter(x => x.iscomplete === false);
        this.setState({
            filterstauts: this.state.filterstauts,
            list: this.listOriginal,
            itemcount: this.listOriginal.length
        })
    }
    //筛选任务
    handlerFilter = (type) => {
        let newlist = [];
        if (type == 0) {
            this.state.filterstauts = null;
            newlist = this.listOriginal //全部
        }
        else if (type == 1) { //未完成任务
            this.state.filterstauts = false;
            newlist = this.listOriginal.filter(x => x.iscomplete === this.state.filterstauts)
        } if (type == 2) {  //已完成任务
            this.state.filterstauts = true;
            newlist = this.listOriginal.filter(x => x.iscomplete === this.state.filterstauts)
        }
        this.setState(
            {
                filterstauts: this.state.filterstauts,
                list: newlist
            }
        )
    }


    render() {
        return (
            <SectionBody>             
                <FormInputControl handlerAdd={this.handlerAdd} />  
                <ListControl 
                    list={this.state.list} 
                    handlerCheckAll={this.handlerCheckAll}
                    handlerComplete={this.handlerComplete}
                    handlerDel={this.handlerDel}
                />  
                <FilterControl 
                    itemcount={this.state.itemcount}
                    list={this.listOriginal} 
                    filterstauts={this.state.filterstauts}                                      
                    handlerFilter={this.handlerFilter}
                    handlerDelAll={this.handlerDelAll}
                />
            </SectionBody>
        )
    }
}

export default TaskContainer;