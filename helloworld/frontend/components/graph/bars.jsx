import React from 'react';
import * as d3 from 'd3';

export default class Bars extends React.Component {
    constructor(props) {
        super(props);
        this.renderBars = this.renderBars.bind(this);
        this.select = this.select.bind(this);
        this.unSelect = this.unSelect.bind(this);   
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
          y: 370,
          x: this.props.xScale(coords[0]),
          fill: 'steelblue',
          onMouseOver:
          function(d) {
            select(index, barPoints[index]);
          },
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
      .duration(500)
      .ease(d3.easeLinear)

      d3.select(`.bar${index}`).transition(t)
        .style("fill", "rgb(15, 135, 140)");
    }

    unSelect(index, coords) {
      let t = d3.transition()
      .duration(500)
      .ease(d3.easeLinear)

      d3.select(`.bar${index}`).transition(t)
        .style("fill", "rgb(2, 175, 182)");
    }

    componentDidMount() {
      const barPoints = this.props.data;
      console.log(this.props.data)
      let t = d3.transition()
        .duration(1000)
        .ease(d3.easeLinear)

      for(let i = 0; i < this.props.data.length; i++) {
        d3.select(`.bar${i}`).transition(t)
        .attr("height", 370  - this.props.yScale(this.props.data[i][1]))
        .attr("y", this.props.yScale(this.props.data[i][1]))
        .style("fill", "rgb(2, 175, 182)")
      }
    }


    render() {
        return <g>
        { this.props.data.map(this.renderBars())}
      </g>;
    }
}
