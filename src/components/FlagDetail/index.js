import React, { Component } from 'react'
import { Avatar, Divider, Button, Comment, message, Icon, Form, Input } from 'antd'
import { connect } from 'react-redux'
import { setUserInfo, setComments } from '../../redux/actions/discuss'
import Editor from '../common/Editor/index'
import ajax from '../../config/ajax'
import parseData from '../../utils/parseData'
import './index.less'

const { TextArea } = Input
class FlagDetail extends Component {
    state = {
        value:'',
        action: {},
        submitting:false,
        replyId: '',
        punchAgree: false
    }
    componentDidMount() {
        this.getDailyPunchById()
        this.getComments()
        window.scrollTo(0,0)
    }
    async getDailyPunchById() {
        const id = this.props.match.params.id
        const res = await ajax('/getDetailById',{ id })
        const { handleSetUserInfo } = this.props
        const { code, data } = parseData(res)
        if (code === 0) {
            handleSetUserInfo(data)
        }
    }
    async getComments() {
        const id = this.props.match.params.id
        const res = await ajax('/getComments', { id })
        const { handleSetComments } = this.props
        const { code, data } = parseData(res)
        if (code === 0) {
            handleSetComments(data)
        }
    }
    handleChange = e => {
        this.setState({
            value: e.target.value
        })
    }
    handleSubmit = async e => {
        if (!this.props.token) {
            message.warn('请登录后评论')
            return
        }
        if (this.state.value.replace(/\s*/g, '') === '<p></p>') {
            message.warn('请填写评论')
            return
        }
        this.setState({
            submitting: true
        })
        const id = this.props.match.params.id
        const parent_id = this.state.replyId
        const res = await ajax('/comment', { comment_content: this.state.value, id, parent_id }, 'post')
        const { code, data, msg } = parseData(res)
        if (code === 0) {
            this.setState({
                submitting: false,
                value: '',
                replyId: ''
            })
            message.success(msg)
            this.props.handleSetComments([data, ...this.props.comments])
        }
    }


    handlePunchAgree = async e => {
        if (this.state.punchAgree) {
            return
        }
        const id = this.props.match.params.id
        const res = await ajax('/dailyPunchAgree', { id }, 'post')
        const { code } = parseData(res)
        if (code === 0) {
            this.props.handleSetUserInfo({
                ...this.props.userInfo,
                agree: this.props.userInfo.agree + 1
            })
            this.setState({
                punchAgree: true
            })
        }
    }
    render() {
        const that = this
        const ExampleComment = ({ comment_id,children, comment_content, avatar, nickname,comment_create_time,comment_agree, shouldReply}) => {
            const like = async comment_id => {
                if (this.state.action[comment_id]) {
                    return
                }
                let newAction = JSON.parse(JSON.stringify(this.state.action))
                newAction[comment_id] = !newAction[comment_id]
                const res = await ajax('/commentAgree', { comment_id }, 'post')
                const { code } = parseData(res)
                if (code === 0) {
                    that.setState({action: newAction})
                    let comments = JSON.parse(JSON.stringify(that.props.comments))
                    let index = comments.findIndex(e => e.comment_id === comment_id)
                    comments[index].comment_agree++
                    that.props.handleSetComments(comments)
                }
            }
            const reply = (comment_id, nickname, shouldReply) => {
                if (shouldReply === false) return
                document.querySelector('.ant-back-top') && document.querySelector('.ant-back-top').click()
                this.setState({ value: `@${nickname} `, replyId: comment_id})
            }
            return (
                <Comment
                    actions={[
                        <span>
                            <Icon
                                type="like"
                                theme={this.state.action[comment_id] ? 'filled' : 'outlined'}
                                onClick={like.bind(this, comment_id)}
                            />
                            <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                                {comment_agree}
                            </span>
                        </span>,
                        <span onClick={reply.bind(this, comment_id, nickname, shouldReply)}>
                            {
                                shouldReply === false ? null : '回复'
                            }
                        </span>
                    ]}
                    author={<a>{nickname}</a>}
                    avatar={(
                        <Avatar
                            icon="user"
                            src={avatar}
                            alt={nickname}
                        />
                    )}
                    content={<p dangerouslySetInnerHTML={{__html: comment_content.replace(/^@.+\s/, (a, b) => {return `<b style="color: #1890ff;font-weight: bold">${a}</b>`})  }} />}
                    datetime={comment_create_time}
                >
                  {children}
                </Comment>
            );
        }
        const { avatar, content, date, title, nickname, agree } = this.props.userInfo
        const comments = this.props.comments.filter(e => !e.parent_id)
        const comments1 = this.props.comments.filter(e => e.parent_id)
        return(
            <div className='detail'>
                <div className='detail-info'>
                    <Avatar size={50} icon="user" src={avatar}/>
                    <div className='detail-info-name'>
                        <h3>{nickname}</h3>
                        <p>{date}  发布</p>
                    </div>
                </div>
                <div className='detail-title'>
                    <h1>{title}</h1>
                </div>
                <div className='detail-content'>
                <div dangerouslySetInnerHTML={{__html: content }}></div>
                <div style={{marginTop: '30px', cursor: 'pointer', fontSize: '18px'}} onClick={this.handlePunchAgree}>
                    <Icon type="like" theme={this.state.punchAgree ? 'filled':'outlined'} />&nbsp;<span>{agree}</span>
                </div>    
            </div> 
                <Comment
                    avatar={(
                        <Avatar
                        src={this.props.user.avatar}
                        />
                    )}
                    content={(
                        <div>
                            <Form.Item>
                                <TextArea rows={4} onChange={this.handleChange} value={this.state.value} className='comment-textarea'/>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    htmlType="submit"
                                    loading={this.state.submitting}
                                    onClick={this.handleSubmit}
                                    type="primary"
                                >
                                    发表评论
                                </Button>
                            </Form.Item>
                        </div>
                    )}
                />
                <Divider orientation="left">评论</Divider>
                <div className='detail-comment'>
                    {
                        comments.map(item => {
                            return (
                                <ExampleComment {...item}  key={item.comment_id}>
                                    {
                                        comments1.map(e => {
                                            if (e.parent_id === item.comment_id) {
                                                return (
                                                    <ExampleComment {...e}  key={e.comment_id}>
                                                        {
                                                            this.props.comments.map(i => {
                                                                if (i.parent_id === e.comment_id) {
                                                                    return (
                                                                        <ExampleComment  {...i} key={i.comment_id} shouldReply={false}/>
                                                                    )
                                                                } else {
                                                                    return null
                                                                }
                                                            })
                                                        }
                                                    </ExampleComment>
                                                )
                                            } else {
                                                return null
                                            }
                                        })
                                    }
                                </ExampleComment>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    token: state.global.userInfo.token,
    userInfo: state.discuss.userInfo,
    comments: state.discuss.comments,
    user: state.global.userInfo
})

const mapDispatchToProps = dispatch => ({
    handleSetUserInfo(data) {
        dispatch(setUserInfo(data))
    },
    handleSetComments(data) {
        dispatch(setComments(data))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(FlagDetail)