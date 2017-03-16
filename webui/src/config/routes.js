import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../shared/containers/app';
import NotFound from '../shared/components/app/notFound';
import * as Containers from '../routes/containers';
import * as Hardware from '../routes/hardware';

export default () => (
  <div>
    <Route path="/" component={App}>
      <Route path="hardware" component={Hardware.Page}>
        <IndexRoute component={Hardware.Main} />
      </Route>
      <Route component={Containers.Page}>
        <IndexRoute component={Containers.Main} />
        <Route path="new" component={Containers.New} />
        <Route path="containers/:name" component={Containers.Show} />
      </Route>
    </Route>
    <Route path="*" component={NotFound} />
  </div>
);
