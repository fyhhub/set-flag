import React, { Component } from 'react'
import BookMark from '../common/BookMark/index'
import { Table, Tag, Avatar } from 'antd'
import { setRank } from '../../redux/actions/global'
import { connect } from 'react-redux'
import ajax from '../../config/ajax'
import parseData from '../../utils/parseData'
import './index.less'

class FlagRank extends Component  {
    state = {
        data: []
    }
    componentDidMount() {
        this.getRank()
    }
    async getRank() {
        const res = await ajax('/getRank')
        let { code, data } = parseData(res)
        data = data.map((e, index) => {
            e.index = data.length - index 
            return e
        })
        if (code === 0) {
            this.props.handleSetRank(data.reverse())
        } 
    }
    render(){
        const columns = [{
            title: '排名',
            dataIndex: 'index',
            key: 'index',
            render: text => <a href="javascript:;">{text}</a>,
          }, {
            title: '昵称',
            dataIndex: 'nickname',
            key: 'nickname',
            render: (tag) => {
                let a = tag.split('||')
                return (
                    <span>
                        <Avatar size="small" icon="user" src={a[0]}/>
                        <span style={{marginLeft: '10px'}}>{a[1]}</span>
                    </span>
                )
            }
          },{
            title: '积分',
            key: 'score',
            dataIndex: 'score',
            render: tag => (
                <span>
                    <Tag color='volcano' >{tag}</Tag>
                </span>
            )
        }];
        return (
            <div className='rank-container'>
                <BookMark
                    content="排行榜"
                    width="100px"
                    color="#e7306b"
                    top='30px'
                />
                <div className='rank'>
                    <Table columns={columns} dataSource={this.props.rank}/>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    rank: state.global.rank
})
const mapDispatchToProps = dispatch => ({
    handleSetRank(data) {
        dispatch(setRank(data))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(FlagRank)