import React, { Component } from 'react'
import E from 'wangeditor'


class Editor extends Component {


    componentDidMount() {
        this.initEditor()
    }

    initEditor () {
        const elem = this.refs.editorElem
        const editor = new E(elem)
        this.editor = editor
        editor.customConfig.zIndex = 100
        editor.customConfig.uploadImgServer = ''
        // 限制一次最多上传 1 张图片
        editor.customConfig.uploadImgMaxLength = 1
        editor.customConfig.customUploadImg = function (files, insert) {

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
        // 'emoticon', // 表情
        'image', // 插入图片
        // 'table', // 表格
        // 'video', // 插入视频
        // 'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
        ]
        editor.customConfig.lang = {
        '设置标题': 'Title',
        '字号': 'Size',
        '文字颜色': 'Color',
        '设置列表': 'List',
        '有序列表': '',
        '无序列表': '',
        '对齐方式': 'Align',
        '靠左': '',
        '居中': '',
        '靠右': '',
        '正文': 'p',
        '链接文字': 'link text',
        '链接': 'link',
        '上传图片': 'Upload',
        '网络图片': 'Web',
        '图片link': 'image url',
        '插入视频': 'Video',
        '格式如': 'format',
        '上传': 'Upload',
        '创建': 'init'
        }
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