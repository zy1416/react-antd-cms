import React from 'react'
import {BreadcrumbContext} from './index'

export default function withBreadcrumb(Component) {
    return function breadcrumbComponent(props) {
        return (
            <BreadcrumbContext.Consumer>
                {
                    ({location, breadcrumbNameMap}) =>
                        <Component {...props}
                                   location={location}
                                   breadcrumbNameMap={breadcrumbNameMap}/>
                }
            </BreadcrumbContext.Consumer>
        )
    }

}