import React, { Component } from 'react'
import BookMark from '../common/BookMark/index'
import { List, Avatar, Icon, Button, Spin } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchDataList } from '../../redux/actions/discuss'
import './index.less'

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

let pageIndex = 1
class FlagDiscuss extends Component {
    componentDidMount() {
        const { pageList } = this.props.discuss
        if (!pageList[pageIndex]) {
            this.fetchData(pageIndex)
        }
    }
    fetchData = (page) => {
        this.props.fetchList(page)
    }
    onLoadMore = () => {
        this.fetchData(++pageIndex)
    }
    render() {
        const { items, fetchListPending } = this.props.discuss
        const loadMore =  (
            <div style={{display: 'flex',justifyContent: 'center', alignItems: 'center',marginTop: '20px'}}>
                {
                    fetchListPending ? 
                    (<Spin spinning={fetchListPending} size='large' />)
                    :(
                        <div style={{textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px'}}>
                            <Button onClick={this.onLoadMore}>加载更多</Button>
                        </div>
                    )
                }
            </div>
        ) 
        return (
            <div className="discuss">
                <BookMark
                    content="讨论区"
                    width="100px"
                    color="rgb(255, 143, 105)"
                    top='30px'
                />
                <List
                        itemLayout="vertical"
                        size="large"
                        locale={'暂无数据'}
                        loadMore={loadMore}
                        dataSource={items}
                        renderItem={item => (
                            <List.Item
                                key={item.id}
                                actions={[
                                    <IconText type="like-o" text={item.agree} />,
                                    <IconText type="message" text="2" />
                                ]}
                                extra={
                                    <img
                                        width={272}
                                        alt="logo"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                    />
                                }
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} />}
                                    title={<Link to={`/detail/${item.id}`}>{item.userName}</Link>}
                                    description={item.title}
                                />
                                {item.content}
                            </List.Item>
                        )}
                    />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    discuss: state.discuss
})
const mapDispatchToProps = dispatch => ({
    fetchList(page) {
        dispatch(fetchDataList(page))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(FlagDiscuss)
