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
    let arr = ["", 0, 15, 30, 45, 60];
    console.log(this.props)
    if(this.props.orient === 'left') {
      axis = d3.axisLeft().ticks(5).scale(this.props.scale);
    } else {
      axis = d3.axisBottom().ticks(5).tickFormat("").scale(this.props.scale);
    }
    let node = this.refs.axis;
    
    d3.select(node).call(axis);
    d3.select(".axis").append("text")
      .attr("transform", `${this.props.titleTranslate} ${this.props.titleRotation}`)
      .style("text-anchor", "middle")
      .text(`${this.props.text}`);
  }

  render() {
    return <g className="axis" ref="axis" transform={this.props.translate}></g>;
  }
}
