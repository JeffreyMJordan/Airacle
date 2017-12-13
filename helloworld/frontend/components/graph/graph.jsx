import React from 'react';
import d3 from 'd3';
import LineGraph from './line_graph';

const data = [
  [0, 0.12],
  [15, 0.35],
  [30, 0.2],
  [45, 0.11],
  [60, 0.08]
];

const styles = {
  width: 500,
  height: 400,
  padding: 30
};

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: data};
  }

  render() {
    return (
      <div>
        <h1>Test Graph</h1>
        <LineGraph {...this.state} {...styles}/>
      </div>
    );
  }
}
