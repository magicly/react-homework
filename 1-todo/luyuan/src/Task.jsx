import React,{Component} from 'react';
import './index.css';

//定义一个组件
const TaskControl = (props) =>{
    return(
        <div>
            <div className="new-todo">
                <div>
                <input type="text"
                    name="dropName"
                    returnKeyType="search"
                    type="text" placeholder="输入内容键盘提交添加任务" className="new-todo-text"
                    onKeyUp={props.handlerAdd.bind(this)}/>
                </div>
                <div className="todo-list">
                    <ul>
                    {
                        props.list.map((item,index) => {  
                            let btnText= item.isDel===false? "O":"√";
                            return (
                                <li>
                                <button onClick={props.handlerComplete.bind(this,index,item)}>{btnText}</button>
                                {item.text}
                                <button onClick={props.handlerDel.bind(this,index)}>×</button>
                                </li>  
                            )
                        })
                    }
                    </ul>
                </div>
                <div>
                    <span>未完成任务数目:{props.itemleftcount}</span>
                    <button onClick={props.handlerFilter.bind(this,0)}>所有</button>
                    <button onClick={props.handlerFilter.bind(this,1)}>已完成</button>
                    <button onClick={props.handlerFilter.bind(this,2)}>未完成</button>
                </div>
            </div>
            </div>
        )
}

//创建一个类处理事件
class TaskContainer extends Component{
    constructor(props){
        super(props);
        this.listOriginal=[];//原始数组对象1
        this.state = {
            itemleftcount:0,
            list:[]
        };
    }      
    //新增任务(键盘提交事件)
    handlerAdd = (e) =>{
        if(e.keyCode == 13) { 
            let value = e.target.value;
            if(!value) return false;
            let item = {
                text: value, //任务名称
                isDel: false //任务状态 false = 未完成 ，true = 已完成
            }; 
            e.target.value="";//每次提交后清空文本框
            let newlist = this.state.list;
            this.listOriginal.push(item);
            newlist.push(item); //填充数据到数组          
            this.setState(
                {                   
                    itemleftcount:newlist.filter(x=>x.isDel===false).length,
                    list: newlist
                }
            )
        }
    }
    //完成/未完成任务
    handlerComplete = (index,item) =>{
        let flag = !item.isDel;//item.isDel===true?false:true;
        let newlist = this.state.list;
        this.listOriginal[index].isDel=flag;
        newlist[index].isDel=flag;
        this.setState(
            {
                list: newlist,
                itemleftcount:newlist.filter(x=>x.isDel===false).length,
            }
        )
    }
    //删除任务
    handlerDel = (index) => {
        this.listOriginal= this.listOriginal.filter((elem, i) => index !== i)//原始数组同时更新
        this.setState(
            {    
                list: this.state.list.filter((elem, i) => index !== i)
            }
        )
    }
    //筛选任务
    handlerFilter = (type) => {
        let newlist = []; //利用原始数组存储的数据进行筛选操作
        if(type==0){
            newlist = this.listOriginal //全部
        }
        else if(type==1){  //已完成任务          
            newlist = this.listOriginal.filter(x=>x.isDel===true)
        }if(type==2){  //未完成任务
            newlist = this.listOriginal.filter(x=>x.isDel===false)
        }
        this.setState(
            {
                list: newlist
            }
        )
    }
    render(){
        return(
            <TaskControl 
                itemleftcount ={this.state.itemleftcount}
                list = {this.state.list} 
                handlerAdd = {this.handlerAdd} 
                handlerComplete = {this.handlerComplete}
                handlerDel = {this.handlerDel}
                handlerFilter = {this.handlerFilter}
            />
        )        
    }
}

export default TaskContainer;