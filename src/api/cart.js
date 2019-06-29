import axios from '../common/js/http'

export default {
    Add(params) {
        let url = '/cart'
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
    DeleteOne(params) {
        let url = '/cart?'.concat("userId=",params.userId,"&goodsId=",params.goodsId);
        return axios({
            method: 'delete',
            url: url,
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