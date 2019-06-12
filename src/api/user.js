import axios from '../common/js/http'

export default {
    Login(params) {
        console.log("发送请求")
        let url = '/user/login'
        return axios({
            method: 'post',
            url: url,
            data: params,
        })
    }
}