import React, { Component } from 'react'
import E from 'wangeditor'
import ajax from '../../../config/ajax'
import { message } from 'antd'


class Editor extends Component {
    componentDidMount() {
        this.initEditor()
    }

    initEditor () {
        const elem = this.refs.editorElem
        const editor = new E(elem)
        this.editor = editor
        editor.customConfig.zIndex = 100
        // 限制一次最多上传 1 张图片
        editor.customConfig.uploadImgMaxLength = 1
        
        editor.customConfig.customUploadImg = function (files, insert) {
            if (files[0]) {
                const formData = new FormData()
                formData.append('file', files[0])
                ajax('/uploadImg', { file: formData }, 'post')
                    .then(res => {
                        console.log(res);
                    })
                    .catch(e => {

                    })
            } else {
                message.info('请选择要上传的图片')
            }
        }
        editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        // 'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        // 'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        // 'table', // 表格
        // 'video', // 插入视频
        // 'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
        ]
        editor.customConfig.emotions = [
            {
                // tab 的标题
                title: 'emoji',
                // type -> 'emoji' / 'image'
                type: 'emoji',
                // content -> 数组
                content: ['😀', '😃', '😄', '😁', '😆', '🤣', '😉', '🙁', '😂', '😇', '😝', '🙄', '😰', '😤']
            }
        ]
        editor.create()
    }

    render() {
        return (
            <div ref='editorElem'>
            </div>
        )
    }
}

export default Editor