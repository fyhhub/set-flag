import asyncComponent from '../utils/asyncComponent'
const App = asyncComponent(() => import('../containers/App/index.js'))
const SetFlag = asyncComponent(() => import('../containers/SetFlag/index.js'))
const Login = asyncComponent(() => import('../containers/Login/index.js'))
const Register = asyncComponent(() => import('../containers/Register/index.js'))
const Home = asyncComponent(() => import('../containers/Home/index.js'))
const Profile = asyncComponent(() => import('../containers/Profile/index.js'))
const FlagDetail = asyncComponent(() => import('../components/FlagDetail/index'))
const FlagRecord = asyncComponent(() => import('../components/FlagRecord/index'))
const FlagReCommend = asyncComponent(() => import('../components/FlagReCommend/index'))
const FlagRank = asyncComponent(() => import('../components/FlagRank/index'))
export default [
    {
        path: '/',
        component: SetFlag,
        exact: true,
    },
    {
        path: '/',
        component: App,
        children: [
            {
                path: '/home',
                exact: true,
                component: Home
            },
            {
                path: '/login',
                exact: true,
                component: Login
            },
            {
                path: '/register',
                exact: true,
                component: Register
            },
            {
                path: '/profile',
                exact: true,
                component: Profile
            },
            {
                path: '/detail/:id',
                exact: true,
                component: FlagDetail
            },
            {
                path: '/record',
                exact: true,
                component: FlagRecord
            },
            {
                path: '/recommend',
                exact: true,
                component: FlagReCommend
            },
            {
                path: '/rank',
                exact: true,
                component: FlagRank
            }
        ]
    },

]

