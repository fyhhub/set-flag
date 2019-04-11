import React from 'react'
import { Link } from 'react-router-dom'
import {
    Form, Icon, Input, Button, Checkbox, Avatar 
} from 'antd';
import './index.less'
import { connect } from 'react-redux'
import { getAvatar, login } from '../../redux/actions/login'
import { getLocalStorage, setLocalStorage } from '../../utils/localStorage' 
class Login extends React.Component {
    componentDidMount() {
        this.initChecked()
    }
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
                            })(<Checkbox onChange={this.handleChecked}>记住我</Checkbox>)
                        }
                        <Link to='/register'>没有账号？现在注册</Link>
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
    handleBlur = (e) => {
        let username = e.target.value
        let { handleGetAvatar } = this.props
        handleGetAvatar(username)
    }
    handleChecked = (e) => {
        let { username } = this.props
        if (e.target.checked) {
            setLocalStorage('loginRemember', username)
        } else if (!e.target.checked) {
            setLocalStorage('loginRemember', '')
        }
    }
    initChecked = () => {
        let username = getLocalStorage('loginRemember')
        let { setFieldsValue } = this.props.form
        if (username) {
            setFieldsValue({'userName': username})
            setFieldsValue({'remember': true})
        } else {
            setFieldsValue({'remember': false})
        }
    }
}
const WrappedLoginForm = Form.create({ name: 'normal_login' })(Login);
const mapStateToProps = (state) => ({
    avatar: state.login.avatar,
    username: state.login.username
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

  