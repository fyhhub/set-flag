import React from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import routeConfig from "./config/routeConfig"
import { connect } from 'react-redux'
let isLogin
const createRoutes = function(routes) {
    let children = []
    const renderRoute = function(route) {
        if (route.protected && !isLogin) {
            route = {
                ...route,
                component: () => <Redirect to='/login' />,
                children: []
            }
        }
        if (route.component && route.children) {
            let childrenRoutes = createRoutes(route.children)
            children.push(
                <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact ? route.exact : false}
                    render={props => {
                        return (
                            <route.component {...props}>
                                {childrenRoutes}
                            </route.component>
                        )
                    }}
                />
            )
        } else {
            children.push(
                <Route
                    key={route.path}
                    path={route.path}
                    component={route.component}
                    exact={route.exact ? route.exact : false}
                />
            )
        }
    }
        
    routes.forEach(item => renderRoute(item))
    return <Switch>{children}</Switch>
}
class AppRouter extends React.Component {
    render() {
        isLogin = this.props.app.isLogin
        let routes = createRoutes(routeConfig)
        return <Router>{routes}</Router>
    }
}
const mapStateToProps = (state) => ({
    ...state
})
export default connect(mapStateToProps, null)(AppRouter)