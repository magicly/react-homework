import React from 'react'

import styled from 'styled-components'

const H1 = styled.h1`
  color: green;
  border: 2px solid red;
`
const H2 = H1.extend`
  color: blue;
`
const Todo = styled.div`
  color: gray;
  background-color: red;
`
const Todo2 = Todo.withComponent('p');


const MyComponent = ({className}) => {
  return <div className={className}>
    <i className="iconfont icon-weixin" />
    <p>this is my component...</p>
    <h1>hahahahah</h1>
  </div>
}


const MyComponent2 = styled(MyComponent)`
  border: 1px solid red;
  font-size: 1rem;
  p {
    color: blue;
  }
  :hover {
    cursor: pointer;
  }
`
const C3 = () => {
  return <div>
    <MyComponent2 />
    <H1>C3....</H1>
    <Todo>todo list...</Todo> 
    <Todo2>Todo2 list...</Todo2>
    <p>this is anther p...</p>
    <p>this is anther p...</p>
    <p>this is anther p...</p>
    <p>this is anther p...</p>
    <p>this is anther p...</p>
    <H2>h2......</H2>
  </div>
}

export default C3;