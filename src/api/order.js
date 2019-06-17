import axios from '../common/js/http'

export default {
    Add(params) {
        let url = '/order/add'
        return axios({
            method: 'post',
            url: url,
            data: params,
        })
    },
    AddList(params) {
        let url = '/order/addList'
        return axios({
            method: 'post',
            url: url,
            data: params,
        })
    },
    BuyList(params) {
        let url = '/order/buyList'
        return axios({
            method: 'post',
            url: url,
            data: params,
        })
    },
    SellList(params) {
        let url = '/order/sellList'
        return axios({
            method: 'post',
            url: url,
            data: params,
        })
    }
}