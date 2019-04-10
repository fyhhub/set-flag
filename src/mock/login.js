import Mock from 'mockjs'
let Random = Mock.Random
Mock.setup({
    timeout: 1000
})
let login =  {
    code: 1,
    msg: '登录失败,用户名或密码错误',
    data: {
        token: Random.string(32, 150)
    }
}
let checkNameS = {
    code: 0,
    msg: '',
    data: {
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    }
}
Mock.mock(/\/login\/getAvatar/, 'get', options => {
    return checkNameS   
})

Mock.mock('/login', 'post', options => {
    return login   
})
