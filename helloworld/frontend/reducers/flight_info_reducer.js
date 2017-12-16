import { merge } from 'lodash';
import { RECEIVE_INFO } from '../actions/flight_info_actions';

export default (state={}, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_INFO:
      return merge({}, action.info);
    default: 
      return state;
  }
};