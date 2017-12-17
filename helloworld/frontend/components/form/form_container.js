import { connect } from 'react-redux';
import Form from './form';
import { fetchPrediction } from '../../actions/predictor_actions';
import {receiveInfo} from '../../actions/flight_info_actions';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  fetchPrediction: paramsArr => dispatch(fetchPrediction(paramsArr)),
  receiveInfo: info => dispatch(receiveInfo(info))
});

export default connect(
  null, 
  mapDispatchToProps
)(Form);
