import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PressReaction from './pages/PressReaction';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={PressReaction} exact />
      </Switch>
    </BrowserRouter>
  );
}
