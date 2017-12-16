import React from 'react';
import * as d3 from 'd3';

export default class Bars extends React.Component {
    constructor(props) {
        super(props);
        this.renderBars = this.renderBars.bind(this);
        this.renderToolTips = this.renderToolTips.bind(this);
        this.select = this.select.bind(this);
        this.unSelect = this.unSelect.bind(this);
    }

    renderBars() {
      const barPoints = this.props.data;
      let select = this.select;
      let unSelect = this.unSelect;

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
    
    renderToolTips() {
        return (coords, index) => {
          console.log(coords)
          const ttProps = {
          r: (411/11),
          className: `tt${index}`,
          opacity: 0,
          cy: this.props.yScale(coords[1]) - (411/11),
          cx: this.props.xScale(coords[0]) + (411/11),
          fill: 'steelblue',
          text: `${coords[1]} chance of a ${coords[0]} minute delay`,
          key: index
          };

          let tooltip = <circle {...ttProps} />
          d3.select("tootip").append("text").text(`${ttProps.text}`);

      return tooltip;
      };
    }

    select(index, coords) {
      let t = d3.transition()
      .duration(100)
      .ease(d3.easeLinear)

      d3.select(`.bar${index}`).transition(t)
        .style("fill", "rgb(15, 135, 140)");

      d3.select(`.tt${index}`).transition(t).style("opacity", "0.9");
    }

    unSelect(index, coords) {
      let t = d3.transition()
      .duration(100)
      .ease(d3.easeLinear)

      d3.select(`.bar${index}`).transition(t)
        .style("fill", "rgb(2, 175, 182)");

        d3.select(`.tt${index}`).transition(t).style("opacity", "0");

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
        { this.props.data.map(this.renderToolTips())}
      </g>;
    }
}
