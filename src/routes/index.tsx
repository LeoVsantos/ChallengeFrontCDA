import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/Signin';

import Dashboard from '../pages/Dashboard';
import Legislation from '../pages/Legislation';
import LegislationCreate from '../pages/Legislation/create';
import LegislationEdit from '../pages/Legislation/edit';
import LegislationView from '../pages/Legislation/view';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
        
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/legislation" exact component={Legislation} isPrivate />
    <Route path="/legislation/create" component={LegislationCreate} isPrivate />
    <Route path="/legislation/:id" exact component={LegislationEdit} isPrivate />
    <Route path="/legislation/view/:id"  component={LegislationView} isPrivate />

  </Switch>
);

export default Routes;
