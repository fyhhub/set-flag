import Mock from 'mockjs'
let Random = Mock.Random
Mock.setup({
    timeout: 500
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
// let checkNameS = {
//     code: 0,
//     msg: '',
//     data: {
//         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
//     }
// }

Mock.mock('/setFlag/login/getAvator', 'post', options => {
    return checkToken
})
Mock.mock('/setFlag/login', 'post', options => {
    return login   
})

Mock.mock('/setFlag/check_token', 'post', options => {
    return checkToken   
})
     

Mock.mock('/setFlag/profile/checkPrepass', 'post', options => {
    return {
        code: 0,
        msg: '密码不正确',
        data: {}
    }
})

Mock.mock('/setFlag/profile/modifyNickname', 'post', options => {
    return {
        code: 0,
        msg: '修改成功',
        data: {}
    }
})
Mock.mock('/setFlag/profile/modifyPassword', 'post', options => {
    return {
        code: 0,
        msg: '修改成功',
        data: {}
    }
})


Mock.mock('/setFlag/addFlag', 'post', options => {
    console.log(options);
    if (~options.body.indexOf('id')) {
        return {
            code: 0,
            msg: '添加成功',
            data: {
                punch_id: Random.string(32, 150),
                punch_title: '英语四级',
                punch_content: '每天背50个单词每天背50个单词每天背50个单词',
                is_true: false
            }
        }
    } else {
        return {
            code: 0,
            msg: '添加成功',
            data: [
                {
                    punch_id: Random.string(32, 150),
                    punch_title: '英语四级',
                    punch_content: '每天背50个单词每天背50个单词每天背50个单词',
                }
            ]
        }
    }
})


Mock.mock('/setFlag/punchFlag', 'post', options => {
    return {
        code: 0,
        msg: '',
        data: {}
    }
})


Mock.mock('/setFlag/addCustomFlag', 'post', options => {
    return {
        code: 0,
        msg: '添加成功',
        data: {
            punch_id: Random.string(32, 150),
            punch_title: '英语四级',
            punch_content: '每天背50个单词每天背50个单词每天背50个单词',
        }
    }
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


     

Mock.mock(/\/getFlags/, 'get', options => {
    return {
        code: 0,
        msg: '',
        data: [
            {
                flag_id: Random.string(32, 150),
                flag_title: '英语四级',
                flag_content: '每天背50个单词每天背50个单词每天背50个单词',
                flag_image: 'https://images.unsplash.com/photo-1496979551903-46e46589a88b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cda12b505afa1beb06e49d89014cbd65&auto=format&fit=crop&w=634&q=80',
            },
            {
                flag_id: Random.string(32, 150),
                flag_title: '英语四级',
                flag_content: '每天背50个单词每天背50个单词每天背50个单词',
                flag_image: 'https://images.unsplash.com/photo-1496979551903-46e46589a88b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cda12b505afa1beb06e49d89014cbd65&auto=format&fit=crop&w=634&q=80',
            },
            {
                flag_id: Random.string(32, 150),
                flag_title: '英语四级',
                flag_content: '每天背50个单词每天背50个单词每天背50个单词',
                flag_image: 'https://images.unsplash.com/photo-1496979551903-46e46589a88b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cda12b505afa1beb06e49d89014cbd65&auto=format&fit=crop&w=634&q=80',
            },
            {
                flag_id: Random.string(32, 150),
                flag_title: '英语四级',
                flag_content: '每天背50个单词每天背50个单词每天背50个单词',
                flag_image: 'https://images.unsplash.com/photo-1496979551903-46e46589a88b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cda12b505afa1beb06e49d89014cbd65&auto=format&fit=crop&w=634&q=80',
            },
            {
                flag_id: Random.string(32, 150),
                flag_title: '英语四级',
                flag_content: '每天背50个单词每天背50个单词每天背50个单词',
                flag_image: 'https://images.unsplash.com/photo-1496979551903-46e46589a88b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cda12b505afa1beb06e49d89014cbd65&auto=format&fit=crop&w=634&q=80',
            },
            {
                flag_id: Random.string(32, 150),
                flag_title: '英语四级',
                flag_content: '每天背50个单词每天背50个单词每天背50个单词',
                flag_image: 'https://images.unsplash.com/photo-1496979551903-46e46589a88b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cda12b505afa1beb06e49d89014cbd65&auto=format&fit=crop&w=634&q=80',
            }
        ]
    }
})


Mock.mock(/\/getTasks/, 'get', options => {
    return {
        code: 0,
        msg: '',
        data: [
            {
                punch_id: Random.string(32, 150),
                punch_title: '英语四级',
                punch_content: '每天背50个单词每天背50个单词每天背50个单词',
                is_true: Random.boolean()
            },
            {
                punch_id: Random.string(32, 150),
                punch_title: '英语四级',
                punch_content: '每天背50个单词每天背50个单词每天背50个单词',
                is_true: Random.boolean()
            },
            {
                punch_id: Random.string(32, 150),
                punch_title: '英语四级',
                punch_content: '每天背50个单词每天背50个单词每天背50个单词',
                is_true: false
            }
        ]
    }
})



Mock.mock('/setFlag/uploadImg', 'post', options => {
    console.log(options);
    return {
        code: 0,
        msg: '添加成功',
        data: {
            flag_image: 'https://images.unsplash.com/photo-1496979551903-46e46589a88b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cda12b505afa1beb06e49d89014cbd65&auto=format&fit=crop&w=634&q=80',
        }
    }
})
let i = 1
Mock.mock(/\/getDailyPunch/, 'get', options => {
    let arr = []
    for (let i = 0;i < 5;i++) {
        arr.push({
            id: Random.string('lower', 10),
            title: `ant design part ${i}`,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        })
    }
    return {
        code: 0,
        msg: '',
        data: {
            items: arr,
            total: 20
        }
    }
})



