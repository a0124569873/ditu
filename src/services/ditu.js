import request from '../utils/request'

class dituService {

    testdata () {
        return request({
            url: '',
            method: 'get'
        })
    }

    /**
     * 获取隧道下的巡检记录
     * @param {*} params 传入隧道code
     * params.pageNo
     * params.pageSize
     * params.sectionCode
     * params.startTime 2017-01-31
     * params.endTime new Date().setTime()
     */
    login(params){
        return request({
            url: '/login',
            method: 'post',
            params: params
        })
    }

    location(params){
        return request({
            url: '/location',
            method: 'post',
            params: params
        })
    }

    search(params){
        return request({
            url: '/search',
            method: 'post',
            params: params
        })
    }


}


export default new dituService()