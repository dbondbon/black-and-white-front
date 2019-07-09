import axios from 'axios'

/**
 * http配置
 */
const instance = axios.create({
    baseURL: '/api/', //开发环境地址
    // baseURL:'http://192.168.43.57:8080',  //生产环境地址
    timeout: 10000,
    withCredentials: true, // 是否允许带cookie这些
    headers: {
        'X-Requested-With': 'XMLHttpRequest',  //表明为Ajax异步请求
    }
})

/**
 * http request拦截器
 */
instance.interceptors.request.use(
    config => {
        if(localStorage.token) { //判断token是否存在
            config.headers.Authorization = localStorage.token; //将token设置成请求头
        }
        if(config.method=='post' || config.method=='put'){
            config.headers['Content-Type'] = 'application/json';
        }
        if(config.url.indexOf("/img")>=0){
            // 上传图片
            config.headers['Content-Type'] = 'multipart/form-data';
        }
        return config
    }
)

/**
 * http response 拦截器
 */
instance.interceptors.response.use(
    response => {
        // 返回响应中的数据
        return response.data;
    }
)

export default instance
