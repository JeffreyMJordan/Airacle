import React from 'react';
import * as d3 from 'd3';


export default(props) => {
  console.log(props);

  const line = d3.path();
  line.strokeStyle = 'rgb(89, 89, 89)';
  line.moveTo(props.data[0][0], props.data[0][1]);
  line.lineTo(props.data[1][0], props.data[1][1]);
  line.lineTo(props.data[2][0], props.data[2][1]);
  line.lineTo(props.data[3][0], props.data[3][1]);
  line.lineTo(props.data[4][0], props.data[4][1]);
  // line.closePath();


  return <g className="line"><path d={line._} /></g>;
};
