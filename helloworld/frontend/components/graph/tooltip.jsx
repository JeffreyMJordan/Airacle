import React from 'react';
import * as d3 from 'd3';

class ToolTip extends React.Component {
  render() {
    let x = 0;
    let y = 0;
    let visibility = "hidden";
    let transform = "";
    let width = 150;
    let height = 70;
    let transformText = 'translate('+width/2+','+(height/2-5)+')';
    let transformArrow = "";

    if(this.props.tooltip.display == true) {
      let position = this.props.position;

      x = position.x;
      y = position.y;
      visibility = "visible";

    } else {
      visibility = "hidden";
    }

    return (
            <g transform={transform}>
                <rect class="shadow" is width={width} height={height} rx="5" ry="5" visibility={visibility} fill="#6391da" opacity=".9"/>
                <polygon class="shadow" is points="10,0  30,0  20,10" transform={transformArrow}
                         fill="#6391da" opacity=".9" visibility={visibility}/>
                <text is visibility={visibility} transform={transformText}>
                    <tspan is x="0" text-anchor="middle" font-size="15px" fill="#ffffff">{this.props.tooltip.data.key}</tspan>
                    <tspan is x="0" text-anchor="middle" dy="25" font-size="20px" fill="#a9f3ff">{this.props.tooltip.data.value+" visits"}</tspan>
                </text>
            </g>
        );
  }
}
