import React from 'react'
import PropTypes from 'prop-types'
import {Switch, Route, Redirect} from 'react-router-dom'
import Pages from './Pages'

export default class BasicRouter extends React.Component {
    static propTypes = {
        routers: PropTypes.array
    }

    static defaultProps = {
        routers: []
    }

    requireLogin = (component) => {
        // const {userName} = this.props;
        // if (!userName) {
        //     return <Redirect to={'/login'}/>;
        // }
        return component;
    }

    route = (r) => {
        const Component = (Pages[r.path] && Pages[r.path].component) || Pages['/exception/404'].component;
        return (
            <Route
                key={r.path}
                path={r.path}
                component={props => this.requireLogin(<Component {...props}/>)}
            />
        )
    }

    handleRouters = (routers = []) => {
        return [...routers].map(r => {
            return r.children ? this.handleRouters(r.children) : this.route(r);
        })
    }

    render() {
        const {routers} = this.props;
        return (
            <Switch>
                {this.handleRouters(routers)}
            </Switch>
        )
    }
}
