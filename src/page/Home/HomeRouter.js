import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import AllPages from '../Page'

export default class HomeRouter extends React.Component {
    requireLogin = (component) => {
        const {userName} = this.props;
        if (!userName) {
            return <Redirect to={'/login'}/>;
        }
        return component;
    }

    render() {
        const {routers} = this.props;
        return (
            <Switch>
                {
                    routers.map(r => {
                        const route = r => {
                            const Component = AllPages[r.name] || AllPages.NotFound;
                            return (
                                <Route
                                    key={r.route || r.key}
                                    exact
                                    path={r.route || r.key}
                                    component={props => this.requireLogin(<Component {...props}/>)}
                                />
                            )
                        }
                        return route(r);
                    })
                }

            </Switch>
        )
    }
}