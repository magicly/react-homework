/**
 * Created by yvdedu.com on 2017/10/28.
 */
import React, { Component } from 'react';
//静态显示页面
function StaticHtml(props){
    return (
        <section className="todoapp">
            <div>
                <header className="header">
                    <h1>表格</h1>
                    <input id="input" className="new-todo" placeholder="输入内容" />
                </header>
                <section className="main">
                    <button className="ok" onClick={props.addDiv}>确定</button>
                    <ul className="todo-list" id="add">
                        {props.list.map( e => {
                                return (
                                    <li className={e.show}>
                                        <div className="view">
                                            <input className="toggle" type='checkbox' checked={e.inpState}
                                                   onClick={ee =>{props.saveDiv(e.name,e.inpState)}}/>
                                            <label >{e.name}</label>
                                            <button className="destroy" onClick={ee =>{props.deleteDiv(e.name)}}></button>
                                        </div>
                                        <input className="edit" value="bb"/>
                                    </li>
                                )
                            })
                        }

                    </ul>
                </section>
                <footer className="footer">
                    <ul className="filters">
                        <li>
                            <a href="#/" class="selected" onClick={props.allDiv}>全部</a>
                        </li>
                        <li>
                            <a href="#/active" onClick={props.blockDiv}>完成</a>
                        </li>
                        <li>
                            <a href="#/completed" onClick={props.noneDiv}>未完成</a>
                        </li>
                    </ul>
                </footer>
            </div>
        </section>
    );
}
//动态操作
class DynamicData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inpVlaue: [],
        }
    }
    //函数写在这里吗？
    all(operation,name, inpState){
        let array = this.state.inpVlaue
        for (let i = 0; i < array.length; i++) {
            //修改状态
            if(operation=== 'save'){
                if (array[i].inpState === inpState && array[i].name === name) {
                    if (inpState === false) {
                        array[i].inpState = true
                    } else {
                        array[i].inpState = false
                    }
                }
            }
            //完成
            if(operation=== 'block'){
                if (array[i].inpState === false) {
                    array[i].show = "none"
                }else{
                    array[i].show = "block"
                }
            }
            //未完成
            if(operation=== 'none'){
                if (array[i].inpState === true) {
                    array[i].show = "none"
                }else{
                    array[i].show = "block"
                }
            }
            //全部
            if(operation=== 'all'){
                array[i].show = "block"
            }
            //删除
            if( operation=== 'delete'){
                if (array[i].name === name) {
                    array.splice(i, 1)
                }
            }
        }
        this.setState({inpVlaue: array})
    }
    //添加
    addDiv = () => {
        //不知道怎么拿输入框的值，只能用原生jsl ,周一麻烦李老师讲下
        let inp = document.getElementById("input").value
        if (inp != null) {
            let array = this.state.inpVlaue
            array.push({name: inp, inpState: false, show:"block"})
            this.setState({inpVlaue: array})
        }
    }
    //修改状态
    saveDiv = (name, inpState) => {
        this.all('save', name, inpState)
    }
    //完成
    blockDiv = () => {
        this.all('block')
    }
    //未完成
    noneDiv = () => {
        this.all('none')
    }
    //全部
    allDiv = () => {
        this.all('all')
    }
    //删除
    deleteDiv = (name) => {
        this.all('delete',name)
    }
    render() {
        return (
            <StaticHtml
                addDiv={this.addDiv}
                deleteDiv={this.deleteDiv}
                list={this.state.inpVlaue}
                blockDiv={this.blockDiv}
                noneDiv={this.noneDiv}
                allDiv={this.allDiv}
                saveDiv={this.saveDiv}
                completeDiv={this.completeDiv}
            />
        )
    }
}
export default DynamicData;
