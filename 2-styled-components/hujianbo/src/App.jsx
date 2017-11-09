import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';

injectGlobal`
html,
body {
	margin: 0;
  padding: 0;
  font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
	line-height: 1.4em;
	background: #f5f5f5;
	color: #4d4d4d;
	min-width: 230px;
	max-width: 550px;
	margin: 0 auto;
	font-smoothing: antialiased;
  font-weight: 300;
}
h1 { 
  width:100%; 
  text-align:center;
  position:absolute; 
  top:-140px;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
}
ul,li {
  list-style: none; 
  margin:0; 
  padding:0;
}

`


const TaskContanier = styled.div`
  width:100%;
  height:auto;
  margin:160px auto 0px auto;
  position:relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`
const TastHolder = styled.div`
display:${props => props.show ? 'block' : 'none'};
background:none;
`

const HeaderBox = styled.div`
  width:100%;
  color:#4d4d4d;
`
const TaskInput = styled.input`
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  outline: none;
  color: inherit;
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  background:#fff;
  border: 0px solid #eee;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  border-radius:none;
  cursor:pointer;
`

const Tips = styled.div`
  position:absolute;
  background:#ffe5b8;
  color:#ff7800;
  top:-20px;
`

const TaskList = styled.ul`
  max-height:300px;
  overflow-y:scroll;
`
const TaskItem = styled.li`
  position: relative;
	font-size: 24px;
  border-bottom: 1px solid #ededed;
  height:60px;
  background:#fff;
  :hover a { display:block;}
`
const TaskCheck = styled.input`
text-align: center;
	width: 40px
	height: auto;
	position: absolute;
	top: 10px;
	bottom: 0;
	margin: auto 0;
	border: none;
  appearance: none;
  :after {
		content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
	}
	:checked:after {
		content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
	}
`
const TaskLable = styled.label`
  white-space: pre-line;
  word-break: break-all;
  padding: 15px 60px 15px 15px;
  margin-left: 45px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
  color:${props => props.primary ? '#eee' : '#4d4d4d'};
  text-decoration:${props => props.primary ? 'line-through' : 'none'};
`
const TaskDelte = styled.a`
  position: absolute;
  display:none;
  top:16px;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  transition: color 0.2s ease-out;
  :after {
	  content: '×';
  }
  :hover {
	  color: #af5b5e;
  }
`
const ControlBox = styled.div`
  position:relative;
  color: #777;
  padding: 10px 15px;
  height: 20px;
  border-top: 1px solid #e6e6e6;
`
const ControlHander = styled.div`
  position: absolute;
  text-align:center;
  width:100%;
  top:0;
  padding: 0px 0px;
`
const HanderItem = styled.a`
  display:inline-block;
  cursor:pointer;
  color: inherit;
	margin: 6px;
	padding: 3px 7px;
	text-decoration: none;
	border: 1px solid transparent;
  border-radius: 3px;
  :hover {
	border-color: rgba(175, 47, 47, 0.1);
  }
  border-color:${props => props.curid === props.baseid ? "rgba(175, 47, 47, 0.1)" : ""};
`
const TaskAll = styled.input`
  position: absolute;
	top: 10px;
	left: -12px;
	width: 60px;
	height: 34px;
	text-align: center;
  border: none;
  transform: rotate(90deg);
  background: none;
  appearance: none;
  :before {
	  content: '❯';
	  font-size: 22px;
	  color: #e6e6e6;
	  padding: 10px 27px 10px 27px;
  }
  :checked:before {
	  color: #737373;
  }
`
const HanderClear = styled.div`
 position:absolute;
 cursor:pointer;
 right:10px;
 top:10px;
 color:#999;
 display:${props => props.show ? "block" : "none"};

`

class App extends Component {
  constructor() {
    super();
    this.state = {
      task: [],
      tips: "",
      filtername: e => e.done !== "nothing",
      curColum: "0"
    };
  }

