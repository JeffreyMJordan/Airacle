import {combineReducers} from "redux";
import PredictionReducer from './prediction_reducer';

export default combineReducers({
  prediction: PredictionReducer,
  test: {}
});