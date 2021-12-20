import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { message } from 'ant-design-vue'

/**设置请求地址 */
axios.defaults.baseURL = "";

/**设置请求超时时间 */
axios.defaults.timeout = 3000;

/**设置POST请求头 */
axios.defaults.headers.post['Content-Type'] = 'application/json';

/**请求拦截器 */
axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        return config;
    },
    
    (error: any) => {
        return Promise.reject(error);
    }
)

/**响应拦截器 */
axios.interceptors.response.use(
    (response: AxiosResponse) => {  //正常返回请求处理
        return response;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

function errorCodeSolver(data:any){
    let { code } = data
    if(code !== 200) {
        message.error(data.message)
        return true
    }
    return false
}


/**Get请求封装 */
export const get = (url: string, params?: any) => {
    return new Promise((resolve: any, reject: any) => {
        axios.get(url, {
            params: params
        }).then((res: any) => {
            resolve(res?.data);
        }).catch((error: any) => {
            reject(error);
        })
    })
}
/**Post请求封装 */
export const post = (url: string, params?: any) => {
    return new Promise((resolve: any, reject: any) => {       
        axios.post(url, params)
            .then((res: any) => {          
                let { data } = res
                if(errorCodeSolver(data)) reject(res)
                resolve(data);
            }).catch((error: any) => {
                message.error(error.message)
                reject(error);
            })
    })
}








