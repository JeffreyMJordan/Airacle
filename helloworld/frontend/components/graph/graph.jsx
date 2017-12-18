import React from 'react';
import * as d3 from 'd3';
import LineGraph from './line_graph';
import PredictionIndex from './prediction_index';
import BarChart from './barchart';
import { pack } from 'd3';
import {Link} from 'react-router-dom';

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
                <div className="fifty">
                <div className="actual-graph float">
                  <PredictionIndex probabilities={this.props.probabilities} highest={this.props.highest} />
                  {/* <h3 className="graph-h3">Predicted Delay Times</h3> */}
                  {/* <LineGraph {...stats} {...styles}/> */}
                  <BarChart {...stats} {...styles} />
                </div>
                <Link to={'/'}>
                  <button className="nav-link float">
                    Predict Another Flight
                  </button>
                </Link>
                </div>
                <div className="info-tab">
                  <div className="other-airlines float">
                  We started this project with a hypothesis-driven model that theorized that flight delays were predictable based on airlines and time of year. All variables unnecessary to the hypothesis, as well as variables that the algorithm would not have access to during time of input (i.e. variables that leaked information from the future such as reported delay time) were removed. All inputs were standardized to integers from float64 and the data ranged from January 2015 – December 2016. 
                  </div>
                  <div className="project-info float">
                  While we originally intended for the output to be a binary classification that indicated whether or not the flight will be delayed, we eventually decided to output a numeric possibility signifying the confidence of the algorithm in predicting the ‘class’ of delay, whether or not there will be a delay, and the percentage chance it was likely that the delay would occur within 15 minute increments. The difficulty, then, was in minimizing the cross entropy of our model, which proved difficult to do with the limited amount of data available to us. While following the iterative procedure for gradient descent, it occurred to us that the range of included variables didn’t adequately encompass all the relevant data to fit a response. However, with our hardware’s limited capacity to store such large quantities data, we were limited to 6 columns of variables, and tailored that according to the highest performance output. As a result, our multiclass logistic regression algorithm performs at approximately 67% accuracy. 
                  </div>
                  <div className="other-info  float">
                  The question we attempted to solve was a standard statistical classification problem, where we wanted to test whether or not a plane will be delayed by how many minutes based on the airline, the location from and the location to, the time of year, and the distance. The dependent variable (outcome) was the delay time and the algorithm used was a Multiclass Logistic Regression algorithm imported in from SKLearn. 
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
