import React from 'react';
import BarAxis from './bar_axis';

export default(props) => {
  // console.log(props)
  const xAxis = {
    translate: `translate(0, ${props.height - props.padding})`,
    scale: props.xScale,
    orient: 'bottom',
    text: "Delay Time (minutes)",
    titleRotation: "rotate(0)",
    titleTranslate: `translate(${props.width / 2}, ${props.height - (props.padding / 4)})`
  };

  const yAxis = {
    translate: `translate(${props.padding}, 0)`,
    scale: props.yScale,
    orient: 'left',
    text: "Confidence Level",
    titleRotation: "rotate(-90)",
    titleTranslate: `translate(${props.padding / 3}, ${props.height / 2})`
  };

  return <g className="axis">
    <BarAxis {...xAxis} {...props}/>
    <BarAxis {...yAxis}/>
  </g>;
};
