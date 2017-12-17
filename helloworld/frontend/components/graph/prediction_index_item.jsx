import React from 'react';

class PredictionIndexItem extends React.Component{
  constructor(props){
    super(props);
    // console.log(props)
    this.titleHash = {"0": "No delay", "15": "<15 minutes", "30": "<30 minutes", 
    "45": "<45 minutes", "46": ">45 minutes"};
  }

  render(){
    
    return (
      <li>{this.titleHash[this.props.clas]}: {parseInt(this.props.probability * 100)}%</li>
    );
  }
}

export default PredictionIndexItem;