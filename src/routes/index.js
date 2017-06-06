import React from 'react'
import { Router, Route, Switch }  from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import App from '../containers/App'
import SignUp from '../containers/SignUp'

const history = createBrowserHistory()

export default () =>
    <Router history={history}>
        <Switch>
            <Route exact path='/' component={App} />
            <Route path="/signUp" component={SignUp}/>
        </Switch>
    </Router>
