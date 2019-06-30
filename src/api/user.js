import axios from '../common/js/http'

export default {
    Login(params) {
        let url = '/user?'.concat("username=",params.username,"&password=",params.password);
        return axios({
            method: 'get',
            url: url,
        })
    },
    Register(params) {
        let url = '/user'
        return axios({
            method: 'post',
            url: url,
            data: params,
        })
    },
    GetUsername() {
        let url = '/user/1'
        return axios({
            method: 'get',
            url: url,
        })
    },
    GetNickname(params) {
        let url = '/user/getNickname'
        return axios({
            method: 'post',
            url: url,
            data: params,
        })
    },
}