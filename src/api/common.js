import axios from '../common/js/http'

export default {
    UploadImg(params) {
        let url = '/img/add'
        return axios({
            method: 'post',
            url: url,
            data: params,
            headers: { 'content-type': 'multipart/form-data' }
        })
    },
    GetImg(params) {
        let url = '/img/get'
        return axios({
            method: 'post',
            url: url,
            data: params,
        })
    }
}