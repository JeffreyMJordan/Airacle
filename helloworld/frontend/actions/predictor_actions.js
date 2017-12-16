import * as ApiUtil from '../util/prediction_util';

export const RECEIVE_PREDICTION = "RECEIVE_PREDICTION";

const receivePrediction = (prediction) => {
  console.log(prediction)
  return {
  type: RECEIVE_PREDICTION,
  prediction
}};

export const fetchPrediction = (paramsArr) => dispatch => (
  ApiUtil.fetchPrediction(paramsArr).then(prediction => dispatch(receivePrediction(prediction)))
);