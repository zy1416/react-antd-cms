import React, {Fragment} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {Card, Steps} from 'antd'
import PageHeaderLayout from '../../../layouts/PageHeaderLayout'

import Step1 from './Step1'
import Step2 from './Step2'

const {Step} = Steps;

export default class StepForm extends React.Component {
    state = {
        stepRoute: [
            {key: 'info', path: '/form/step-form/info', component: Step1},
            {key: 'confirm', path: '/form/step-form/confirm', component: Step2},
            {key: 'result', path: '/form/step-form/result', component: Step1}
        ]
    }

    render() {
        const {match, routerData, location} = this.props;
        return (
            <PageHeaderLayout
                title="分步表单"
                content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。"
            >
                <Card bordered={false}>
                    <Fragment>
                        <Steps current={0}>
                            <Step title="填写转账信息"/>
                            <Step title="确认转账信息"/>
                            <Step title="完成"/>
                        </Steps>
                        <Switch>
                            {
                                this.state.stepRoute.map((item) => {
                                    return (
                                        <Route
                                            key={item.path}
                                            exact
                                            path={item.path}
                                            component={item.component}
                                        />
                                    )
                                })
                            }
                            <Redirect exact from="/form/step-form" to="/form/step-form/info"/>
                        </Switch>
                    </Fragment>
                </Card>
            </PageHeaderLayout>
        )
    }
}