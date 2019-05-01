import React, { useEffect, Component } from 'react'
import { Icon, Modal, message  } from 'antd'
import ajax from '../../config/ajax'
import parseData from '../../utils/parseData'
import { connect } from 'react-redux'
import { setTasks, getTasks } from '../../redux/actions/flagSetting'
import img from '../../assets/images/sys_flag008.jpg'
import './index.less'


class Card extends Component {


    handleClick = (e) => {
        const { token, history, id, handleGetTasks } = this.props
        if (token) {
            Modal.confirm({
                title: '是否添加此Flag',
                async onOk() {
                    const res = await ajax('/addFlag', { id }, 'post')
                    const { code, msg } = parseData(res)
                    if (code === 0) {
                        message.success(msg)
                        handleGetTasks()
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
    shouldComponentUpdate(newProps, newState) {
        return this.props.location.action === 'PUSH'
    }
    render() {
        const {cover, title, content } = this.props
        return (
            <div className='card' style={{backgroundImage: `url(${cover})`}}>
                <div className='card-content'>
                    <h3>{title}</h3>
                    <p>{content}</p>   
                </div>
                <Icon type="plus-circle" className='add-card' onClick={this.handleClick}/>
            </div> 
        )
    }
}



const mapStateToProps = state => ({
    tasks: state.flagSetting.tasks
})
const mapDispatchToProps = dispatch => ({
    handleGetTasks() {
        dispatch(getTasks())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Card)