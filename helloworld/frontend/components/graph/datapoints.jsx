import React from 'react';
import * as d3 from 'd3';

export default class DataPoints extends React.Component {
  constructor(props) {
    super(props);
    this.renderPoints = this.renderPoints.bind(this);
    this.logger = this.logger.bind(this);
  }

  renderPoints() {
    const points = this.props.data;
    return (coords, index) => {
      const pointProps = {
        cx: this.props.xScale(coords[0]),
        cy: this.props.yScale(coords[1]),
        r: 1,
        fill: "rgb(2, 175, 182)",
        key: index,
        onMouseOver: this.logger(coords),
        // onMouseOut: hideToolTip
      };
      return <circle {...pointProps} />;
    };
  };

  componentDidMount() {
    let t = d3.transition()
    .duration(2000)
    .ease(d3.easeLinear)

    d3.selectAll("circle").transition(t)
      .style("fill", "rgb(224, 8, 194)")
      .style("r", 6)
  }
  
  logger(coords) {
    console.log(coords);
  }
  
  displayToolTip(tooltip) {
    if (tooltip.display === true) {
      return <div id="tooltip" >{tooltip.message}</div>
    } else {
      return <div></div>
    }
  }
  
  createToolTips(props) {
    for(let i = 0; i < this.props.data.length; i++) {
      const tooltipProps = {
        display: false,
        message: `${this.props.data[1]} chance of a ${this.props.data[0]} minute delay.`
      }
    }
  }
  
  renderToolTip(tooltip) {
    tooltip.setState({ display: true });
  };
  
  hideToolTip() {
    tooltips
  };

  render() {
    return <g>
      { this.props.data.map(this.renderPoints(this.props))}
    </g>;
  };
}



// const hideToolTip = () => {
//   document.getElementById("tooltip").setState({display: false});
// };


