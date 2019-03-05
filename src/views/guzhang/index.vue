<template>
    <div>
        <van-nav-bar title="故障列表" class="title-color">
        </van-nav-bar>

        <van-tabs v-model="active">
            <van-tab :title="'未处理故障[' + undealList.length + ']'">
                <van-list
                v-if="true" 
                style="margin-top: 2px;"
                v-model="undealloading"
                :finished="undealfinished"
                finished-text="没有更多了"
                @load="onLoad('undeal')"
                >
                    <van-cell v-for="item in undealList" :key="item.code" @click="clickdetail(item)">
                        <deviceitem :item="item" :type="'undeal'"/>
                    </van-cell>
                </van-list>
            </van-tab>
            <van-tab :title="'历史故障[' + dealcount + ']'">
                <van-list
                v-if="true"
                style="margin-top: 2px;"
                v-model="dealloading"
                :finished="dealfinished"
                finished-text="没有更多了"
                @load="onLoad('deal')"
                >
                    <van-cell v-for="item in dealList" :key="item.code">
                        <deviceitem :item="item" :type="'deal'"/>
                    </van-cell>
                </van-list>
            </van-tab>
        </van-tabs>

        <!-- <van-nav-bar @click-right="switchpop" class="pagesize">
            <div slot="right">
                <van-icon name="edit"></van-icon>
            </div>
            <div slot="title" >
                总条数[{{total}}]每页条数&nbsp;&nbsp;&nbsp;[{{pagesize}}]
            </div>
        </van-nav-bar>
        <van-pagination 
        v-model="currentPage" 
        :total-items="total" 
        :items-per-page="pagesize"
        force-ellipses
        /> -->
        
        <bottom-bar></bottom-bar>
        <van-popup
            v-model="showpop"
            position="bottom"
        >
            <van-picker
                show-toolbar
                :columns="[5, 10, 20, 40]"
                @confirm="popconfirm"
                @cancel="showpop = false"
            />
        </van-popup>

    </div>
</template>

<script>

import deviceitem from './deviceitem'
import * as data from '../data' 
import errcode from '../websocket/errcode'
import config from '../config'

export default {

    components: {
        deviceitem
    },

    data(){
        return {
            showpop: false,
            total: 0,
            active: 0,
            guzhanglist: [],
            imgpre: [],
            undealList: [],
            undealcount: 0,
            dealList: [],
            dealcount: 0,
            dealloading: false,
            dealfinished: false,
            dealcurrent: 1,
            dealsize: 5,
            undealloading: false,
            undealfinished: false,
            undealcurrent: 1,
            undealsize: 5,
        }
    },

    watch: {

        active(newval, oldval){
            this.switchTab(newval)
        },
        
        currentPage(n, o){
            this.pageChange(n)
        }
    },

    mounted(){

        this.getUndeal()
        this.getDeal()
        
    },

    methods: {

        onLoad(type){
            
            if(type == 'undeal'){
                this.undealloading = false
                this.undealfinished = true
            }else{
                this.dealcurrent++
                this.$http.post(`http://10.168.5.210:8602/alarm/equipmentFaultSoluted/faultSolutedPage?current=${this.dealcurrent}&size=${this.dealsize}`).then(res => {
                     res.data.records.map(item =>{
                         this.dealList.push(item)
                     })
                    this.dealcount = res.data.total
                    this.dealloading = false
                    if (this.dealcount == this.dealList){
                        this.dealfinished = true
                    }
                }).catch(res => {
                    // this.dealList = []
                    // this.dealcount = 0
                })
                
            }
        },

        test(){
            this.$http.get("http://10.168.5.210:8888/alarm/equipmentFault/allFaultInfo").then(res => {
                console.log(res);
                
            })
            // /equipmentFaultSoluted/faultSolutedPage
            this.$http.post("http://10.168.5.210:8888/alarm/equipmentFaultSoluted/faultSolutedPage?current=1&size=50").then(res => {
                console.log(res); 
            })
        },

        getUndeal(){

            let _this = this
            this.$http.get("http://10.168.5.210:8888/alarm/equipmentFault/allFaultInfo").then(res => {
                _this.undealList = res.data
            }).catch(res => {
                _this.undealList = []
            })
        },

        getDeal(){
            this.$http.post("http://10.168.5.210:8602/alarm/equipmentFaultSoluted/faultSolutedPage?current=1&size=5").then(res => {
                this.dealList = res.data.records
                this.dealcount = res.data.total
            }).catch(res => {
                this.dealList = []
                this.dealcount = 0
            })
        },

        switchpop(){
            this.showpop = !this.showpop
        },

        popconfirm(v, i){
            this.pagesize = v
            this.gendata()
            this.showpop = !this.showpop
        },

        pageChange(val){
            this.gendata()
        },

        gendata(){
            
        },

        switchTab(val){
            switch (val) {
                case 0:
                    console.log(this.active);
                    
                    break;
                case 1:
                    console.log(this.active);

                    break;
            
                default:
                    break;
            }
        },

        clickdetail(item){
            // this.$router.push(`gz_detail?gz_id=${item.code}`)
            let deal = errcode[item.errMsg] == undefined ? '故障类型未录入' : errcode[item.errMsg]
            this.$dialog.alert({
                message: deal
            })
        }
    }

}
</script>

<style lang="scss" scoped>

.pagesize {
    .van-nav-bar__title{
        color: black;
        margin-top: 2px;
    }
}

.testvant {
    margin: 10px;
}

</style>
