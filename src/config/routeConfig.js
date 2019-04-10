import asyncComponent from '../utils/asyncComponent'
const App = asyncComponent(() => import('../containers/App/index.js'))
const Home = asyncComponent(() => import('../containers/Home/index.js'))
const Login = asyncComponent(() => import('../containers/Login/index.js'))
export default [
    {
        path: '/',
        exact: true,
        component: App,
        children: []
    },
    {
        path: '/home',
        exact: true,
        component: Home
    },
    {
        path: '/login',
        exact: true,
        component: Login
    }
];
