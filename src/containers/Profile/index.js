import React, { useState } from 'react'
import { Avatar, Button, Timeline, Icon } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ProfileEdit from '../../components/FlagProfileEdit/index'
import './index.less'

function Profile(props) {
    const { userInfo } = props
    const [showEdit, setShowEdit] = useState(true)
    const handleProfileEdit = e => {
        setShowEdit(!showEdit)
    }
    if (!userInfo.token && !window.localStorage.getItem('token')) {
        return <Redirect to='/login'/>
    }
    return (
        <div className='profile'> 
            <div className='profile-header'>
                <div className='profile-avatar'>
                    <Avatar shape="square" size={100} icon="user" src={userInfo.avatar}/> 
                    <h1>{userInfo.nickname}</h1>
                </div>
                <div className='profile-edit'>
                    <Button type="dashed" size='large' style={{ color: '#1890ff', borderColor: '#1890ff' }} onClick={handleProfileEdit}>编辑个人资料</Button>
                </div>
            </div>
            {
                showEdit ? <ProfileEdit/> : null
            }
            <div className='profile-record'>
                <Timeline mode="alternate">
                    <Timeline.Item>添加了一条flag</Timeline.Item>
                    <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
                    <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</Timeline.Item>
                    <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
                    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                    <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>Technical testing 2015-09-01</Timeline.Item>
                </Timeline>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        userInfo: state.global.userInfo
    }
}

export default connect(mapStateToProps, null)(Profile)