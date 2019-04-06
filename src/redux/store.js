import {
    createStore,
    applyMiddleware,
    compose
} from 'redux'
import reducers from "./actions/index";
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
    applyMiddleware(thunk),
);
const store = createStore(reducers, enhancer)
export default store