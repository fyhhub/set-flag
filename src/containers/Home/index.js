import React, { useEffect, useState } from 'react'
import { Skeleton } from 'antd'
import { connect } from 'react-redux'
import Card from '../../components/Card/index'
import BookMark from '../../components/common/BookMark/index'
import './index.less'


function Home(props) {
    let [loading, setLoading] = useState(true)
    let [cover, setCover] = useState('')
    let img = new Image()
    img.src = 'https://images.unsplash.com/photo-1496979551903-46e46589a88b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cda12b505afa1beb06e49d89014cbd65&auto=format&fit=crop&w=634&q=80'
    img.onload = img.onreadystatechange = function(){
        if(!this.readyState||this.readyState=='loaded'||this.readyState=='complete'){
            setCover(img.src)
            setLoading(false)
        } else {
            setLoading(true)
        }
    };
    useEffect(() => {
        console.log(loading);
        return () => {
            console.log('unmount');
        }
    }, [loading])
    return (
        <div className='home'>
            <section className='setflag' >
                <BookMark content='添加今日Flag' width='140px' />
                <div className='setflag-flag' >
                    <Skeleton loading={loading} active >
                        <Card 
                            title='英语四级'
                            content='每天背40个单词每天背40个单词每天背40个单词'
                            cover={cover}
                        />
                        <Card 
                            title='英语四级'
                            content='每天背40个单词每天背40个单词每天背40个单词'
                            cover={cover}
                        />
                        <Card 
                            title='英语四级'
                            content='每天背40个单词每天背40个单词每天背40个单词'
                            cover={cover}
                        />
                        <Card 
                            title='英语四级'
                            content='每天背40个单词每天背40个单词每天背40个单词'
                            cover={cover}
                        />
                        <Card 
                            title='英语四级'
                            content='每天背40个单词每天背40个单词每天背40个单词'
                            cover={cover}
                        />
                    </Skeleton>
                </div>
            </section>
        </div> 
    )
}
const mapStateToProps = state => ({
    app: state
})
const mapDispatchToProps = dispatch => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(Home)