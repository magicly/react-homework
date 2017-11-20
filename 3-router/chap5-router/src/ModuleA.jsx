import React from 'react';

const C1 = ({ name }) => {
  return <h1>this is import async. {name}</h1>
}

const f = (str) => {
  console.log('this is import async: ' + str);
  return str + 'hahaha';
}

export { C1, f };