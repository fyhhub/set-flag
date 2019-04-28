import React, { Component } from 'react'
import { Avatar, Divider, Button, Comment } from 'antd'
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
    }
    componentDidMount() {
        this.getDailyPunchById()
    }

    async getDailyPunchById() {
        const id = this.props.match.params.id
        const res = await ajax('/getDailyPunchById',{ id })
        const { code, msg, data } = parseData(res)
        if (code === 0) {

        }
    }
    getText = (text) => {

    }
    render() {
        return(
            <div className='detail'>
                <div className='detail-info'>
                    <Avatar size={50} icon="user" />
                    <div className='detail-info-name'>
                        <h3>Fanyihui</h3>
                        <p>2019-4-27  发布</p>
                    </div>
                </div>
                <div className='detail-title'>
                    <h1>《阿里云前端技术周刊》第二期</h1>
                </div>
                <div className='detail-content'>
                    <p>
                    </p>
                </div> 

                <Editor getText={this.getText} />
                <Button type="primary" style={{marginTop: '20px'}}>发表评论</Button>
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
export default FlagDetail