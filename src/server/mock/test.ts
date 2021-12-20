// test.js 仅做示例: 通过GET请求返回一个名字数组


export default [
    {
        url: "/api/login",
        method: "post",
        rawResponse: async (req: any, res: any) => {
            let reqbody = ''
            let response = null
            await new Promise((resolve) => {
                req.on('data', (chunk: any) => {
                    reqbody += chunk
                })
                req.on('end', () => resolve(undefined))
            })
            res.setHeader('Content-Type', 'text/plain')
            res.statusCode = 200
            let { user = '', password = '', mobile = '', verificationCode = '', loginType } = JSON.parse(reqbody)
            if (loginType === '1') {
                if (user !== 'admin' || password !== 'admin') {
                    response = {
                        code: 401,
                        message: '账号或密码错误！',
                    };
                } else {
                    response = {
                        code: 200,
                        message: '登录成功',
                    };
                }
            } else {
                if (mobile !== '13555545678') {
                    response = {
                        code: 401,
                        message: '该手机未注册！',
                    }
                } else if (verificationCode !== "1234") {
                    response = {
                        code: 401,
                        message: '验证码错误！',
                    };
                } else {
                    response = {
                        code: 200,
                        message: '登录成功',
                    };
                }
            }



            res.end(`${JSON.stringify(response)}`)
        }
    }
];