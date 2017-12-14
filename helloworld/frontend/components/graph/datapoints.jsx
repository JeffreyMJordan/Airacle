import React from 'react';

const renderPoints = (props) => {
  const points = props.data;
  return (coords, index) => {
    const pointProps = {
      cx: props.xScale(coords[0]),
      cy: props.yScale(coords[1]),
      r: 6,
      fill: "rgb(224, 8, 194)",
      key: index,
      // onMouseOver: renderToolTip(),
      // onMouseOut: hideToolTip
    };
    return <circle {...pointProps} />;
  };
};

// const renderToolTip = function() {
//
//   return <div>test</div>;
// };
  // console.log(props);
  // const tooltipProps = {
  //   display: true,
  //   message: `%${props} chance of a ${props} minut delay.`,
  // };
  // if (tooltipProps.display === true) {
  //   return <div id="tooltip" {...tooltipProps} />;
  // }


// const hideToolTip = () => {
//   document.getElementById("tooltip").setState({display: false});
// };

export default(props) => {
  return <g>
    { props.data.map(renderPoints(props))}
  </g>;
};
