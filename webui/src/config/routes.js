import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../shared/containers/app';
import NotFound from '../shared/components/app/notFound';
import * as Modules from '../routes/containers';
import * as Hardware from '../routes/hardware';

export default () => (
  <div>
    <Route path="/" component={App}>
      <Route path="hardware" component={Hardware.Page}>
        <IndexRoute component={Hardware.Main} />
      </Route>
      <Route component={Modules.Page}>
        <IndexRoute component={Modules.Main} />
        <Route path="new" component={Modules.New} />
        <Route path="modules/:name" component={Modules.Show} />
      </Route>
    </Route>
    <Route path="*" component={NotFound} />
  </div>
);
