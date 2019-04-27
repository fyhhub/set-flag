import React from 'react'
import { Col,Row,BackTop  } from 'antd'
import FlagHeader from '../../components/common/FlagHeader/index'
import './index.less'
class App extends React.Component {
    render() {
        let pathname = this.props.location.pathname
        const paths = ['/login', '/register']
        return (
            <div>
                {
                    paths.includes(pathname) ?
                    this.props.children : (
                        <div className='app'>
                            <FlagHeader {...this.props}/>
                            <Row>
                                <Col xs={0} sm={0} md={0} lg={3} xl={3} />
                                <Col xs={24} sm={24} md={24} lg={18} xl={18}>
                                    { this.props.children }
                                </Col>
                                <Col xs={0} sm={0} md={0} lg={3} xl={3}/>
                            </Row>
                        </div>
                    )
                }
                <BackTop />
            </div>
        )
    }
}

export default App