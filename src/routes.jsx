import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import PressReaction from './pages/PressReaction';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/pressReaction" component={PressReaction} />
      </Switch>
    </BrowserRouter>
  );
}
