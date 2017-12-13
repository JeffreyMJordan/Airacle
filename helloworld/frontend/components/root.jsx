import React from 'react';
import App from './app';
import { Provider } from 'react-redux';

export default ({ store }) => (
  <Provider store={store}>
    
      <App />
    
  </Provider>
);