export interface FormState {
    //登录表单信息interface
    user: string;
    password: string;
    mobile: string;
    verificationCode: string;
}


/**
 * 使用账号密码登录表单
 */
export interface AccountLoginFormState {
    //登录表单信息interface
    user: string;
    password: string;
}

/**
 * 使用手机验证码登录表单
 */
 export interface MobileLoginFormState {
    //登录表单信息interface
    mobile: string;
    verificationCode: string;
}