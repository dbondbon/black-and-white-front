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
}