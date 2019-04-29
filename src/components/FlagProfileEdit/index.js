import React, { useState, useEffect } from 'react'
import { Divider, Upload, Button, Icon, Input, Modal, message } from 'antd'
import { connect } from 'react-redux'
import { checkToken } from '../../redux/actions/global'
import ajax from '../../config/ajax'
import parseData from '../../utils/parseData'
import './index.less'
function ProfileEdit(props) {
    let { userInfo, handleCheckToken } =  props
    const [visible, setVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [isValid, setIsValid] = useState(true)
    const [newPass, setNewpass] = useState('')
    const [prePass, setPrepass] = useState('')
    const [nickname, setNickname] = useState('')
    useEffect(() => {
        setNickname(userInfo.nickname)
    }, [])
    const handleModifyInfo = async e => {
        try {
            let res = await ajax('/profile/modifyNickname', { nickname }, 'post')
            const { code, msg } = parseData(res)
            if (code === 1) {
                message.error(msg)
            } else {
                message.success(msg)
            }
        } catch(e) {
            console.log(e)
        }
    }
    const handleModifyNickname = e => {
        setNickname(e.target.value)
    }

    const handleOk = async () => {
        if (!newPass || !prePass) {
            message.error('原密码或新密码不能为空')
            return
        }
        if (!isValid) {
            message.error('原密码错误')
            return
        }
        try {
            setConfirmLoading(true)
            let res = await ajax('/profile/modifyPassword', { newPass }, 'post')
            const { code, msg } = parseData(res)
            if (code === 1) {
                message.error(msg)
                setConfirmLoading(false)
            } else {
                setVisible(false)
                message.success(msg)
                setConfirmLoading(false)
            }
        } catch(e) {
            console.log(e)
        }

    }

    const handleCancel = () => {
        setVisible(false)
    }

    const handleModifyPassword = () => {
        setVisible(true)
    }

    const handleCheckPrepass = async e => {
        const value = e.target.value
        if (!value) {
            return
        }
        try {
            setIsValid(true)
            const res = await ajax('/profile/checkPrepass', { prePass: value }, 'post')
            const { code, msg } = parseData(res)
            if (code === 1) {
                setIsValid(false)
                message.error(msg);
            }
        } catch(e) {
            console.log(e)
        }
    }
    const handleBeforeUpload = (file, fileList) => {
        return true
    }

    const handleUploadChange = ({file}) => {
        const { response } = file
        if (response) {
            const { code, msg } = response
            if (code === 0) {
                message.success(msg)
                handleCheckToken(window.localStorage.getItem('token'))
            } else {
                message.error(msg)
            }
        }
    }
    return (
        <div className='profile-editor'>
            <h3>个人资料</h3>
            <Divider/>
            <div className='profile-editor-form'>
                <span className='profile-form-field'>头像</span>
                <div className='profile-form-val'>
                    <div className='profile-form-avatar-upload'>
                        <span>支持 jpg、png 格式大小 5M 以内的图片</span>
                        <Upload
                            action='/setFlag/uploadAvatar'
                            accept='image/*'
                            beforeUpload={handleBeforeUpload}
                            onChange={handleUploadChange}
                        >
                            <Button type='primary'>
                                <Icon type="upload" /> 点击上传
                            </Button>
                        </Upload>
                    </div>
                </div>         
            </div>
            <Divider/>
            <div className='profile-editor-form'>
                <span className='profile-form-field'>用户名</span>
                <div className='profile-form-val'>
                    <span>{userInfo.userName}</span>
                </div>         
            </div>
            <Divider/>
            <div className='profile-editor-form'>
                <span className='profile-form-field'>昵称</span>
                <div className='profile-form-val'>
                    <Input style={{width: '300px'}} className='profile-form-input' value={nickname} onChange={handleModifyNickname}/>
                    <div className='modify' onClick={handleModifyInfo}>
                        <Icon type="edit" /><span>点击修改</span>
                    </div>
                </div>         
            </div>
            <Divider/>
            <div className='profile-editor-form'>
                <span className='profile-form-field'>邮箱</span>
                <div className='profile-form-val'>
                    <span>{userInfo.email}</span>
                </div>         
            </div>
            <Divider/>
            <div className='profile-editor-form'>
                <span className='profile-form-field'>性别</span>
                <div className='profile-form-val'>
                    <span>{userInfo.sex === 1 ? '男': '女'}</span>
                </div>         
            </div>
            <Divider/>
            <div className='profile-editor-form'>
                <span className='profile-form-field'><Button type='primary' onClick={handleModifyPassword}>修改密码</Button></span>
                <div className='profile-form-val'>
                </div>         
            </div>
            <Modal
                title="修改密码"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Input.Password placeholder="原密码" onBlur={handleCheckPrepass} value={prePass} onChange={(e) => {setPrepass(e.target.value)}}/>
                <Input.Password placeholder="新密码" style={{marginTop: '20px'}} value={newPass} onChange={(e) => {setNewpass(e.target.value)}}/>
            </Modal>
        </div>
    )
}
const mapStateToProps = state => ({
    userInfo: state.global.userInfo
})
const mapDispatchToProps = dispatch => ({
    handleCheckToken(token) {
        dispatch(checkToken(token))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit)