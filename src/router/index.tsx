import * as React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from '../views/dashboard';
import Test from '../views/test';
export default class Routers extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/admin/dashboard" component={Dashboard}  />
                    <Route path="/admin/test" component={Test} />
                    <Route render={() => <Redirect to="/admin/dashboard" />} />
                </Switch>
            </HashRouter>
        );
    }
}