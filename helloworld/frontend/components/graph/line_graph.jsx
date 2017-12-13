import React from 'react';
import d3 from 'd3';
import Axis from './x_y_axis';
import DataPoints from './datapoints';


const xScale = (props) => {
  return d3.scale.linear()
  .domain([-1, 60])
  .range([props.padding, props.width - props.padding * 2]);
};

const yScale = (props) => {
  return d3.scale.linear()
  .domain([0, 1])
  .range([props.height, props.padding - props.padding]);
};

const valueLine = (props) => {
  return d3.svg.line()
  .x(function(d) { return xScale(d.delayTime); })
  .y(function(d) { return yScale(d.certainty); });
};

export default(props) => {
  const scales = { xScale: xScale(props), yScale: yScale(props) };
  return <svg width={props.width} height={props.height}>
    <DataPoints {...props} {...scales} />
    <Axis {...props} {...scales} />
  </svg>;
};
