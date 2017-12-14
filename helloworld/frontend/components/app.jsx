import React from 'react';
import FormContainer from './form/form_container';
import Graph from './graph/graph';
import GraphContainer from './graph/graph_container';
import {Route} from 'react-router-dom';

const App = () => (
  <div>
    <Route exact path="/" component={FormContainer} />
    <Route path="/graph" component={GraphContainer} />
  </div>
);

export default App;