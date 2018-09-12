import React, {Fragment} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {Card, Steps} from 'antd'
import PageHeaderLayout from '../../../layouts/PageHeaderLayout'

import Pages from '../../../routes/Pages'

const {Step} = Steps;

export default class StepForm extends React.Component {
    state = {
        stepRoute: [
            {key: 'info', path: '/form/step-form/info'},
            {key: 'confirm', path: '/form/step-form/confirm'},
            {key: 'result', path: '/form/step-form/result'}
        ]
    }

    getCurrentStep() {
        const {location} = this.props;
        const {pathname} = location;
        const pathList = pathname.split('/');
        switch (pathList[pathList.length - 1]) {
            case 'info':
                return 0;
            case 'confirm':
                return 1;
            case 'result':
                return 2;
            default:
                return 0;
        }
    }

    render() {
        return (
            <PageHeaderLayout
                title="分步表单"
                content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。">

                <Card bordered={false}>
                    <Fragment>
                        <Steps current={this.getCurrentStep()}>
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
                                            component={Pages[item.path].component}
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