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
  console.log(state.info)
  if(state.info){
    info["origin"] = state.info["origin"];
    info["dest"] = state.info["dest"];
  }
  console.log(info)
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
