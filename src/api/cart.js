import axios from '../common/js/http'

export default {
    Add(params) {
        let url = '/cart/add'
        return axios({
            method: 'post',
            url: url,
            data: params,
        })
    },
    Update(params) {
        let url = '/cart/update'
        return axios({
            method: 'post',
            url: url,
            data: params,
        })
    },
    Delete(params) {
        let url = '/cart/delete'
        return axios({
            method: 'post',
            url: url,
            data: params,
        })
    },
}