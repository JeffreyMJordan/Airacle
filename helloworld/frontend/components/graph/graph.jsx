import React from 'react';
import d3 from 'd3';
import LineGraph from './line_graph';
import PredictionIndex from './prediction_index';

// const data = [
//   [0,0.12],
//   [15,0.35],
//   [30,0.2],
//   [45,0.81],
//   [60,0.18]
// ];

const styles = {
  width: 500,
  height: 400,
  padding: 30,
};


export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      probabilities: this.props.probabilities,
      highest: this.props.highest,
    };
  }

  componentWillMount() {
    // let prediction = this.props.prediction;
    // window.prediction = prediction;
    document.cookie=`prediction=${JSON.stringify(this.props.prediction)}`;
    // console.log(document.cookie); 
  }

  render() {
    // console.log(this.props);
    let keys = [10, 30, 50];
    let values = [0, 0, 0];
    let pairs = [];
    if (!(JSON.stringify(this.state.probabilities) === "{}")) {
      // let keys = Object.keys(this.state.probabilities);
      values = Object.values(this.state.probabilities);
      // console.log(this.state.probabilities);
      // console.log(this.state.probabilities === '{}');
      // console.log(pairs);
    } 
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      const value = values[index];
      pairs.push([key, value]);
      
    }
    let stats = {
      data: pairs,

    };
    return (
      <div>
        <h1>Predicted Delay Times</h1>
        <PredictionIndex probabilities={this.props.probabilities} highest={this.props.highest}/>
        <LineGraph {...stats} {...styles}/>
      </div>
    );
  }
}
