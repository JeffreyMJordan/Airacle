import React from 'react';
import * as d3 from 'd3';

export default class Line extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let t = d3.transition()
    .duration(1000)
    .ease(d3.easeLinear);

    d3.select(".line").transition(t)
      .style("stroke", "rgb(2, 175, 182)");
  }

  render() {
    const xFunc = (x) => {
      // x + neg offset * width / units + padding
      return (((x + 1) * (410/61)) + 30);
    };
    const yFunc = (y) => {
      // height + padding * y * 100 * height / units
      return (370 - ((y * 100) * 3.4));
    };
    let dPath = "M ";
    for(let i = 0; i < this.props.data.length; i++) {
      dPath += (xFunc(this.props.data[i][0]) + " ");
      dPath += (yFunc(this.props.data[i][1]) + " L ");
    }
  
    dPath = dPath.slice(0,-2);
    return (<g><path className="line" stroke="white" strokeWidth="2" fill="none" d={dPath} /></g>);
  };

}