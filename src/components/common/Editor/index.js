import React, { Component } from 'react'
import BraftEditor from 'braft-editor'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
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