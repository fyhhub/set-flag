import React, { useState, useEffect } from 'react'
import { Skeleton, Icon, Button, Drawer, Modal } from 'antd'
import Card from '../Card/index'
import BookMark from '../common/BookMark/index'
import { getFlags } from '../../redux/actions/flagSetting'
import { connect } from 'react-redux'
import debounce from '../../utils/debounce'
import './index.less'
function FlagSetting(props) {
    const [offset, setOffset] = useState(4)
    const [page, setPage] = useState(1)
    const [visible, setVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const { isLoaded, flags, handleGetFlags, token, history } = props
    useEffect(() => {   
        if (!flags.length) {
            handleGetFlags(offset, page)
        }
        return () => {
        }
    }, [])
    useEffect(() => {
        return () => {
            
        }
    }, [flags])

    const handleChangeAnother = debounce(function(e) {
        handleGetFlags(offset, page)
    }, 400, true)


    const handleSetCustomFlag = e => {
        if (!token) {
            Modal.confirm({
                title: '需要登录后添加，是否前往登录',
                onOk() {
                    history.push('/login')
                },
                onCancel() {
                    
                },
                okText:'确认',
                cancelText: '取消'
            })
            return
        } 
        setVisible(true)
    }

    const handleOk = () => {
        setConfirmLoading(true)
        setTimeout(() => {
            setConfirmLoading(false)
            setVisible(false)
        }, 2000)
    }

    const handleCancel = () => {
        setVisible(false)
    }
    return (
        <section className='setflag' >
            <BookMark content='添加今日Flag' width='140px' />
            <div className='another' >
                <div onClick={handleChangeAnother}>
                    <Icon type="sync" />
                    <span>换一批</span>
                </div> 
            </div>
            <div className='setflag-flag' >
                <Skeleton loading={isLoaded} active >
                    {
                        flags.map(item => {
                            return (
                                <Card
                                    title={item.flag_title}
                                    content={item.flag_content}
                                    cover={item.flag_image}
                                    key={item.flag_id}
                                    token={token}
                                    history={history}
                                />
                            )
                        })
                    }
                </Skeleton>

            </div>
            <Button icon="plus" className='setflag-add' size='large' onClick={handleSetCustomFlag}>
                添加自定义Flag
            </Button>
            <Modal
                title="Title"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
            
            </Modal>
        </section>
    )
}
const  mapStateToProps = state => ({
    flags: state.flagSetting.flags,
    isLoaded: state.flagSetting.isLoaded,
    isSuccess: state.flagSetting.isSuccess,
    token: state.global.userInfo.token
})
const mapDispatchToProps = dispatch => ({
    handleGetFlags(offet, page){
        dispatch(getFlags({offet, page}))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(FlagSetting)