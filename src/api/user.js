import axios from '../common/js/http'

export default {
    Login(params) {
        let url = '/loginVerify'
        return axios({
            method: 'post',
            url: url,
            data: params,
        })
    }
}