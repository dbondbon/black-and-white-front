import axios from '../common/js/http'

export default {
    UploadImg(params) {
        let url = '/img'
        return axios({
            method: 'post',
            url: url,
            data: params,
            headers: { 'content-type': 'multipart/form-data' }
        })
    },
    GetImg(params) {
        let url = '/img/'.concat(params)
        return axios({
            method: 'get',
            url: url,
        })
    }
}