import React, { Component } from 'react';
import './Homework.css';
import _ from 'lodash';
import styled from 'styled-components';

/**
 * 输入框 控制
 */
class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataArr: [],
            dataShow: [],
            prevCheck: false,
            itemLeft: 0, //剩下的item数
            showWays: 'all',//三种显示状态（all act com）默认all
        }
        document.onkeydown = this.inputData;
    }
    /**
     * 全选监听
     */
    changeCheck = () => {
        this.state.dataArr.forEach(el => {
            if (!this.state.prevCheck) {
                el.isChecked = true
            } else {
                el.isChecked = false;
            }
        })
        this.setState({
            dataArr: this.state.dataArr,
            prevCheck: !this.state.prevCheck,
            dataShow: _.clone(this.state.dataArr),
            itemLeft: this.state.prevCheck ? this.state.dataArr.length : 0,
        })
    }

    // 回车键监听,添加一条数据
    inputData = (e) => {
        let data = e.target.value; //避免用Document.xxxx()
        if (e.keyCode === 13) {
            e.target.value = '';
            if (data === '') {
                alert('请您输入需要添加的事项！');
                return;
            }
            let alradyHas = false;
            this.state.dataArr.forEach(el => {
                if (el.name === data) {
                    alradyHas = true;
                }
            });
            if (alradyHas) {
                alert('您已经有一个同名Todo了！');
                return;
            }
            let tempData = this.state.dataArr;
            let dataInput = { isChecked: false, name: data };
            tempData.push(dataInput);
            let item = 0;
            for (let i of tempData) {
                if (!i.isChecked) {
                    item += 1;
                }
            }
            this.setState({
                dataArr: tempData,
                dataShow: _.clone(tempData),
                itemLeft: item,
                prevCheck: false,
            });
        }
    }


    //选中一条
    checkOne = (index) => {
        //改变后选中状态值
        let checkStatus = !this.state.dataShow[index].isChecked;
        let currentName = this.state.dataShow[index].name;
        this.state.dataShow[index].isChecked = checkStatus;
        this.state.dataArr.forEach((el, index) => {
            if (el.name === currentName) {
                el.isChecked = checkStatus;
            }
        })
        let itemLeftChange = checkStatus ? this.state.itemLeft - 1 : this.state.itemLeft + 1;
        if (itemLeftChange < 0) {
            itemLeftChange = 0;
        }
        let showArr = [];
        switch (this.state.showWays) {
            case 'all':
                this.setState({
                    dataArr: this.state.dataArr,
                    itemLeft: itemLeftChange,
                    prevCheck: (itemLeftChange === 0 && this.state.dataArr.length > 0) ? true : false,
                    dataShow: this.state.dataShow,
                });
                break;
            case 'act':
                this.state.dataArr.forEach(el => {
                    if (el.isChecked) {
                        showArr.push(el)
                    }
                });
                this.setState({
                    dataArr: this.state.dataArr,
                    itemLeft: itemLeftChange,
                    prevCheck: (itemLeftChange === 0 && this.state.dataArr.length > 0) ? true : false,
                    dataShow: showArr,
                });
                break;
            case 'com':
                this.state.dataArr.forEach(el => {
                    if (!el.isChecked) {
                        showArr.push(el)
                    }
                });
                this.setState({
                    dataArr: this.state.dataArr,
                    itemLeft: itemLeftChange,
                    prevCheck: (itemLeftChange === 0 && this.state.dataArr.length > 0) ? true : false,
                    dataShow: showArr,
                });
                break;
            default: break;
        }


    }

    //删除一条
    deleteOne = (index) => {
        let currentName = this.state.dataShow[index].name;
        let currentCheck = this.state.dataShow[index].isChecked;
        this.state.dataArr.forEach((el, index) => {
            if (el.name === currentName) {
                this.state.dataArr.splice(index, 1);
            }
        });
        let showArr = [];
        let itemLeftChange = 0;
        switch (this.state.showWays) {
            case 'all':
                if (currentCheck) {
                    itemLeftChange = this.state.itemLeft;
                } else {
                    itemLeftChange = this.state.itemLeft > 0 ? this.state.itemLeft - 1 : 0;
                }
                showArr = this.state.dataArr;
                this.setState({
                    dataArr: showArr,
                    itemLeft: itemLeftChange,
                    dataShow: showArr,
                });
                break;
            case 'act':
                itemLeftChange = this.state.itemLeft;
                this.state.dataArr.forEach(el => {
                    if (el.isChecked) {
                        showArr.push(el)
                    }
                });
                this.setState({
                    dataArr: this.state.dataArr,
                    itemLeft: itemLeftChange,
                    dataShow: showArr,
                });
                break;
            case 'com':
                itemLeftChange = this.state.itemLeft > 0 ? this.state.itemLeft - 1 : 0;
                this.state.dataArr.forEach(el => {
                    if (!el.isChecked) {
                        showArr.push(el)
                    }
                });
                this.setState({
                    dataArr: this.state.dataArr,
                    itemLeft: itemLeftChange,
                    dataShow: showArr,
                    prevCheck: (itemLeftChange === 0 && this.state.dataArr.length > 0) ? true : false,
                });
                break;
            default: break;
        }
    }

    // 删除选中的
    deleteChecked = () => {
        let showArr = [];
        let arrLenth = this.state.dataArr.length;
        if (arrLenth > 0) {
            for (let i = arrLenth - 1; i >= 0; i -= 1) {
                // debugger
                console.log(`el--->${i}`);
                let el = this.state.dataArr[i];
                if (el.isChecked) {
                    console.log(`el--->${i + '------' + el.name}`);
                    this.state.dataArr.splice(i, 1);
                }
            }
            showArr = this.state.dataArr;
            this.setState({
                dataArr: _.clone(showArr),
                dataShow: _.clone(showArr),
                prevCheck: false,
            });
        }
    }

    //显示哪种状态的item
    showItem = (way) => {
        let showArr = [];
        switch (way) {
            case 'all':
                showArr = this.state.dataArr;
                break;
            case 'act':
                this.state.dataArr.forEach(el => {
                    if (el.isChecked) {
                        showArr.push(el)
                    }
                })
                break;
            case 'com':
                this.state.dataArr.forEach(el => {
                    if (!el.isChecked) {
                        showArr.push(el)
                    }
                })
                break;
            default: break;
        }
        this.setState({
            dataShow: _.clone(showArr),
            showWays: way,
        })
    }

    render() {
        return (
            <div className="todoapp">
                <h1>todos</h1>
                <InputView checked={this.state.prevCheck} onChange={this.changeCheck} />
                <CustomList
                    data={this.state.dataShow}
                    deleteOne={this.deleteOne}
                    checkOne={this.checkOne}
                />
                <FooterWithStyle
                    showItem={this.showItem}
                    itemLeft={this.state.itemLeft}
                    deleteChecked={this.deleteChecked}
                    showWays={this.state.showWays}
                />
            </div>
        );
    }
}

