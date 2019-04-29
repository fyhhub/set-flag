import React, { Component } from 'react'
import { Calendar, Badge } from 'antd'
import { connect } from 'react-redux'
import { getTasks } from '../../redux/actions/flagSetting'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import './index.less'
moment.locale('zh-cn')


class FlagRecord extends Component {
    state = {
        value: moment()
    }
    getListData = value => {
        let year = value.year()
        let month = value.month() + 1
        let day = value.date()
        let { tasks } = this.props
        let list = tasks.filter(e => {
            let date = e.date.split('-')
            let y = +date[0]
            let m = +date[1]
            let d = +date[2]
            return year === y &&  month === m && day === d
        })
        list = list.map(item => {
            return {
                type: item.is_true ? 'success' : 'error',
                content: item.punch_title,
                punch_id: item.punch_id
            }
        })
        return list || []
    }

    dateCellRender = value => {
        const listData = this.getListData(value);
        return (
          <ul className="events">
            {
              listData.map(item => (
                <li key={item.punch_id}>
                  <Badge status={item.type} text={item.content} />
                </li>
              ))
            }
          </ul>
        );
    }

    getIsTrue = value => {
        let month = value.month()
        let { tasks } = this.props
        let list = tasks.filter(e => {
            let date = e.date.split('-')
            let m = +date[1]
            return m === month && e.is_true
        })
        return {
            success: list.length,
            error: tasks.length - list.length
        }
    }

    monthCellRender = value => {
        const num = this.getIsTrue(value)
        let { tasks } = this.props
        return num.error !== tasks.length ? (
          <div className="notes-month">
            <section>
                <p>完成{num.success}个Flag</p>
                <p>未完成{num.error}个Flag</p>
            </section>
          </div>
        ) : null;
    }

    handlePanelChange = (date, mode) => {
        let year = date.year()
        let month = date.month()
        let day = date.date()
        this.setState({
            value: moment(`${year}-${month + 1}-${day}`)
        })
    }
    componentDidMount() {
        this.props.handleGetTasks()
    }

    handleSelect = date => {
        let year = date.year()
        let month = date.month()
        let day = date.date()
        this.setState({
            value: moment(`${year}-${month + 1}-${day}`)
        })
    }
    render() {
        const { userInfo } = this.props
        if (!userInfo.token && !window.localStorage.getItem('token')) {
            return <Redirect to='/login'/>
        }
        return (
            <div className='record'>
                <Calendar 
                    value={this.state.value} 
                    dateCellRender={this.dateCellRender} 
                    monthCellRender={this.monthCellRender} 
                    onPanelChange={this.handlePanelChange}
                    onSelect={this.handleSelect}
                />,
            </div>
        )
    }
}


const mapStateToProps = state => ({
    tasks: state.flagSetting.tasks,
    userInfo: state.global.userInfo
})

const mapDispatchToProps = dispatch => ({
    handleGetTasks() {
        dispatch(getTasks())
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(FlagRecord)