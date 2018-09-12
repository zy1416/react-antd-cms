import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {Button, Row, Col} from 'antd'
import {withRouter} from 'react-router-dom'
import '../index.css'

import Result from '../../../component/Result'

class Step3 extends React.Component {

    componentWillMount() {
        const {location, history} = this.props;
        const {state} = location;
        if (!state || (state.from && state.from != '/form/step-form/confirm')) {
            history.push({pathname: '/form/step-form/info'})
        }
    }

    render() {
        const {history} = this.props;
        const {payAccount, receiverName, accountType, receiverAccount, amount} = this.props;

        const onFinish = () => {
            history.push({pathname: '/form/step-form'})
        }
        const information = (
            <div className="step-form-information">
                <Row>
                    <Col xs={24} sm={8} className="step-form-label">
                        付款账户：
                    </Col>
                    <Col xs={24} sm={16}>
                        {payAccount}
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={8} className="step-form-label">
                        收款账户：
                    </Col>
                    <Col xs={24} sm={16}>
                        {receiverAccount}
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={8} className="step-form-label">
                        收款人姓名：
                    </Col>
                    <Col xs={24} sm={16}>
                        {receiverName}
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={8} className="step-form-label">
                        转账金额：
                    </Col>
                    <Col xs={24} sm={16}>
                        <span className="step-form-uppercase">{amount}</span> 元
                    </Col>
                </Row>
            </div>
        );
        const actions = (
            <Fragment>
                <Button type="primary" onClick={onFinish}>
                    再转一笔
                </Button>
                <Button>查看账单</Button>
            </Fragment>
        );

        return (
            <Result
                type="success"
                title="操作成功"
                description="预计两小时内到账"
                extra={information}
                actions={actions}
                className="step-form-result"
            />
        )
    }
}

const mapStateToProps = (state) => ({
    ...state.order
})

export default withRouter(connect(mapStateToProps, null)(Step3))

