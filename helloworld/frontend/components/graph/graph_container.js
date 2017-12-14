import { connect } from 'react-redux';
import Graph from './graph';
import { fetchPrediction } from '../../actions/predictor_actions';

const mapStateToProps = (state) => ({
  data: state.data
});

const mapDispatchToProps = (dispatch) => ({
  fetchPrediction: paramsArr => dispatch(fetchPrediction(paramsArr))
});

export default connect(
  mapStateToProps,
  null
)(Graph);
