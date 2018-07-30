import * as React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from '../views/dashboard';
import routes from './routes';

export default class Routers extends React.Component {

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/admin/dashboard" component={Dashboard}  />
                    {routes.map(route => (
                        <Route path={route.path} component={route.component} key={route.path} />
                    ))}
                    <Route render={() => <Redirect to="/admin/dashboard" />} />
                </Switch>
            </HashRouter>
        );
    }
}