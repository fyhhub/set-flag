import React from 'react'
import { connect } from 'react-redux'
import FlagSetting from '../../components/FlagSetting/index'
import FlagDiscuss from '../../components/FlagDiscuss/index'
import './index.less'


function Home(props) {
    return (
        <div className='home'>
            <FlagSetting {...props}/>
            <FlagDiscuss {...props}/>
        </div> 
    )
}
const mapStateToProps = state => ({
    app: state
})
const mapDispatchToProps = dispatch => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(Home)