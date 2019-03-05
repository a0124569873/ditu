<template>
    <div>
        <van-nav-bar title="手动巡检记录" @click-left="onClickLeft" class="title-color">
            <van-icon name="arrow-left" slot="left" size="30px"/>
        </van-nav-bar>
        <van-collapse v-model="suidaoactive" v-if="isrepaint">
            <van-collapse-item v-for="suidaoitem,index in suidao" :title="suidaoitem.name + '-共' + suidao[index].page.total + '条记录'" :name="suidaoitem.code" v-if="isrepaint" :key="suidao[index].page.total">
                <van-list v-if="true" style="margin-top: 2px;">
                    <van-cell v-for="item in suidaoitem.recordlist.dataList" :key="item.timestamp" @click="$router.push(`shoudong_record_list_items_list?timestamp=${item.timestamp}`)">
                        <!-- {{item}} -->
                        <deviceitem :item.sync="item"/>
                    </van-cell>
                </van-list>
                <van-pagination 
                    v-model="suidao[suidao[index].code].page.pageNo"
                    :total-items="suidao[index].page.total"
                    :items-per-page="suidao[index].page.pageSize"
                    @change="curpagechange(suidao[index].code)"
                    />
            </van-collapse-item>
        </van-collapse>
        <bottom-bar></bottom-bar>
    </div>
</template>

<script>

import deviceitem from './shoudong_list_item'
import * as data from '../data'
import xunjianService from '../../services/xunjianService'
import Vue from 'vue'


export default {

    components: {
        deviceitem
    },

    data(){
        return {
            isrepaint: true,
            active: 0,
            suidao: {},
            suidaoactive: [],
            type: [],
            recordtive: [],
            shebei: [],
            shebeiactive: [],
            recordlist: {},
        }
    },

    computed: {
        shangbao(){
            let res = (this.$RN(0, 9) > 5) ? true : false
            return res
        }
    },

    mounted (){
        let _this = this
        xunjianService.getAllTunnel().then(res => {
            _this.suidao = {}
            res.map(item => {
                _this.isrepaint = false
                _this.suidao[item.code] = item
                let params = {
                    pageNo : 1,
                    pageSize: 5,
                    sectionCode: item.code,
                    startTime: '2017-1-31',
                    endTime: _this.getenddate() 
                }
                _this.suidao[item.code].recordlist = {dataList: []}
                _this.suidao[item.code].page = {}
                _this.suidao[item.code].page.pageNo = 1
                _this.suidao[item.code].page.pageSize = 5
                _this.suidao[item.code].page.total = 5
                xunjianService.getXunjianList(params).then(res => {
                    _this.suidao[item.code].page.total = res.total
                    _this.suidao[item.code].recordlist = res
                    _this.isrepaint = true
                })
            })

        })
        
        
    },

    watch: {
        active(newval, oldval){
            this.switchTab(newval)
        },
    },

    methods: {

        curpagechange(suidaocode){

            let _this = this
            let params = {
                pageNo : this.suidao[suidaocode].page.pageNo,
                pageSize: 5,
                sectionCode: suidaocode,
                startTime: '2017-1-31',
                endTime: this.getenddate() 
            }
            _this.isrepaint = false
            xunjianService.getXunjianList(params).then(res => {
                _this.suidao[suidaocode].page.total = res.total
                _this.suidao[suidaocode].recordlist = res
                _this.isrepaint = true
            })

        },

        getenddate(){
            let timestamp = new Date().getTime()
            let newDate = new Date()
            newDate.setTime(timestamp)
            let res =  newDate.toLocaleString()
            return res.replace("/",'-')
        },

        onClickLeft(){
            this.$router.push("xunjian")
        }
    }

}
</script>

<style scoped>
.testvant {
    margin: 10px;
}

</style>
