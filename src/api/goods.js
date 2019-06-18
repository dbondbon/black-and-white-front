import axios from '../common/js/http'

export default {
    Published(params) {
        let url = '/goods/published'
        return axios({
            method: 'post',
            url: url,
            data: params,
        })
    },
    FindGoods(params) {
        let url = '/goods/findGoods'
        return axios({
            method: 'post',
            url: url,
            data: params,
        })
    },
    FindCartGoods(params) {
        let url = '/goods/findCartGoods'
        return axios({
            method: 'post',
            url: url,
            data: params,
        })
    },
    DeleteGoods(params) {
        let url = '/goods/deleteGoods'
        return axios({
            method: 'post',
            url: url,
            data: params,
        })
    },
}