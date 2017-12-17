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
  padding: 40,
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
    document.cookie=`info=${JSON.stringify(this.props.info)}`;
    // console.log(document.cookie); 
  }

  delayStatus() {
    let certainty = this.state.probabilities[0] * 100;
    // console.log(certainty);
    if (certainty > 49) {
      return (
        <h2>
          {`Airacle is ${certainty}% certain that your flight from ${this.props.info.origin} to ${this.props.info.dest} will`}<span className="no-delay"> not be delayed</span>
        </h2>
      );
    } else {
      return (
        <h2>
          {`Airacle is ${100 - certainty}% certain your flight from ${this.props.info.origin} to ${this.props.info.dest}`} <span className="delay"> will be delayed</span>
        </h2>
      );
    }
  }

  render() {
    // console.log(this.props);
    let keys = [0, 15, 30, 45, 60];
    let values = [0, 0, 0, 0, 0];
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
      <div className="graph-top">
        <div className="graph">
          <div className="graph-container">
            <div className="delay-container">
                {this.delayStatus()}
            </div>
            <div className="info-container">
         
                <div className="actual-graph float">
                  <PredictionIndex probabilities={this.props.probabilities} highest={this.props.highest} />
                  {/* <h3 className="graph-h3">Predicted Delay Times</h3> */}
                  {/* <LineGraph {...stats} {...styles}/> */}
                  <BarChart {...stats} {...styles} />
                </div>
                <div className="info-tab">
                <div className="other-airlines float">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
                <div className="project-info float">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
                <div className="other-info  float">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
