import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import store from "./redux/store"
import * as serviceWorker from "./serviceWorker"
import fastclick from "fastclick"
import AppRouter from "./router"
import './assets/style/global.less'
const rootElement = document.getElementById("root")
fastclick.attach(document.body)
ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>,
    rootElement
)
if (module.hot) {
    module.hot.accept("./router", () => {
        const AppRouter = require("./router").default
        ReactDOM.render(
            <Provider store={store}>
                <AppRouter />
            </Provider>,
            rootElement
        )
    })
}
serviceWorker.unregister()
