<template>
    <div>
        <van-nav-bar title="巡检记录列表" @click-left="$router.push('shoudong_list')" class="title-color">
            <van-icon name="arrow-left" slot="left" size="30px"/>
        </van-nav-bar>
        <van-list>
            <van-cell
                v-for="item in list"
                @click="$router.push(`shoudong_record_list_item_detail?timestamp=${item.timestamp}&equipCode=${item.equipCode}`)"
            >
                <deviceitem :item="item"/>
            </van-cell>
        </van-list>
        <van-pagination 
        v-model="curPage"
        :total-items="total"
        :items-per-page="pagesize"
        @change="curpagechange()"
        />
    </div>
</template>
<script>

import xunjianService from '../../services/xunjianService'
import deviceitem from './shoudong_record_list_items_list_item'

export default {

    components:{
        deviceitem
    },

    data(){
        return {
            list: [],
            curPage: 1,
            total: 0,
            pagesize: 5,
            timestamp: ''
        }
    },

    mounted(){

        this.timestamp = this.$route.query.timestamp
        this.pagemodify()

    },

    methods: {
        curpagechange(){
            this.pagemodify()
        },

        pagemodify(){

            let _this = this
            let params = {
                pageNo: this.curPage,
                pageSize: this.pagesize,
                timestamp: this.timestamp
            }
            xunjianService.getXunjianItems(params).then(res => {
                _this.list = res.msg.content
                _this.total = res.msg.size
                
            })

        }
    }
}
</script>
<style lang="scss" scoped>

</style>
