import * as React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Portal from './views/portal';
import NotFound from './views/NotFound';

export default () => (
    <Router>
        <Switch>
            <Route exact={true} path="/" render={() => <Redirect to="/admin/dashboard" push={true} />} />        
            <Route path="/admin" component={Portal} />
            <Route path="/404" component={NotFound} />
            <Route component={NotFound} />
        </Switch>
    </Router>
);
