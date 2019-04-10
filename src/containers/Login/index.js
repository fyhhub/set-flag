import React from 'react'
import {
    Form, Icon, Input, Button, Checkbox, Avatar 
} from 'antd';
import './index.less'
import { connect } from 'react-redux'
import { getAvatar, login } from '../../redux/actions/login'
class Login extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form
        const { avatar } = this.props
        return (
            <div className='login'>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        <div className='avatar'>
                            <Avatar size={80} 
                                src={avatar} 
                                icon="user"
                            />
                        </div>
                    </Form.Item>
                    <Form.Item>
                        {
                            getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入你的用户名'}],
                            })(<Input autoComplete='off' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" onBlur={this.handleBlur}  />)
                        }
                    </Form.Item>
                    <Form.Item>
                        {
                            getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入你的密码！' }],
                            })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />)}
                    </Form.Item>
                    <Form.Item>
                        {
                            getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>记住我</Checkbox>)
                        }
                        <a href="#">没有账号？现在注册</a>
                        <br/>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let { handleLogin } = this.props
                console.log(values);
                handleLogin(values)
            }
        });
    }
    handleBlur = async (e) => {
        let username = e.target.value
        let { handleGetAvatar } = this.props
        handleGetAvatar(username)
    }
}
const WrappedLoginForm = Form.create({ name: 'normal_login' })(Login);
const mapStateToProps = (state) => ({
    avatar: state.login.avatar,
})
const mapDispatchToProps = (dispatch) => ({
    handleGetAvatar(username) {
        if (!username) return
        dispatch(getAvatar(username))
    },
    handleLogin(userInfo) {
        dispatch(login(userInfo))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(WrappedLoginForm)

  