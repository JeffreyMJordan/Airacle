export const RECEIVE_INFO = "RECEIVE_INFO";

export const receiveInfo = (info) => {
  console.log("dispatched");
  return {
    type: RECEIVE_INFO,
    info};
};