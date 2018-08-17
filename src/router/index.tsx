import * as React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Routes from './routes';
import Utils from '../utils';

export default class Routers extends React.Component {

    render() {
        return (
            <HashRouter>
                <Switch>
                    {Routes.map((route: any) => {
                        const Component = route.component;
                        return (
                            <Route 
                                path={route.path} 
                                // component={route.component} 
                                key={route.key} 
                                render={() => 
                                    Utils.auth() ? <Component /> : <Redirect to="/login" />
                                }
                            />
                        );
                    })}
                </Switch>
            </HashRouter>
        );
    }
}