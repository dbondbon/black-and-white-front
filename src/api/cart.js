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
        let url = '/cart/list'
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
    Price(params) {
        let url = '/cart/price'
        return axios({
            method: 'post',
            url: url,
            data: params,
        })
    },
}