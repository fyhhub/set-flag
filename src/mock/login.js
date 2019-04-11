import Mock from 'mockjs'
let Random = Mock.Random
Mock.setup({
    timeout: 1000
})
let login =  {
    code: 0,
    msg: '登录成功',
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
Mock.mock(/\/register\/validate_username/, 'get', options => {
    // return {
    //     code: 1,
    //     msg: '该用户名不存在',
    //     data: {}
    // }
    return {
        code: 0,
        msg: '',
        data: {}
    }
})
