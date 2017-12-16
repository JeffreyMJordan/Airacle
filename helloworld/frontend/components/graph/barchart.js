import React from 'react';
import * as d3 from 'd3';
import BarAxis from './bar_x_y_axis';
import Bars from './bars';


const xScale = (props) => {
  return d3.scaleOrdinal()
  .domain(["", "0 minutes", "15 minutes", "30 minutes", "45 minutes", "60+ minutes", ""])
  .range([props.padding, 2 * props.padding, 2 * props.padding + props.width / 6, 2 * props.padding + props.width / 3, 2 * props.padding + props.width / 2, 2 * props.padding + 2 * props.width / 3]);
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
  <text transform="translate(180, 40)">Predicted Delay Times</text>
    <Bars {...props} {...scales} />
    <BarAxis {...props} {...scales} />
    <g className="xValues">
      <text y={(props.height - props.padding/2) - 3} x={1.5 * props.padding}>0 mins</text>
      <text y={(props.height - props.padding/2) - 3} x={1.5 * props.padding + props.width / 6}>15 mins</text>
      <text y={(props.height - props.padding/2) - 3} x={1.5 * props.padding + props.width / 3}>30 mins</text>
      <text y={(props.height - props.padding/2) - 3} x={1.5 * props.padding + props.width / 2}>45 mins</text>
      <text y={(props.height - props.padding/2) - 3} x={1.5 * props.padding + 2 * props.width / 3}>60+ mins</text>
    </g>
  </svg>;
};