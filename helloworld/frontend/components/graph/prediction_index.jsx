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
      <h3>
        <ul className="prediction-index">
          {Object.keys(this.props.probabilities).map( (clas) => <PredictionIndexItem key={clas} probability={this.props.probabilities[clas]} clas={clas}/>)}
        </ul>
      </h3>
    );
  }
}

export default PredictionIndex;