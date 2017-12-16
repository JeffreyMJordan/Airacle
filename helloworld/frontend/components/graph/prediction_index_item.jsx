import React from 'react';

class PredictionIndexItem extends React.Component{
  constructor(props){
    super(props);
    console.log(props)
    this.titleHash = {"0": "No delay", "15": "Delay of less than 15 minutes", "30": "Delay of less than 30 minutes", 
    "45": "Delay of less than 45 minutes", "46": "Delay greater than 45 minutes"}
  }

  render(){
    
    return (
      <li>{this.titleHash[this.props.clas]}: {this.props.probability * 100}%</li>
    );
  }
}

export default PredictionIndexItem;