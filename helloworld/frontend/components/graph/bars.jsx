import React from 'react';
import * as d3 from 'd3';
import ToolTip from './tooltip';

export default class Bars extends React.Component {
    constructor(props) {
        super(props);
        this.renderBars = this.renderBars.bind(this);
        this.select = this.select.bind(this);
        this.unSelect = this.unSelect.bind(this);   
        this.state = {
          display: false
        }
    }

    renderBars() {
      const barPoints = this.props.data;
      let select = this.select;
      let unSelect = this.unSelect;
      var div = d3.selectAll("svg").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

      return (coords, index) => {
          const pointProps = {
          width: (411/7),
          className: `bar${index}`,
          height: 0,
          y: 360,
          x: this.props.xScale(coords[0]),
          fill: 'steelblue',
          onMouseOver:
          function(d) {
            select(index, barPoints[index]);
          },
          text: coords,
          onMouseOut:
          function(d) {
            unSelect(index, barPoints[index]);
          },
          key: index
          };

      return <rect {...pointProps} />;
      };
    } 

    select(index, coords) {
      let t = d3.transition()
      .duration(100)
      .ease(d3.easeLinear)

      d3.select(`.bar${index}`).transition(t)
        .style("fill", "rgb(15, 135, 140)");

      this.setState({display: true})
    }

    unSelect(index, coords) {
      let t = d3.transition()
      .duration(100)
      .ease(d3.easeLinear)

      d3.select(`.bar${index}`).transition(t)
        .style("fill", "rgb(2, 175, 182)");

      this.setState({display: false })
    }

    componentDidMount() {
      const barPoints = this.props.data;
      let t = d3.transition()
        .duration(2000)
        .ease(d3.easeLinear)

      for(let i = 0; i < this.props.data.length; i++) {
        d3.select(`.bar${i}`).transition(t)
        .attr("height", 360  - this.props.yScale(this.props.data[i][1]))
        .attr("y", this.props.yScale(this.props.data[i][1]))
        .style("fill", "rgb(2, 175, 182)")
      }
    }


    render() {
      const tooltip = {data: this.props.data, display: false }
        return <g className="bars">
        { this.props.data.map(this.renderBars())}
        <ToolTip {...this.props} display={this.state.display} />
      </g>;
    }
}
