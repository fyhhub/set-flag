import React, { useState, useEffect } from 'react'
import { Icon, Skeleton } from 'antd'
import './index.less'



function Card({ cover, title, content }) {
    useEffect(() => {
        return () => {
        }
    })

    const handleClick = (e) => {
        console.log('sss');
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