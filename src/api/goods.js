import axios from '../common/js/http'

export default {
    Published(goods) {
        let url = '/goods'
        return axios({
            method: 'post',
            url: url,
            data: goods,
        })
    },
    FindGoods(goods) {
        let url = '/goods?userId='.concat(goods.userId,"&name=",goods.name)
        return axios({
            method: 'get',
            url: url,
        })
    },
    OnSaleList(userId) {
        let url = '/goods/'.concat(userId)
        return axios({
            method: 'get',
            url: url,
        })
    },
    DeleteGoods(goodsId) {
        let url = '/goods/'.concat(goodsId)
        return axios({
            method: 'delete',
            url: url,
        })
    },
}