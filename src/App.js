import React from 'react';
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";

import PollListView from './views/PollListView';
import PollDetailView from './views/PollDetailView';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={PollListView} />
        <Route exact path="/question/:id" component={PollDetailView} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
