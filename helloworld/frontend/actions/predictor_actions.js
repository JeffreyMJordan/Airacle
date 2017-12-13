import * as ApiUtil from '../util/prediction_util';

export const RECEIVE_PREDICTION = "RECEIVE_PREDICTION";

const receivePrediction = (prediction) => ({
  type: RECEIVE_PREDICTION,
  prediction
});

export const fetchPrediction = () => dispatch => (
  ApiUtil.fetchPrediction().then(prediction => dispatch(receivePrediction(prediction)))
);