import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      task: [
        {
          name: "one",
          done: true,
        },
        {
          name: "two",
          done: false,
        },
        {
          name: "three",
          done: false,
        }
      ],
      tips: "",
      filtername: e => e.done != "nothing"
    };


  }

  addtask = (e) => {
    //添加一个新的任务
    const newname = document.querySelector("input").value;
    if (!newname) {
      //空
      this.setState({
        tips: "Please input something!"
      });
      return;
    }
    if (this.findtask(newname)) {
      //已有同名任务
      this.setState({
        tips: "Already have this task!"
      });
      document.querySelector("input").value = "";
    }
    else {
      this.setState({
        task: this.state.task.concat({
          name: newname,
          done: false
        })
      });
      document.querySelector("input").value = "";

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
        break;
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
        filtername: e => e.done != "nothing"
      }); break;
      case "hvdone": this.setState({
        filtername: e => e.done === true
      }); break;
      case "hvyet": this.setState({
        filtername: e => e.done === false
      }); break;

    }

  }
  

  render() {
    return (
      <div>
        <div className="inputbox"><input type="text" placeholder="enter your task" /><botton type="button" onClick={this.addtask}>ADD</botton></div>
        <div className="tips">{this.state.tips}</div>
        <ul className="todolist">
          {this.state.task.filter(this.state.filtername).map(e => {
            return (
              <li className={'cl' + e.done}>
                <input type="checkbox" checked={e.done} onClick={() => this.checktask(e.name)} />
                {e.name}
                <a type="botton" className="btn_dele" onClick={() => this.deletetask(e.name)} >x</a>
              </li>
            )
          })}

        </ul>
        <div className="handerbox">
          <a onClick={() => this.filterChange("all", this)}>All</a>
          <a onClick={() => this.filterChange("hvdone", this)}>Have Done</a>
          <a onClick={() => this.filterChange("hvyet", this)}>Never Done</a>
        </div>
        <p className="tipsbottom">You have {this.state.task.filter(e => e.done === false).length} tasks to do!</p>
      </div>
    )
  }
}


export default App;
