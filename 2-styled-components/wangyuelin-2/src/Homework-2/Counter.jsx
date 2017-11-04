
import React from "react";
import './App.css';


import styled from 'styled-components';
/**
 * 有点改动
 */

const SS = () => {
    return (
        <button>
            这是一个button
        </button>
    );
}

const Com = () => {
    console.info();
}

console.log();

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };
    }


    handleClick = () => {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn,
        }));
    }


    render() {
        return (
            <button
                onClick={this.handleClick}>{this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }


}
