import React, { Component } from 'react'
import { Avatar, Divider, Button, Comment, message } from 'antd'
import { connect } from 'react-redux'
import { setUserInfo } from '../../redux/actions/discuss'
import Editor from '../common/Editor/index'
import ajax from '../../config/ajax'
import parseData from '../../utils/parseData'
import './index.less'



const ExampleComment = ({ children }) => (
    <Comment
      actions={[<span>回复</span>]}
      author={<a>Han Solo</a>}
      avatar={(
        <Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
      )}
      content={<p>你好</p>}
    >
      {children}
    </Comment>
);


class FlagDetail extends Component {
    state = {
        text:''
    }
    componentDidMount() {
        this.getDailyPunchById()
    }
    async getDailyPunchById() {
        const id = this.props.match.params.id
        const res = await ajax('/getDetailById',{ id })
        const { handleSetUserInfo } = this.props
        const { code, msg, data } = parseData(res)
        if (code === 0) {
            handleSetUserInfo(data)
        }
    }
    getText = (text) => {
        this.setState({ text })
    }

    handleClickComment = async e => {
        if (!this.props.token) {
            message.warn('请登录后评论')
            return
        }
        if (this.state.text.replace(/\s*/g, '') === '<p></p>') {
            message.warn('请填写评论')
            return
        }


    }
    render() {
        const { avatar, content, date, title, userName } = this.props.userInfo
        return(
            <div className='detail'>
                <div className='detail-info'>
                    <Avatar size={50} icon="user" src={avatar}/>
                    <div className='detail-info-name'>
                        <h3>{userName}</h3>
                        <p>{date}  发布</p>
                    </div>
                </div>
                <div className='detail-title'>
                    <h1>{title}</h1>
                </div>
                <div className='detail-content'>
                    <p>
                        {content}
                    </p>
                </div> 

                <Editor getText={this.getText} />
                <Button type="primary" style={{marginTop: '20px'}} onClick={this.handleClickComment}>发表评论</Button>
                <Divider orientation="left">评论</Divider>
                <div className='detail-comment'>
                    <ExampleComment>
                        <ExampleComment>
                        <ExampleComment />
                        <ExampleComment />
                        </ExampleComment>
                    </ExampleComment>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    token: state.global.userInfo.token,
    userInfo: state.discuss.userInfo
})

const mapDispatchToProps = dispatch => ({
    handleSetUserInfo(data) {
        dispatch(setUserInfo(data))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(FlagDetail)