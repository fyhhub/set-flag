import React, { Component } from 'react'
import BookMark from '../common/BookMark/index'
import { List, Avatar, Icon, Button, Spin } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchDataList } from '../../redux/actions/discuss'
import LazyLoad from 'react-lazyload'
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
        const { items, fetchListPending, loadEnd } = this.props.discuss
        const loadMore =  (
            <div style={{display: 'flex',justifyContent: 'center', alignItems: 'center',marginTop: '20px'}}>
                {
                    fetchListPending ? 
                    (<Spin spinning={fetchListPending} size='large' />)
                    :(
                        <div style={{textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px'}}>
                            {
                                loadEnd? '没有更多了': <Button onClick={this.onLoadMore}>加载更多</Button>
                            }
                        </div>
                    )
                }
            </div>
        ) 
        const handleAgree = e => {
            console.log(e);
        }
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
                                    <Link to={`/detail/${item.id}`}><IconText type="like-o" text={item.agree} onClick={handleAgree}/></Link>,
                                    <Link to={`/detail/${item.id}`}><IconText type="message" text={item.comment_num} onClick={handleAgree} /></Link>
                                ]}
                                extra={
                                    <Link to={`/detail/${item.id}`}>
                                        <LazyLoad>
                                            <img
                                                style={{height: '150px', width: '200px', borderRadius: '8px'}}
                                                alt="logo"
                                                src={item.image || 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'}
                                            />
                                        </LazyLoad>
                                    </Link>
                                }
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} />}
                                    title={<Link to={`/detail/${item.id}`}>{item.nickname}</Link>}
                                    description={item.title}
                                />
                                <div dangerouslySetInnerHTML={{__html: item.content }}></div>
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
