import axios from '../common/js/http'

export default {
    Add(params) {
        let url = '/order'
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
        let url = '/order/0/'.concat(params);
        return axios({
            method: 'get',
            url: url,
        })
    },
    SellList(params) {
        let url = '/order/1/'.concat(params);
        return axios({
            method: 'get',
            url: url,
        })
    }
}