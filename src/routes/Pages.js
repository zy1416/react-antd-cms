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
        name: '分步表单（填写转账信息）',
        component: dynamicWrapper(() => import('../page/Form/StepForm/Step1'))
    },
    '/form/step-form/confirm': {
        name: '分步表单（确认转账信息）',
        component: dynamicWrapper(() => import('../page/Form/StepForm/Step2'))
    },
    '/form/step-form/result': {
        name: '分步表单（完成）',
        component: dynamicWrapper(() => import('../page/Form/StepForm/Step3'))
    },
    '/exception/404': {
        component: dynamicWrapper(() => import('../page/Exception/404'))
    },
    '/exception/403': {
        component: dynamicWrapper(() => import('../page/Exception/403'))
    },
    '/exception/500': {
        component: dynamicWrapper(() => import('../page/Exception/500'))
    }
}