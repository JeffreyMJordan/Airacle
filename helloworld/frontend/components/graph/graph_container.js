import { connect } from 'react-redux';
import Graph from './graph';
import { fetchPrediction } from '../../actions/predictor_actions';

const mapStateToProps = (state) => {
  // console.log(state);
  let probabilities = {};
  let highest = undefined;
  let prediction = undefined;
  let info = {};
  if(state.prediction){
    probabilities = state.prediction.probabilities;
    highest = state.prediction.highest;
    prediction = state.prediction;
  }
  if(state.info){
    info["origin"] = state.info["originAirport"];
    info["dest"] = state.info["destAirport"];
  }
  return {
    data: state.data,
    probabilities,
    highest,
    prediction,
    info
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchPrediction: paramsArr => dispatch(fetchPrediction(paramsArr))
});

export default connect(
  mapStateToProps,
  null
)(Graph);
