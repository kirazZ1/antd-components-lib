//表单校验规则
export const rules = {
    user: [
        {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
        },
    ],
    password: [
        {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
        },
    ],
    mobile: [
        { required: true, message: "手机号不能为空", trigger: "blur" },
        {
            pattern: /^[1]([3-9])[0-9]{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
        },
    ],
    verificationCode: [
        {
            required: true,
            message: "验证码不能为空",
            trigger: "blur"
        },
    ],
}

//登录页面Logo路径
export const logoImg = "/src/assets/logo.png"
