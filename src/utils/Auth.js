import React from 'react'
import store from '../redux/store'
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
        return <div>{ this.props.children }</div>
    }
}