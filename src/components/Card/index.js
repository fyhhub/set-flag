import React, { useState, useEffect } from 'react'
import { Icon, Modal  } from 'antd'
import store from '../../redux/store'
import './index.less'



function Card(props) {
    const { token, cover, title, content, history } = props
    
    useEffect(() => {
        return () => {
        }
    })

    const handleClick = (e) => {
        if (token) {

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

export default Card