import * as React from 'react';
import { HashRouter as Router, Route, Switch, } from 'react-router-dom';
import './App.css';
import Portal from './views/portal';
import NotFound from './views/NotFound';
import Login from './views/login';
import Utils from './utils';

class App extends React.Component {
    componentDidMount() {
        Utils.auth ? window.location.replace('/#/admin/dashboard') : 
        window.location.replace('/#/login');
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