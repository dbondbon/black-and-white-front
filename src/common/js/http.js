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
        'Content-type': 'application/json',
    }
})

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
