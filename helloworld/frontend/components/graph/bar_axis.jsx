import React from 'react';
import * as d3 from 'd3';

export default class Axis extends React.Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    let axis;
    if(this.props.orient === 'left') {
      axis = d3.axisLeft().ticks(5).scale(this.props.scale);
    } else {
      axis = d3.axisBottom().ticks(6).scale(this.props.scale);
    }
    let node = this.refs.axis;
    d3.select(node).call(axis);
  }

  render() {
    return <g className="axis" ref="axis" transform={this.props.translate}></g>;
  }
}