  addtask = (e) => {
    //添加一个新的任务
    const curEnterKey = 13;
    if (e.keyCode === curEnterKey) {
      e.preventDefault();
      const newname = e.currentTarget.value;
      if (!newname) {
        //空
        this.setState({
          tips: "Please input something!"
        });
        this.timer = setTimeout(
          () => { this.setState({ tips: "" }); },
          1000
        );
        return;
      }
      if (this.findtask(newname)) {
        //已有同名任务
        this.setState({
          tips: "Already have this task!"
        });
        this.timer = setTimeout(
          () => { this.setState({ tips: "" }); },
          1000
        );
        e.currentTarget.value = "";
      }
      else {
        this.setState({
          task: this.state.task.concat({
            name: newname,
            done: false
          })
        });
        e.currentTarget.value = "";

      }
    } else {

      return;
    }
    return;

  }

  checktask = (taskname) => {
    for (let item of this.state.task) {
      if (item.name === taskname) {
        item.done = !item.done;
        break;
      }
    }
    this.setState({
      task: this.state.task,
    });
    return;
  }

  findtask = (taskname) => {
    //查找某名称的任务
    for (let item of this.state.task) {
      if (item.name === taskname) {
        return true;
      }
    }

    return false;
  }
  deletetask = (taskname) => {
    //删除一个任务
    let index = 0;
    for (let item of this.state.task) {
      if (item.name === taskname) {
        this.state.task.splice(index, 1);
        break;
      }
      index++;
    }
    this.setState({
      task: this.state.task,
    });
    return false;

  }

  filterChange = (flag, obj) => {
    switch (flag) {
      case "all": this.setState({
        filtername: e => e.done !== "nothing",
        curColum: "0"
      });
        break;
      case "hvdone": this.setState({
        filtername: e => e.done === true,
        curColum: "2"
      }); break;
      case "hvyet": this.setState({
        filtername: e => e.done === false,
        curColum: "1"
      }); break;

    }

  }

  allDone = () => {
    for (let item of this.state.task) {
      item.done = !item.done;
    }
    this.setState({
      task: this.state.task,
    });
    return;

  }
  clearAllComplete = () => {
    let filDone = this.state.task.filter(e => e.done === false);
    this.setState({
      task: filDone,
    });
    return;
  }


  render() {
    return (
      <TaskContanier>
        <HeaderBox>
          <h1>TO DO TASK</h1>
          <TaskInput placeholder="enter your task" onKeyDown={this.addtask} ></TaskInput>
        </HeaderBox>
        <Tips>{this.state.tips}</Tips>
        <TastHolder show={this.state.task.length > 0}>
          <TaskAll type="checkbox" onChange={this.allDone} checked=""></TaskAll>
          <TaskList>
            {this.state.task.filter(this.state.filtername).map(e => {
              return (
                <TaskItem key={e.name}>
                  <TaskCheck type="checkbox" checked={e.done} onChange={() => this.checktask(e.name)} ></TaskCheck>
                  <TaskLable primary={e.done}> {e.name}</TaskLable>
                  <TaskDelte type="botton" onClick={() => this.deletetask(e.name)} ></TaskDelte>
                </TaskItem>
              )
            })}

          </TaskList>
          <ControlBox>
            <span> {this.state.task.filter(e => e.done === false).length} Tasks To do!</span>
            <ControlHander>
              <HanderItem curid={this.state.curColum} baseid="0" onClick={() => this.filterChange("all", this)}>All</HanderItem>
              <HanderItem curid={this.state.curColum} baseid="1" onClick={() => this.filterChange("hvyet", this)}>Active</HanderItem>
              <HanderItem curid={this.state.curColum} baseid="2" onClick={() => this.filterChange("hvdone", this)}>Completed</HanderItem>
            </ControlHander>
            <HanderClear show={this.state.task.filter(e => e.done === true).length > 0} onClick={this.clearAllComplete}>Clear Completed</HanderClear>
          </ControlBox>
        </TastHolder>
      </TaskContanier>
    )
  }
}


export default App;
