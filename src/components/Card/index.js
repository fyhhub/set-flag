import React, { useEffect } from 'react'
import { Icon, Modal, message  } from 'antd'
import ajax from '../../config/ajax'
import parseData from '../../utils/parseData'
import { connect } from 'react-redux'
import { setTasks } from '../../redux/actions/flagSetting'
import './index.less'


function Card(props) {
    const { token, cover, title, content, history, id, tasks, handleSetTasks } = props
    useEffect(() => {
        return () => {
        }
    })

    const handleClick = (e) => {
        if (token) {
            Modal.confirm({
                title: '是否添加此Flag',
                async onOk() {
                    const res = await ajax('/addFlag', { id }, 'post')
                    const { code, msg, data } = parseData(res)
                    if (code === 0) {
                        const newTasks = [...tasks, data]
                        message.success(msg)
                        handleSetTasks(newTasks)
                    } else {
                        message.error(msg)
                    }
                },
                onCancel() {
                },
                okText:'确认',
                cancelText: '取消'
            });
        } else {
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
        }
    }
    return (
        <div className='card' style={{backgroundImage: `url(${cover})`}}>
            <div className='card-content'>
                <h3>{title}</h3>
                <p>{content}</p>   
            </div>
            <Icon type="plus-circle" className='add-card' onClick={handleClick}/>
        </div> 
    ) 
}
const mapStateToProps = state => ({
    tasks: state.flagSetting.tasks
})
const mapDispatchToProps = dispatch => ({
    handleSetTasks(tasks) {
        dispatch(setTasks(tasks))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Card)