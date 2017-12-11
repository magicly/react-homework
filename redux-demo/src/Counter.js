import React from 'react';

const Counter = ({ value, add, minus, nothing }) => (
  <div>
    <p>{value}</p>
    <button onClick={add}>Add</button>
    <button onClick={minus}>Minus</button>
    <button onClick={nothing}>Nothing</button>
  </div>
)

export default Counter;