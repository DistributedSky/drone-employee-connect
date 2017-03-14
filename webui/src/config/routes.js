import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../shared/containers/app';
import NotFound from '../shared/components/app/notFound';
import * as Interfaces from '../routes/interfaces';
import * as Hardware from '../routes/hardware';

export default () => (
  <div>
    <Route path="/" component={App}>
      <Route path="hardware" component={Hardware.Page}>
        <IndexRoute component={Hardware.Main} />
      </Route>
      <Route component={Interfaces.Page}>
        <IndexRoute component={Interfaces.Main} />
        <Route path="interface/:name" component={Interfaces.Show} />
      </Route>
    </Route>
    <Route path="*" component={NotFound} />
  </div>
);
