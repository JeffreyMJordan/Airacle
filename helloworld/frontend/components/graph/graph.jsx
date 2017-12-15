import React from 'react';
import * as d3 from 'd3';
import LineGraph from './line_graph';
import PredictionIndex from './prediction_index';
import BarChart from './barchart';
import { pack } from 'd3';

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

const barStyles = 
{
  width: 550,
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

  delayStatus() {
    let certainty = this.state.probabilities[0] * 10;
    if (certainty > 49) {
      return (
        <h2>
          {`I'm ${certainty}0% certain that your flight will`}<span className="no-delay"> not be delayed</span>
        </h2>
      );
    } else {
      return (
        <h2>
          {`I'm ${10 - certainty}0% certain your flight`} <span className="delay"> will be delayed</span>
        </h2>
      );
    }
  }

  render() {
    // console.log(this.props);
    let keys = [0, 15, 30, 45, 60];
    let values = [0, 0, 0, 0 ,0];
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
        <div className="graph">
          <div className="graph-container">
            <div className="info-container">

              <div className="delay-container">
                {this.delayStatus()}
              </div>
              <div className="actual-graph">
                <PredictionIndex probabilities={this.props.probabilities} highest={this.props.highest}/>
                <h3>Predicted Delay Times</h3>
                {/* <LineGraph {...stats} {...styles}/> */}
                <BarChart {...stats} {...styles} /> 
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
