import React, { Component } from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
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
        return (
            <div >
                <BraftEditor
                    value={editorState}
                    onChange={this.handleEditorChange}
                    onSave={this.submitContent}
                />
            </div>
        )
    }
}

export default Editor