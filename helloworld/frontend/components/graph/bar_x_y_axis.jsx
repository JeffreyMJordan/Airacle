import React from 'react';
import BarAxis from './bar_axis';

export default(props) => {
  const xAxis = {
    translate: `translate(0, ${props.height - props.padding})`,
    scale: props.xScale,
    orient: 'bottom'
  };

  const yAxis= {
    translate: `translate(${props.padding}, 0)`,
    scale: props.yScale,
    orient: 'left'
  };

  return <g className="axis">
    <BarAxis {...xAxis}/>
    <BarAxis {...yAxis}/>
  </g>;
};