const InputView = props => {
    return (
        <div className="new-todo">
            <input  type="checkbox" checked={props.checked} onChange={() => props.onChange()} />
            <input className="edit" type="text" placeholder="What needs to be done?" />
        </div>
    );
}

/**列表*/
const CustomList = props => {
    let arr = props || [];
    let list = [];
    if (arr.data.length > 0) {
        list = arr.data.map((item, index) => {
            return (
                <div className="todo-list" key={index}>
                    <input type="checkbox" checked={item.isChecked} onChange={() => props.checkOne(index)} />
                    <span className={item.isChecked ? 'checked' : ''}>{item.name}</span>
                    <button onClick={() => props.deleteOne(index)}></button>
                </div>
            )
        });
    }
    return (
        <div>
            {list}
        </div>
    );
}

const Footer = props => {
    return (
        <div className={props.className}>
            <LeftItem>{props.itemLeft} item left</LeftItem>
            <div>
                <span className={props.showWays === 'all' ? 'selected' : ''} onClick={() => props.showItem('all')}>All</span>
                <span className={props.showWays === 'act' ? 'selected' : ''} onClick={() => props.showItem('act')}>Active</span>
                <span className={props.showWays === 'com' ? 'selected' : ''} onClick={() => props.showItem('com')}>Completed</span>
            </div>
            <DeleteBtn onClick={() => props.deleteChecked()}>Clear completed </DeleteBtn>
        </div>
    );
}

const Span = styled.span`
    zoom: 1;
    float:left;
    display: inline;
    font-size: 10px;
    text-decoration: none;
    color:inherit;
    text-align: center;
`
const FilterBtn = Span.extend`
    margin: 1px;
    text-decoration: none;
    border: 1px solid transparent;
    padding: 3px 10px;
    vertical-align: baseline;
    outline: none;
    cursor: pointer;
    text-align: center;
    border-radius: 3px;

    // box-shadow: 1px 1px 1px rgba(0,0,0,0.1);
    // :hover{
    //     border:1px solid #e8e8e8;  
    // }

    span.selected,
    :hover {
        border-color: rgba(175, 47, 47, 0.1);
    }
    
    selected {
        border-color: rgba(175, 47, 47, 0.2);
    }
`
/**带样式的footer */
const FooterWithStyle = styled(Footer) `
    margin: 0;
    padding: 5px;
    list-style: none;
    position: absolute;
    right: 0;
    left: 0;

    div {
        float: left;
        display: inline;
        text-align: center;
        margin-left: 100px;
        align-content: center;
    }
    div span{
        zoom: 1;
        float:left;
        display: inline;
        font-size: 10px;
        text-decoration: none;
        color:inherit;
        text-align: center;
        margin: 1px;
        text-decoration: none;
        border: 1px solid transparent;
        padding: 3px 10px;
        vertical-align: baseline;
        outline: none;
        cursor: pointer;
        text-align: center;
        border-radius: 3px;
    }
    div span:hover {
    	border-color: rgba(175, 47, 47, 0.1);
    }
    div span.selected {
    	border-color: rgba(175, 47, 47, 0.2);
    }
`
/**删除勾选按钮 */
const DeleteBtn = Span.extend`
    margin-left: 50px;
    padding: 3px 10px;
    vertical-align: baseline;
    outline: none;
    float:left;
    cursor: pointer;
    text-align: center;
    :hover{
        text-decoration: underline;
        color:black;
    }
`
/**剩余item */
const LeftItem = Span.extend`
    padding: 3px 10px;
    vertical-align: baseline;
    outline: none;
    text-align: center;
`
export default Todo;