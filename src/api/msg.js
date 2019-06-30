import axios from '../common/js/http'

export default {
    Add(params) {
        let url = '/msg'
        return axios({
            method: 'post',
            url: url,
            data: params,
        })
    },
    GetAll(params) {
        let url = '/msg/'.concat(params);
        return axios({
            method: 'get',
            url: url,
        })
    },
    GetOne(params) {
        let url = '/msg?'.concat("userId=",params.userId,"&otherId=",params.otherId);
        return axios({
            method: 'get',
            url: url,
        })
    }
}