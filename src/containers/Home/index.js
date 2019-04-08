import React from 'react'
import {connect} from 'react-redux'
class Home extends React.Component {
    componentDidMount() {
    }
    render() {
        return (
            <div>
                asdsad
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return ({
        count: state.app.count
    })
}
export default connect(mapStateToProps, null)(Home)