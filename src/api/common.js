import axios from '../common/js/http'

export default {
    UploadImg(params) {
        let url = '/img/bookImg'
        return axios({
            method: 'post',
            url: url,
            data: params,
            headers: { 'content-type': 'multipart/form-data' }
        })
    }
}