import axios from '../common/js/http'

export default {
    Add(params) {
        let url = '/msg/add'
        return axios({
            method: 'post',
            url: url,
            data: params,
        })
    },
    GetAll(params) {
        let url = '/msg/getAll'
        return axios({
            method: 'post',
            url: url,
            data: params,
        })
    },
    GetOne(params) {
        let url = '/msg/getOne'
        return axios({
            method: 'post',
            url: url,
            data: params,
        })
    }
}