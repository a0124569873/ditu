import request from '../utils/request'

class xunjianService {

    testdata () {
        return request({
            url: '',
            method: 'get'
        })
    }


    /**
     * 
     * @param {*} params 
     * params.current   1
     * params.size  5
     */
    getDeal (params) {
        return request({
            url: 'alarm/equipmentFaultSoluted/faultSolutedPage',
            method: 'post',
            params:params
        })
    }

    /**
     * 
     * @param {*} params 
     */
    getUnDeal(params){
        return request({
            url: 'alarm/equipmentFault/allFaultInfo',
            method: 'get',
            params:params
        })
    }

}


export default new xunjianService()