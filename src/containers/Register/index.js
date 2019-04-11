import React from 'react'
import { connect } from 'react-redux'
import './index.less'
import { validateUserName } from '../../redux/actions/register'
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete
} from 'antd'

class Register extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        help: ''
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
            }
        })
    }

    handleConfirmBlur = e => {
        const value = e.target.value
        this.setState({ confirmDirty: this.state.confirmDirty || !!value })
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!')
        } else {
            callback()
        }
    }
    validateUserName = (rule, value, callback) => {
        const form = this.props.form
        if (value.length > 13) {
            this.setState({help: '用户名长度不能超过13'})
        }
        callback()
    }
    validateUserNameMsg = validateUserNameStatus => {
        if (validateUserNameStatus === 'error') {
            this.setState({help: '该用户名不存在'})
        } 
    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true })
        }
        callback()
    }
    handleUsernameOnBlur = e => {
        const value = e.target.value
        const form = this.props.form
        if (!value.length) {
            return 
        }
        const { handleValidateUserName } = this.props
        handleValidateUserName({ username: value, form })
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
        const { validateUserNameStatus } = this.props
        const { help } = this.state
        this.validateUserNameMsg(validateUserNameStatus)
        return (
            <div className='register'>
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className='registerForm'>
                    <Form.Item 
                        label="用户名" 
                        hasFeedback 
                        validateStatus={validateUserNameStatus}
                        help={help} 
                    >
                        {getFieldDecorator('username', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入用户名'
                                },
                                {
                                    validator: this.validateUserName
                                }
                            ]
                        })(<Input onBlur={this.handleUsernameOnBlur} autoComplete='off'/>)}
                    </Form.Item>
                    <Form.Item label="密码">
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
                        })(<Input type="password" />)}
                    </Form.Item>
                    <Form.Item label="确认密码">
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please confirm your password!'
                                },
                                {
                                    validator: this.compareToFirstPassword
                                }
                            ]
                        })(
                            <Input
                                type="password"
                                onBlur={this.handleConfirmBlur}
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>
                                昵称&nbsp;
                                <Tooltip title="选填">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        }
                    >
                        {getFieldDecorator('nickname', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入昵称',
                                    whitespace: true
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
const WrappedRegistrationForm = Form.create({ name: 'register' })(Register)
const mapStateToProps = state => ({
    validateUserNameStatus: state.register.validateUserNameStatus
})
const mapDispatchToProps = dispatch => ({
    handleValidateUserName(data) {
        dispatch(validateUserName(data))
    }
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedRegistrationForm)
