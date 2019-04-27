import React, { Component } from 'react'
import BookMark from '../common/BookMark/index'
import { List, Avatar, Icon, Spin } from 'antd'
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
        const { page, pageList } = this.props.discuss
        if (!pageList[page]) {
            this.fetchData(page)
        }
    }


    fetchData = (page) => {
        this.props.fetchList(page)
    }
    getDataSource = () => {
        const { items, byId } = this.props.discuss
        if (!items) return []
        return items.map(id => byId[id])
    }
    render() {
        const { pageSize, fetchListPending } = this.props.discuss
        return (
            <div className="discuss">
                <BookMark
                    content="讨论区"
                    width="100px"
                    color="rgb(255, 143, 105)"
                    top='30px'
                />
                <Spin spinning={fetchListPending} size='large'>
                    <List
                        itemLayout="vertical"
                        size="large"
                        locale={'暂无数据'}
                        pagination={{
                            onChange: page => {
                                this.fetchData(page)
                            },
                            pageSize: pageSize
                        }}
                        dataSource={this.getDataSource()}
                        // footer={
                        //     <div>
                        //         <b>ant design</b> footer part
                        //     </div>
                        // }
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
                                    title={<Link to={`${item.href}/${item.id}`}>{item.title}</Link>}
                                    description={item.description}
                                />
                                {item.content}
                            </List.Item>
                        )}
                    />
                </Spin>
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
