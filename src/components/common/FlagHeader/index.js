import React, { Component } from 'react'
import { Row, Col, Button, Avatar, Badge, Popover, Icon } from 'antd';
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './index.less'
const handleClickExit = (e) => {
    window.localStorage.removeItem('token')
    window.location.reload()
}
const content = (
    <div className='userInfo-popover'>
        <div className='personal-center'>
            <Icon type='user'/>
            <Link to='/profile'>个人中心</Link>
        </div>
        <div className='exit' onClick={handleClickExit}><Icon type='logout'/><span>退出登录</span></div>
    </div>
)
class FlagHeader extends Component {
    handleClick = (e) => {
        this.props.history.push('/register')
    }

    render() {
        const { userInfo } = this.props
        return (
            <Row className='flag-header'>
                <Col xs={1} sm={1} md={1} lg={3} xl={3} />
                <Col xs={22} sm={22} md={22} lg={18} xl={18}>
                    <header className='flag-header-main'>
                        <div className='flag-header-left'>
                            <NavLink to='/home' className='flag-logo' >立个Flag</NavLink>
                            <nav>
                                <NavLink to='/home' className='nav-item' activeClassName='nav-active'>首页</NavLink>
                                <NavLink to='/home' className='nav-item' activeClassName='nav-active'>打卡记录</NavLink>
                            </nav>
                        </div>
                        <div className='flag-header-right'>
                            {
                                userInfo && userInfo.token ? 
                                (
                                    <Popover content={content}  placement="bottom" className='avatar-content'>
                                        <Badge><Avatar shape="round" src={userInfo.avatar} icon="user" size={45} className='avatar'/></Badge>
                                        <div className='nickname'>{userInfo.nickname}</div>
                                    </Popover>
                                ):(
                                    <div>
                                        <Link to='/login' className='login-btn'>登录</Link>
                                        <Button type="primary" shape="round" size='large' onClick={this.handleClick}>注册</Button>
                                    </div> 
                                )
                            }
                        </div>
                    </header>
                </Col>
                <Col xs={1} sm={1} md={1} lg={3} xl={3}/>
            </Row>
        )
    }
}
const mapStateToProps = (state) => ({
    userInfo: state.global.userInfo
})

export default connect(mapStateToProps, null)(FlagHeader)