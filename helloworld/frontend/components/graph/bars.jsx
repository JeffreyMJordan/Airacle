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
          x: this.props.xScale(coords[0]) - (411 / 14) + (2 * this.props.padding),
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
          index === 0 ? pointProps.x = this.props.xScale(coords[0]) - (411 / 14) + (this.props.padding) : this.props.xScale(coords[0]) - (411 / 14) + (2 * this.props.padding);
      return <rect {...pointProps} />;
      };
    }
    
    renderToolTips() {
        return (coords, index) => {
          // console.log(coords)
          const ttProps = {
          height: (411/11),
          width: (411/7),
          className: `tt${index}`,
          opacity: 0,
          rx: 4,
          y: this.props.yScale(coords[1]) - (411/7),
          x: this.props.xScale(coords[0]) - (411 / 14) + (2 * this.props.padding),
          fill: 'steelblue',
          text: `${parseInt(coords[1] * 100)} %`,
          key: index
          };
          index === 0 ? ttProps.x = this.props.xScale(coords[0]) - (411 / 14) + (this.props.padding) : this.props.xScale(coords[0]) - (411 / 14) + (2 * this.props.padding);
          const tttext = {
            y: this.props.yScale(coords[1]) - (411/12),
            x: this.props.xScale(coords[0]) - (411 / 24) + (2 * this.props.padding),
            className: `ttt${index}`,
            fill: "white",
            opacity: 0,
            key: `ttt${index}`
          };
          index === 0 ? tttext.x = this.props.xScale(coords[0]) - (411 / 24) + (this.props.padding) : this.props.xScale(coords[0]) - (411 / 24) + (2 * this.props.padding);
          // console.log(ttProps.text)
      return <g><rect {...ttProps}></rect><text {...tttext}>{ttProps.text}</text></g>;
      };
    }

    select(index, coords) {
      let t = d3.transition()
      .duration(100)
      .ease(d3.easeLinear)

      d3.select(`.bar${index}`).transition(t)
        .style("fill", "rgb(15, 135, 140)");
        

      d3.select(`.tt${index}`).transition(t).style("opacity", "0.9");
      d3.select(`.ttt${index}`).transition(t).style("opacity", "0.9");
    }

    unSelect(index, coords) {
      let t = d3.transition()
      .duration(100)
      .ease(d3.easeLinear)

      let u = d3.transition()
      .duration(200)
      .ease(d3.easeLinear)

      d3.select(`.bar${index}`).transition(t)
        .style("fill", "rgb(2, 175, 182)");

        d3.select(`.tt${index}`).transition(u).style("opacity", "0");
        d3.select(`.ttt${index}`).transition(u).style("opacity", "0");
    }

    componentDidMount() {
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
        return <g className="bars" key="bars">
        { this.props.data.map(this.renderBars())}
        { this.props.data.map(this.renderToolTips())}
      </g>;
    }
}
