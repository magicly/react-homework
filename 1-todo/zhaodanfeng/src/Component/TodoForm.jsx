import React, {Component} from 'react';

class TodoForm extends Component {
    constructor(props) {
        super(props);
    }

    handleKeyDown = (e) => {
        const ENTER_KEY = 13;
        if(e.keyCode !== ENTER_KEY) {
            return ;
        }
        e.preventDefault();
        this.handleInputDone(e.currentTarget.value);
        e.currentTarget.value = '';
    };
    handleCheckboxChange = (e) => {
        this.handleAllCheckChange(e.currentTarget.checked);
    }

    render() {
        <form className="inputForm">
            <input className="todoInputClass" type="text" placeholder="少年，你要做甚？" onKeyDown={this.handleKeyDown}/>
            <input type="checkbox" onChange={this.handleCheckboxChange}/>{' '}全选
        </form>
    };
}

export default TodoForm;