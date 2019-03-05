<template>
    <div>
        <van-nav-bar :title="'告警记录'" @click-left="$router.push('wode')"  class="title-color">
            <van-icon name="arrow-left" slot="left" size="30px"/>
        </van-nav-bar>

        <div v-if="list.length == 0" style="text-align: center; margin: 10px;">
            记录为空
        </div>

        <van-button
            @click="clearall"
            type="primary"
            size="large"
        >
            清空列表
        </van-button>

        <van-collapse v-model="colactive" v-if="list.length != 0">

            <van-list
                v-if="true"
                style="margin-top: 2px;"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad()"
                >
                <van-cell v-for="item in list" :key="item.timestamp">
                    <van-collapse-item :title="item.name + '-' + tolocal(item.timestamp)" :name="item.timestamp" style="text-align: center;">
                        {{item.msg[0]}}<br/>
                        {{item.msg[1]}}
                    </van-collapse-item>
                </van-cell>
            </van-list>

        </van-collapse>

        <bottom-bar></bottom-bar>

    </div>
</template>
<script>
export default {

    data(){
        return{
            list: [],
            colactive: [],
            page: 1,
            size: 10,
            loading: false,
            finished: false,
        }
    },

    mounted(){
        this.onLoad()
    },

    methods: {

        onLoad(){

            this.loading = true

            let _this = this

            let warn_str = localStorage.getItem("warnrecord")

           if(warn_str == null){
                warn_str = '{}'
            }

            let warn_json = JSON.parse(warn_str)

            let key_arr = Object.keys(warn_json)

            let dst_arr = key_arr.slice((this.page - 1) * this.size, this.page * this.size)

            dst_arr.map(item => {
                warn_json[item].msg = warn_json[item].msg.split("<br/>")
                _this.list.push(warn_json[item])
            })

            if(_this.list.length == key_arr.length){
                this.finished = true
            }

            this.page++

            this.loading = false

        },

        tolocal(time){
            return new Date(time).toLocaleString()
        },

        clearall(){
            if (this.list.length == 0) {
                this.$toast("记录为空")
                return
            }
            localStorage.setItem("warnrecord", "{}")
            this.list = []
            this.$toast("清空成功")
        }
    }


}
</script>
<style lang="scss" scoped>

</style>
