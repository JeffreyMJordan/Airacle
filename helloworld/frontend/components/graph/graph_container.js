import { connect } from 'react-redux';
import Graph from './graph';
import { fetchPrediction } from '../../actions/predictor_actions';

const mapStateToProps = (state) => {
  // console.log(state);
  let probabilities = {};
  let highest = undefined;
  if(state.prediction){
    probabilities = state.prediction.probabilities;
    highest = state.prediction.highest;
    
  }
  return {
    data: state.data,
    probabilities,
    highest
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchPrediction: paramsArr => dispatch(fetchPrediction(paramsArr))
});

export default connect(
  mapStateToProps,
  null
)(Graph);
