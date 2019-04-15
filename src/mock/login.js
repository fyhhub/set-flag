import Mock from 'mockjs'
let Random = Mock.Random
Mock.setup({
    timeout: 1000
})
let login =  {
    code: 0,
    msg: '登录成功',
    data: {
        token: Random.string(32, 150),
        userName: 'fanyihui',
        sex: '1',
        email: '1131231@qq.com',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        nickname: 'seven',
        score: 0
    }
}
let checkToken = {
    code: 0,
    msg: '',
    data: {
        token: Random.string(32, 150),
        userName: 'fanyihui',
        sex: '1',
        email: '1131231@qq.com',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        nickname: 'seven',
        score: 0
    }
}
let checkNameS = {
    code: 0,
    msg: '',
    data: {
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    }
}

Mock.mock('/setFlag/login/getAvator', 'post', options => {
    console.log(options);
    return checkToken
})
Mock.mock('/setFlag/login', 'post', options => {
    console.log(options);
    return checkNameS   
})

Mock.mock('/setFlag/check_token', 'post', options => {
    let { body } = options
    body = JSON.parse(body)
    console.log(body);
    
    return checkToken   
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
