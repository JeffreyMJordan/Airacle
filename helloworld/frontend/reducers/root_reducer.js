import {combineReducers} from "redux";
import PredictionReducer from './prediction_reducer';
import FlightInfoReducer from './flight_info_reducer';

export default combineReducers({
  prediction: PredictionReducer,
  info: FlightInfoReducer
});