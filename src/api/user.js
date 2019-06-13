import axios from '../common/js/http'

export default {
    Login(params) {
        let url = '/user/login'
        return axios({
            method: 'post',
            url: url,
            data: params,
        })
    },
    Register(params) {
        let url = '/user/register'
        return axios({
            method: 'post',
            url: url,
            data: params,
        })
    },
    GetUsername() {
        let url = '/user/getUsername'
        return axios({
            method: 'post',
            url: url,
        })
    },
}