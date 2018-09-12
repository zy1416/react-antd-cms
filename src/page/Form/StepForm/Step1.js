import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {
    Form,
    Input,
    Select,
    Button,
    Divider
} from 'antd'
import {saveOrder, resetOrder} from "../../../redux/actions/order"
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

class Step1 extends React.Component {

    componentWillMount() {
        const {location, resetOrder} = this.props;
        const {state} = location;
        if (!state || (state.from && state.from != '/form/step-form/confirm')) {
            resetOrder();
        }
    }

    render() {
        const {form, saveOrder, history, location} = this.props;
        const {payAccount, receiverName, accountType, receiverAccount, amount} = this.props;
        const {getFieldDecorator, validateFields} = form;
        let accountTypeValue = {accountType};

        const onValidateForm = () => {
            validateFields((err, values) => {
                if (!err) {
                    let payload = {
                        ...values,
                        ...accountTypeValue
                    }
                    saveOrder(payload)
                    history.push({pathname: '/form/step-form/confirm', state: {from: location.pathname}})
                }
            })
        }

        const onChangeType = (value) => {
            accountTypeValue.accountType = value;
        }

        return (
            <Fragment>
                <Form layout="horizontal" className="step-form" hideRequiredMark>
                    <FormItem {...formItemLayout} label="付款账户">
                        {getFieldDecorator('payAccount', {
                            initialValue: payAccount,
                            rules: [{required: true, message: '请选择付款账户'}],
                        })(
                            <Select placeholder="test@example.com">
                                <Option value="ant-design@alipay.com">ant-design@alipay.com</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="收款账户">
                        <Input.Group compact>
                            <Select defaultValue={accountType} style={{width: 100}} onChange={onChangeType}>
                                <Option value="alipay">支付宝</Option>
                                <Option value="bank">银行账户</Option>
                            </Select>
                            {getFieldDecorator('receiverAccount', {
                                initialValue: receiverAccount,
                                rules: [
                                    {required: true, message: '请输入收款人账户'},
                                    {type: 'email', message: '账户名应为邮箱格式'},
                                ],
                            })(<Input style={{width: 'calc(100% - 100px)'}} placeholder="test@example.com"/>)}
                        </Input.Group>
                    </FormItem>
                    <FormItem {...formItemLayout} label="收款人姓名">
                        {
                            getFieldDecorator('receiverName', {
                                initialValue: receiverName,
                                rules: [{required: true, message: '请输入收款人姓名'}]
                            })(<Input placeholder="请输入收款人姓名"/>)
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label="转账金额">
                        {
                            getFieldDecorator('amount', {
                                initialValue: amount,
                                rules: [
                                    {required: true, message: '请输入转账金额'},
                                    {
                                        pattern: /^(\d+)((?:\.\d+)?)$/,
                                        message: '请输入合法金额数字',
                                    }
                                ]
                            })(<Input prefix="￥" placeholder="请输入转账金额"/>)
                        }
                    </FormItem>
                    <FormItem
                        wrapperCol={{
                            xs: {span: 24, offset: 0},
                            sm: {
                                span: formItemLayout.wrapperCol.span,
                                offset: formItemLayout.labelCol.span,
                            },
                        }}
                        label="">
                        <Button type="primary" onClick={onValidateForm}>
                            下一步
                        </Button>
                    </FormItem>
                </Form>
                <Divider style={{margin: '40px 0 24px'}}/>
                <div className="step-form-desc">
                    <h3>说明</h3>
                    <h4>转账到支付宝账户</h4>
                    <p>
                        如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
                    </p>
                    <h4>转账到银行卡</h4>
                    <p>
                        如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
                    </p>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    ...state.order
})

export default withRouter(connect(mapStateToProps, {saveOrder, resetOrder})(Form.create()(Step1)))