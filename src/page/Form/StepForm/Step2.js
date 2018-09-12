import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {
    Form,
    Input,
    Select,
    Button,
    Divider,
    Alert
} from 'antd'
import {withRouter} from 'react-router-dom'

import '../index.css'

const FormItem = Form.Item
const {Option} = Select

const formItemLayout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 19,
    },
}

class Step2 extends React.Component {

    componentWillMount() {
        const {location, history} = this.props;
        const {state} = location;
        if (!state || (state.from && state.from != '/form/step-form/info')) {
            history.push({pathname: '/form/step-form/info'})
        }
    }

    render() {
        const {form, history, location} = this.props;
        const {payAccount, receiverName, accountType, receiverAccount, amount} = this.props;
        const {getFieldDecorator, validateFields} = form;

        const onValidateForm = () => {
            validateFields((err, values) => {
                if (!err) {
                    let payload = {
                        ...values
                    }
                    history.push({pathname: '/form/step-form/result',state: {from: location.pathname}})
                }
            })
        }
        const onPrev = () => {
            history.push({pathname: '/form/step-form/info', state: {from: location.pathname}})
        }

        return (
            <Form layout="horizontal" className="step-form" hideRequiredMark>
                <Alert
                    closable
                    showIcon
                    message="确认转账后，资金将直接打入对方账户，无法退回。"
                    style={{marginBottom: 24}}
                />

                <FormItem {...formItemLayout} className="step-form-text" label="付款账户">
                    {payAccount}
                </FormItem>
                <FormItem {...formItemLayout} className="step-form-text" label="收款账户">
                    {receiverAccount}
                </FormItem>
                <FormItem {...formItemLayout} className="step-form-text" label="收款人姓名">
                    {receiverName}
                </FormItem>
                <FormItem {...formItemLayout} className="step-form-text" label="转账金额">
                    {amount}
                </FormItem>

                <Divider style={{margin: '24px 0'}}/>

                <FormItem {...formItemLayout} label="支付密码" required={false}>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: '需要支付密码才能进行支付',
                            },
                        ],
                    })(<Input type="password" autoComplete="off" style={{width: '80%'}}/>)}
                </FormItem>
                <FormItem
                    style={{marginBottom: 8}}
                    wrapperCol={{
                        xs: {span: 24, offset: 0},
                        sm: {
                            span: formItemLayout.wrapperCol.span,
                            offset: formItemLayout.labelCol.span,
                        },
                    }}
                    label=""
                >
                    <Button type="primary" onClick={onValidateForm}>
                        提交
                    </Button>
                    <Button onClick={onPrev} style={{marginLeft: 8}}>
                        上一步
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

const mapStateToProps = (state) => ({
    ...state.order
})

export default withRouter(connect(mapStateToProps, null)(Form.create()(Step2)))