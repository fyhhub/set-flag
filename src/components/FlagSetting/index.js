import React, { useState, useEffect } from 'react'
import { Skeleton, Icon, Button, Modal, Input, Progress, Empty, message, Tag, Divider, Drawer } from 'antd'
import { getFlags, getTasks } from '../../redux/actions/flagSetting'
import { connect } from 'react-redux'
import { addListItem } from '../../redux/actions/discuss'
import parseData from '../../utils/parseData'
import ajax from '../../config/ajax'
import Card from '../Card/index'
import BookMark from '../common/BookMark/index'
import debounce from '../../utils/debounce'
import Editor from '../common/Editor/index'
import './index.less'
function FlagSetting(props) {
    const [offset] = useState(4)
    const [page, setPage] = useState(1)
    const [visible, setVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [flagTitle, setFlagTitle] = useState('')
    const [flagContent, setFlagContent] = useState('')
    const [loadIndex, setLoadIndex] = useState(-1)
    const [drawerVisible, setDrawerVisible] = useState(false)
    const [punchTitle, setPunchTitle] = useState('')
    const [text, setText] = useState('')
    const { isLoaded, flags, handleGetFlags, token, history, handleGetTasks, tasks, location } = props
    
    useEffect(() => {
        if (flags.length === 0) {
            handleGetFlags(offset, page)
        }
        handleGetTasks()
        return () => {
        }
    }, [])
    useEffect(() => {
        return () => {
            
        }
    }, [flags])

    const handleChangeAnother = debounce(function(e) {
        handleGetFlags(offset, page + 1)
        setPage(page + 1)
    }, 400, true)


    const handleAddCustomFlag = async e => {
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

    const handleOk = async () => {
        let title = flagTitle
        let content = flagContent
        if (!title || !content) {
            message.error('标题或内容不能为空')
            return
        }
        setConfirmLoading(true)
        const res = await ajax('/addFlag', { title, content }, 'post')
        const { code, msg } = parseData(res)
        if (code === 0) {
            setConfirmLoading(false)
            setVisible(false)
            handleGetTasks()
            setFlagTitle('')
            setFlagContent('')
            message.success(msg)
        } else {
            setConfirmLoading(false)
            message.error(msg)
        }
    }

    

    const handleCancel = () => {
        setVisible(false)
    }


    const handleFlagTitleOnChange = e => {
        setFlagTitle(e.target.value)
    }
    const handleFlagContentOnChange = e => {
        setFlagContent(e.target.value)
    }


    const handlePunchFlag = async (index, e) => {
        setLoadIndex(index)
        const res = await ajax('/punchFlag', { punch_id: tasks[index].punch_id }, 'post')
        const {code, msg} = parseData(res)
        if (code === 0) {
            message.success('打卡成功,积分 +10')
            setLoadIndex(-1)
            handleGetTasks()
        } else {
            setLoadIndex(-1)
            message.error(msg)
        }
    }

    const handleOpenDailyPunch = () => {
        setDrawerVisible(true)
    }

    const handleGetText = (text) => {
        setText(text)
    }


    const handlePunchTitleChange = e => {
        setPunchTitle(e.target.value)
    }


    const handleDailyPunch = async e => {
        if (!punchTitle || text.replace(/\s*/g, '') === '<p></p>') {
            message.warn('标题或内容不能为空')
            return
        }
        const res = await ajax('/dailyPunch', {
            title: punchTitle,
            content: text
        }, 'post')
        const { code, msg, data } = parseData(res)
        const { handleAddListItem } = props
        if (code === 0) {
            message.success(msg+',积分 +15')
            setPunchTitle('')
            setDrawerVisible(false)
            setText('')
            handleAddListItem(data)
        } else {
            message.error(msg)
        }
    }
    return (
        <section className='setflag' >
            <BookMark content='添加今日Flag' width='140px' />
            <div className='setflag-left'>
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
                                        location={location}
                                        id={item.flag_id}
                                    />
                                )
                            })
                        }
                    </Skeleton>
                </div>
                <Button icon="plus" className='setflag-add' size='large' onClick={handleAddCustomFlag}>
                    添加自定义Flag
                </Button>
            </div>
            <div className='setflag-right'>
                <h3>今日任务</h3>
                <Progress
                    className='setflag-task-progress'
                    strokeColor={{
                        from: '#108ee9',
                        to: '#87d068',
                    }}
                    percent={
                        parseInt((tasks.filter(e => e.is_true === 'true').length / tasks.length)*100)
                    }
                    status={
                        parseInt((tasks.filter(e => e.is_true === 'true').length / tasks.length)*100) === 100? 'success':'active'
                    }
                />
                <div className='setflag-task'>
                    {
                        tasks.map((item, index) => {
                            return (
                                <div className='setflag-task-title' key={item.punch_id}>
                                    <div className='task-header'>
                                        <Tag 
                                            color={`rgb(${Math.floor(Math.random()*254 + 182)}, ${Math.floor(Math.random()*205 + 67)}, ${Math.floor(Math.random()*173 + 101)})`} 
                                            style={{fontSize:'16px', padding: '4px 8px', color: '#000'}}>
                                            {item.punch_title}
                                        </Tag> 
                                        {
                                            item.is_true === 'true'? <Icon type="check-circle" style={{color: '#52c41a', fontSize: '23px', marginLeft: '10px'}}/> : null
                                        }
                                    </div>
                                    <div className='task-main'>
                                        <span style={{marginRight: '10px'}}>{item.punch_content}</span>
                                        {
                                            item.is_true === 'true'? null : <Button type="primary" icon="check" loading={index === loadIndex} onClick={handlePunchFlag.bind(this, index)}>打卡</Button>
                                        }
                                    </div>
                                    <Divider ></Divider>
                                </div>
                            )
                        })
                    }
                    {
                        tasks.length === 0 ? <Empty description='暂无任务'/> : null
                    }
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button type="primary"  size='default' style={{backgroundColor: '#52c41a', borderColor: '#52c41a'}} onClick={handleOpenDailyPunch}>发表今日总结</Button>
                </div>
            </div>
            <Modal
                title="自定义Flag"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                cancelText='取消'
                okText='确认'
            >   
            <Input 
                placeholder="Flag标题" 
                value={flagTitle} 
                onChange={handleFlagTitleOnChange}
            />
            <Input.TextArea 
                placeholder="Flag内容" 
                autosize={{ minRows: 2, maxRows: 6 }} 
                style={{marginTop: '20px'}} 
                value={flagContent} 
                onChange={handleFlagContentOnChange}
            />
            </Modal>
            <Drawer
                title="发表今日总结"
                placement='bottom'
                closable={true}
                onClose={() => { setDrawerVisible(false) }}
                visible={drawerVisible}
                height={500}
            >
                <div className='daily-punch-wrapper'>
                    <input type="text" className='daily-punch-title' placeholder="标题" value={punchTitle} onChange={handlePunchTitleChange}/>
                    <div className='daily-punch-push'>
                        <Button 
                            type="dashed" 
                            icon="edit" 
                            style={{borderColor: ' rgb(24, 144, 255)', color: 'rgb(24, 144, 255)'}}
                            onClick={handleDailyPunch}
                        >
                        发布</Button>
                    </div>
                </div>
                <Editor getText={handleGetText}>
                </Editor>
            </Drawer>
        </section>
    )
}
const mapStateToProps = state => ({
    flags: state.flagSetting.flags,
    isLoaded: state.flagSetting.isLoaded,
    isSuccess: state.flagSetting.isSuccess,
    tasks: state.flagSetting.tasks,
    token: state.global.userInfo.token,
})
const mapDispatchToProps = dispatch => ({
    handleGetFlags(offset, page){
        dispatch(getFlags({offset, page}))
    },
    handleGetTasks() {
        dispatch(getTasks())
    },
    handleAddListItem(data) {
        dispatch(addListItem(data))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(FlagSetting)