import React from 'react';

const renderPoints = (props) => {
  return (coords, index) => {
    const pointProps = {
      cx: props.xScale(coords[0]),
      cy: props.yScale(coords[1]),
      r: 2,
      key: index
    };
    return <circle {...pointProps} />;
  };
};

export default(props) => {
  return <g>{ props.data.map(renderPoints(props))}</g>;
};
