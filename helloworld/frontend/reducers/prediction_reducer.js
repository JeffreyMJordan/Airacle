import { merge } from 'lodash';
import {
  RECEIVE_PREDICTION
} from '../actions/predictor_actions';

export default (state = {}, action) => {
  let newState;
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PREDICTION:
      newState = merge({}, action.prediction);
      return newState;
    default:
      return state;
  }
};