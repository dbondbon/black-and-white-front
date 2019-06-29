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
    List(params) {
        let url = '/cart/'.concat(params)
        return axios({
            method: 'get',
            url: url
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
    Price(params) {
        let url = '/cart/price'
        return axios({
            method: 'post',
            url: url,
            data: params,
        })
    },
}