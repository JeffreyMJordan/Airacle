import React from 'react';
import * as d3 from 'd3';
import Axis from './x_y_axis';
import DataPoints from './datapoints';
import Line from './line';


const xScale = (props) => {
  return d3.scaleLinear()
  .domain([-1, 60])
  .range([props.padding, props.width - props.padding * 2]);
};

const yScale = (props) => {
  return d3.scaleLinear()
  .domain([0, 1])
  .range([props.height - props.padding, props.padding]);
};

export default(props) => {
  const scales = { xScale: xScale(props), yScale: yScale(props) };
  return <svg width={props.width} height={props.height}>
    <Line {...props} />
    <DataPoints {...props} {...scales} />
    <Axis {...props} {...scales} />
  </svg>;
};
