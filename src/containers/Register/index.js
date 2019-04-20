import React from 'react'
import { connect } from 'react-redux'
import './index.less'
import { validateUserName, register, setValidateUserNameStatus } from '../../redux/actions/register'
import {
    Form,
    Input,
    Radio,
    Button,
    message
} from 'antd'
class Register extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    }
    handleSubmit = e => {
        e.preventDefault()
        const { handleRegister, form } = this.props
        const values = form.getFieldsValue()
        const errors = form.getFieldsError()
        for (let err in errors) {
            if (errors[err] instanceof Array) {
                message.error('输入的内容有误', 2)
                return
            }
        }
        for (let val in values) {
            if (!values[val]) {
                message.error('输入内容不能为空', 2)
                return
            }
        }
        handleRegister(values)
    }
    handleConfirmBlur = e => {
        const value = e.target.value
        this.setState({ confirmDirty: this.state.confirmDirty || !!value })
    }
    handleUsernameOnBlur = e => {
        const value = e.target.value
        const { handleValidateUserName, handleSetValidateUserName } = this.props
        if (!value) {
            handleSetValidateUserName('error', '用户名不能为空')
            return
        } else {
            handleValidateUserName({ userName: value })
        }
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码输入不一致')
        } else {
            callback()
        }
    }
    validateUserName = (rule, value, callback) => {
        const { handleSetValidateUserName } = this.props
        if (/[<>]/g.test(value)) {
            handleSetValidateUserName('error', '不能包含非法字符')
            callback()
            return
        }
        if (value.length >= 13) {
            handleSetValidateUserName('error', '用户名长度不能超过13')
        } 
        callback()
    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true })
        }
        callback()
    }
    validateNickName = (rule, value, callback) => {
        if (!value.length) callback('请输入昵称')
        if (value.length > 13) {
            callback('昵称长度不能超过13')
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            },
            layout: 'horizontal',
            hideRequiredMark: true
        }
        const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 8,
              },
            },
        }
        
        const { validateUserNameStatus, help, userInfo } = this.props
        console.log(userInfo);
        if (userInfo.token) {
            setTimeout(() => {
                this.props.history.goBack()
            }, 1500)
        }
        return (
            <div className='register'>
                <div className='reg-form'>
                    <div className='reg-header'>
                        <h1>立个Flag</h1>
                    </div>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit} className='registerForm'>
                        <Form.Item 
                            hasFeedback 
                            validateStatus={validateUserNameStatus}
                            help={help} >
                            {getFieldDecorator('userName', {
                                rules: [
                                    {
                                        validator: this.validateUserName
                                    }
                                ]
                            })(<Input onBlur={this.handleUsernameOnBlur} autoComplete='off' placeholder='用户名'/>)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入密码'
                                    },
                                    {
                                        validator: this.validateToNextPassword
                                    }
                                ]
                            })(<Input type="password" placeholder='密码' />)}
                        </Form.Item>
                        <Form.Item >
                            {getFieldDecorator('confirm', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入确认密码'
                                    },
                                    {
                                        validator: this.compareToFirstPassword
                                    }
                                ]
                            })(
                                <Input
                                    type="password"
                                    onBlur={this.handleConfirmBlur}
                                    placeholder='确认密码' 
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('nickname', {
                                rules: [
                                    {
                                        validator: this.validateNickName
                                    }
                                ]
                            })(<Input  placeholder='昵称' autoComplete='off'/>)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email', message: '邮箱格式不正确',
                                    }, {
                                        required: true, message: '请输入邮箱',
                                    }
                                ],
                                })(<Input placeholder='邮箱' autoComplete='off'/>)
                            }
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('sex')(
                                <Radio.Group>
                                    <Radio value="1">男</Radio>
                                    <Radio value="0">女</Radio>
                                </Radio.Group>
                            )}
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout} >
                            <Button type="primary" htmlType="submit" >注册</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
const WrappedRegistrationForm = Form.create({ name: 'register' })(Register)
const mapStateToProps = state => ({
    validateUserNameStatus: state.register.validateUserNameStatus,
    help:  state.register.help,
    userInfo: state.global.userInfo
})
const mapDispatchToProps = dispatch => ({
    handleSetValidateUserName(status, help) {
        dispatch(setValidateUserNameStatus(status, help))
    },
    handleValidateUserName(data) {
        dispatch(validateUserName(data))
    },
    handleRegister(values) {
        dispatch(register(values))
    }
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedRegistrationForm)
