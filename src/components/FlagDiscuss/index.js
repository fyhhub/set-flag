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

class FlagDiscuss extends Component {
    componentDidMount() {
        const { page } = this.props.discuss
        this.fetchData(page)
    }
    fetchData = () => {
        this.props.fetchList()
    }
    onLoadMore = (page) => {
        
        this.fetchData(page)
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
                                key={item.title}
                                actions={[
                                    <IconText type="like-o" text="156" />,
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
                                        title={<Link to={`/disucss/${item.id}`}>{item.title}</Link>}
                                        description={item.description}
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
    fetchList() {
        dispatch(fetchDataList())
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(FlagDiscuss)
