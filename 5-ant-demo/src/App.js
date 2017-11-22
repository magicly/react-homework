import React, { Component } from 'react';
import {
  Button, Icon, Row as RawRow, Col as RawCol,
  Timeline,
  DatePicker,
} from 'antd';

import logo from './logo.svg';



import styled from 'styled-components';
const Col = styled(RawCol) `
  /* background-color: red; */
  border: 1px solid blue;
`
const Row = styled(RawRow) `
  /* background-color: green; */
`

function onChange(date, dateString) {
  console.log(date, dateString);
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <Timeline>
          <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
          <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
          <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
          <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
        </Timeline>
        <Button type="primary">This is a Button.</Button>
        <Icon type="step-forward" />
        <DatePicker onChange={onChange} />
        <Row>
          <Col span={12}>col-12</Col>
          <Col span={12}>col-12</Col>
        </Row>
        <Row>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
        </Row>
        <Row>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
        </Row>
      </div>
    );
  }
}

export default App;
