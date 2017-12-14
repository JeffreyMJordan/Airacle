import React from 'react';

class PredictionIndexItem extends React.Component{
  constructor(props){
    super(props);
    console.log("here");
  }

  render(){
    
    return (
      <li>{this.props.clas}: {this.props.probability}</li>
    );
  }
}

export default PredictionIndexItem;