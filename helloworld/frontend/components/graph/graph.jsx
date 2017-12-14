import React from 'react';
import d3 from 'd3';
import LineGraph from './line_graph';
import PredictionIndex from './prediction_index';

const data = [
  [0,0.12],
  [15,0.35],
  [30,0.2],
  [45,0.81],
  [60,0.18]
];

const styles = {
  width: 500,
  height: 400,
  padding: 30,
};


//What to do on refresh? 
//Don says maybe push the component back to index
export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: data};
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Predicted Delay Times</h1>
        <PredictionIndex probabilities={this.props.probabilities} highest={this.props.highest}/>
        <LineGraph {...this.state} {...styles}/>
      </div>
    );
  }
}
