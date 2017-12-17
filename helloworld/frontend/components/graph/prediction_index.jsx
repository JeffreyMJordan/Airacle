import React from 'react';
import PredictionIndexItem from './prediction_index_item';


class PredictionIndex extends React.Component{
  constructor(props){
    super(props);
    
  }

  render(){
    // console.log(this.props.probabilities);
    let probs = this.props.probabilities;
    return (
      <div className="prediction-index-container">
        <h1>Prediction Breakdown</h1>
        <div className="prediction-index">
          {Object.keys(this.props.probabilities).map( (clas) => <PredictionIndexItem key={clas} probability={this.props.probabilities[clas]} clas={clas}/>)}
        </div>
      </div>
    );
  }
}

export default PredictionIndex;