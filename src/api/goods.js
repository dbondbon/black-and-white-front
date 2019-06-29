import axios from '../common/js/http'

export default {
    Published(params) {
        let url = '/goods'
        return axios({
            method: 'post',
            url: url,
            data: params,
        })
    },
    FindGoods(params) {
        let url = '/goods?userId='.concat(params.userId,"&name=",params.name)
        return axios({
            method: 'get',
            url: url,
        })
    },
    OnSaleList(params) {
        let url = '/goods/'.concat(params)
        return axios({
            method: 'get',
            url: url,
        })
    },
    DeleteGoods(params) {
        let url = '/goods/'.concat(params)
        return axios({
            method: 'delete',
            url: url,
        })
    },
}