import React from 'react';
import * as d3 from 'd3';
import BarAxis from './bar_x_y_axis';
import Bars from './bars';


const xScale = (props) => {
  console.log(props)
  return d3.scaleLinear()
  .domain([-1, 70])
  .range([props.padding, props.width - props.padding * 2]);
};

const yScale = (props) => {
  return d3.scaleLinear()
  .domain([0, 1])
  .range([props.height - props.padding, props.padding]);
};

export default(props) => {
  const scales = { xScale: xScale(props), yScale: yScale(props) };
  let t = d3.transition().duration(750).ease(d3.easeLinear);
  d3.selectAll("Bars").transition(t).style("fill", "red");
  return <svg className="barchart" width={props.width} height={props.height}>
    <Bars {...props} {...scales} />
    <BarAxis {...props} {...scales} />
  </svg>;
};