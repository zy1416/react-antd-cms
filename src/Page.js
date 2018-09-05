import React from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'
import Login from './page/Login'
import './style/index.css'
import BasicLayout from './layouts/BasicLayout'

export default () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/Login" component={Login}/>
                <Route path="/" render={props => <BasicLayout {...props} />}/>
            </Switch>
        </HashRouter>
    )
}