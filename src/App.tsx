import * as React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Portal from './views/portal';
import NotFound from './views/NotFound';
import Login from './views/login';
import Utils from './utils';
import './mock';
import store from './store';
class App extends React.Component {
    constructor(props: any) {
        super(props);
        if (Utils.auth()) {
            let userInfo = sessionStorage.getItem('userInfo') || '';
            store.dispatch.user.setUserInfo(JSON.parse(userInfo));
            window.location.replace('/#/admin/dashboard');
        } else {
            window.location.replace('/#/login');
        }
    }
    render() {
        return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/admin" component={Portal} />
                <Route path="/404" component={NotFound} />
                <Route component={NotFound} />
            </Switch>
        </Router>
        );
    }
}

export default App;