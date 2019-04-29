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
                    
                </div>
            </div>
            {
                showEdit ? <ProfileEdit /> : null
            }
        </div>
    )
}
const mapStateToProps = state => {
    return {
        userInfo: state.global.userInfo
    }
}


export default connect(mapStateToProps, null)(Profile)