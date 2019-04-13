import React from 'react'
import store from '../redux/store'
import { Redirect } from 'react-router-dom'
export default class Auth extends React.Component {
    constructor(props) {
        super(props)
        store.subscribe(() => {
            if (store.getState().route.isTo) {
                props.history.push(store.getState().route.path)
            }
        })
    }
    render() {
        const protects = []
        if (protects.includes(this.props.location.pathname)) {
            if (!window.localStorage.getItem('token')) {
                return <Redirect to='/login'/>
            }
        } else {
            return <div>{ this.props.children }</div>
        }
    }
}