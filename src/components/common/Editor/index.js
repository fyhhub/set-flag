import React, { Component } from 'react'
import BraftEditor from 'braft-editor'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { message } from 'antd'
import 'braft-editor/dist/index.css'
import './index.less'
class Editor extends Component {
    state = {
        editorState: BraftEditor.createEditorState(null)
    }
    handleEditorChange = (editorState) => {
        this.setState({ editorState })
        this.props.getText(editorState.toHTML())
    }
    myUploadFn = (param) => {
        const serverURL = '/setFlag/uploadImg'
        const xhr = new XMLHttpRequest()
        const fd = new FormData()
      
        const successFn = (response) => {
            if(xhr.readyState === 4) {
                const res = JSON.parse(xhr.responseText)
                const { code, msg, data } = res
                if (code === 0) {
                    param.success({
                        url: data.image,
                        meta: {
                          
                        }
                    })
                    message.success(msg)
                } else {
                    message.error(msg)
                }

            }
        }
        param.progress(100)
        const errorFn = (response) => {
            param.error({
                msg: 'unable to upload.'
            })
        }
        xhr.addEventListener("readystatechange", successFn, false)
        xhr.addEventListener("error", errorFn, false)
        xhr.addEventListener("abort", errorFn, false)
        fd.append('file', param.file)
        xhr.open('POST', serverURL, true)
        param.progress(0)
        xhr.send(fd)
    }
    render() {
        const { editorState } = this.state
        const { token } = this.props
        return (
            <div className='Editor'>
                {
                    token ? null : (<div className='readOnly' >
                        <Link to='/login' style={{zIndex: 100}}>登录</Link>
                    </div>)
                }
                <BraftEditor
                    media={{uploadFn: this.myUploadFn}}
                    readOnly={token ? false:true}
                    value={editorState}
                    onChange={this.handleEditorChange}
                    onSave={this.submitContent}
                    contentStyle={{height: 200, boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)'}}
                />
            </div>
        )
    }
}
const mapStateToProps = state => ({
    token: state.global.userInfo.token
})
export default connect(mapStateToProps, null)(Editor)