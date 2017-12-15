import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

//Store the prediction in a cookie
const getCookie = (name) => {
  name += "=";
  let arr = document.cookie.split(";");
  console.log(arr);
  console.log(name);
  for(let i = 0; i <arr.length; i++) {
    let key = arr[i];
    while (key.charAt(0) == ' ') {
        key = key.slice(1);
    }
    if (key.indexOf(name) == 0) {
      return key.slice(name.length, key.length);
    }
  }
  return undefined;
};

document.addEventListener("DOMContentLoaded", () => {
  let prediction = undefined;
  if(document.cookie){
    console.log(document.cookie);
    console.log(document.cookie);
    console.log(document.cookie);
    let cookie = getCookie("prediction");
    if (cookie){ 
      prediction = JSON.parse(cookie); 
    }
    console.log(prediction);
  }
  let store = undefined;
  if(prediction){
    console.log(prediction);
    const preloadedState = {prediction: prediction};
    console.log(preloadedState);
    store = configureStore(preloadedState);
  }else{
    store = configureStore();
  }
  const root = document.getElementById("root");
  ReactDOM.render(<Root store={ store }/>, root);
});
