import React from 'react';

export default(props) => {
  const xFunc = (x) => {
    // x + neg offset * width / units + padding
    return (((x + 1) * (410/61)) + 30);
  };
  const yFunc = (y) => {
    // height + padding * y * 100 * height / units
    return (370 - ((y * 100) * 3.4));
  };
  let dPath = "M ";
  for(let i = 0; i < props.probabilities.length; i++) {
    dPath += (xFunc(props.probabilities[i][0]) + " ");
    dPath += (yFunc(props.probabilities[i][1]) + " L ");
  }

  dPath = dPath.slice(0,-2);


  return (<g><path stroke="rgb(2, 175, 182)" strokeWidth="2" fill="none" d={dPath} /></g>);
};
