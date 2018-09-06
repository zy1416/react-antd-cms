import React, {createElement} from 'react'
import {Spin} from 'antd'
import Loadable from 'react-loadable'

const dynamicWrapper = (component) => {
    return Loadable({
        loader: () => {
            return component().then(raw => {
                const Component = raw.default || raw;
                return props =>
                    createElement(Component, {
                        ...props
                    });
            })
        },
        loading: () => {
            return <Spin size="large" className="global-spin"/>;
        }
    });
}

export default {
    '/form/basic-form': {
        component: dynamicWrapper(() => import('../page/Form/BasicForm'))
    },
    '/form/step-form': {
        component: dynamicWrapper(() => import('../page/Form/StepForm'))
    },
    '/form/step-form/info': {
        component: dynamicWrapper(() => import('../page/Form/StepForm/Step1'))
    },
    '/exception/404': {
        component: dynamicWrapper(() => import('../page/Exception/404'))
    }
}