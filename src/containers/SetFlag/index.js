import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import './index.less'
class App extends React.Component {
    componentDidMount() {
        this.createBlocks()
    }
    createBlocks() {
        let app = this.refs.app
        setInterval(() => {
            let block  = document.createElement('div')
            let deg = 0
            block.style.width = '100px'
            block.style.height = '100px'
            block.style.backgroundColor = 'rgba(204,204,204,0.2)'
            block.style.borderRadius = '9px'
            block.style.position = 'absolute'
            block.style.top = window.innerHeight + 'px'
            block.style.left = '100px'
            block.style.left = Math.floor(Math.random()*(window.innerWidth - 200) + 200) + 'px'
            app.appendChild(block)
            const moveBlocks = () => {
                let top = parseInt(window.getComputedStyle(block)['top']) - 2
                deg += 1
                block.style.top = top + 'px'
                block.style.transform = 'rotateZ('+ deg + 'deg)'
                if (top > -100) {
                    requestAnimationFrame(moveBlocks)
                } else {
                    app.removeChild(block)
                }
            }
            moveBlocks()
        }, 3000)
    }
    render() {
        return (
            <div className='setFlag background' ref='app'>
                <div className='setFlag-content'>
                    <div className='setFlag-content-title hvr-wobble-horizontal'>立个 Flag</div>
                    <div className='setFlag-content-flag'>
                        <span>无志者常立志，有志者立常志</span>
                    </div>
                    <div className='setFlag-content-btn'>
                        <Button type='primary' size='large'><Link to='/home'>开始探索</Link></Button>  
                    </div>
                </div>
            </div>
        )
    }
}


export default App