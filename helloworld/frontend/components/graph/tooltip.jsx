import React from 'react';
import * as d3 from 'd3';

export default class ToolTip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this)
    if (this.props.display === true) {
      return(
        <div>{this.props.data}</div>
      )
    } else {
      return null
    }
    
  }
}
