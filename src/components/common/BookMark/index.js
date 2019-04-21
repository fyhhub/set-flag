import React from 'react'
import './index.less'
function BookMark({ top='40px', left='-8px', width='120px', content, color='#1890ff' }) {
    return (
        <div className='bookmark' style={{ top: top, left: left}}>
            <div className='after'></div>
            <div className='before' style={{width: width, border: `15px solid ${color}`}}>{content}</div>
        </div>
    )
}
export default BookMark