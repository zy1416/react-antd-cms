import React from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'
import Home from './page/Home'
import Login from './page/Login'
import './page/common.css'

export default () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/Home" component={Home}/>
                <Route path="/Login" component={Login}/>
            </Switch>
        </HashRouter>
    )
}