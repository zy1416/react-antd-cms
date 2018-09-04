import React from 'react'
import {Form, Icon, Input, Button, Checkbox} from 'antd'
import Fetch from '../../utils/fetch'

const FormItem = Form.Item;

class LoginForm extends React.Component {

    login = ({userName, password}) => {
        Fetch('/login', {userName, password}).then((response) => {
            this.props.logIn(userName)
            this.props.history.push({pathname: '/Home'})
        }).catch(response => {
            console.log(response)
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
               this.login(values)
            }
        })

    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="react-login-container">
                <div className="react-login">
                    <Form onSubmit={this.handleSubmit} className="react-login-form">
                        <h1>登录系统</h1>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{required: true, message: '请输入用户名!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="Username"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '请输入密码!'}],
                            })(
                                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                       placeholder="Password"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}
                            <a className="react-login-form-forgot" href="">Forgot password</a>
                            <Button type="primary" htmlType="submit" className="react-login-form-button">
                                Log in
                            </Button>
                            Or <a href="">register now!</a>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Form.create()(LoginForm);