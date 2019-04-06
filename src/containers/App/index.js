import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import './index.less'
class App extends React.Component {
    componentDidMount() {
        
    }
    render() {
        return (
            <div className='app background'>
                <div className='app-content'>
                    <span className='app-content-title hvr-wobble-horizontal'>立个 Flag</span>
                    <div className='app-content-flag'>
                        <span>Flag: 每天坚持英语四级</span>    
                        <span>您已坚持 <em>100</em> 天</span>
                    </div>
                </div>
            </div>
        )
    }
}


export default App