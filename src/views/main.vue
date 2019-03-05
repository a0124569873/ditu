<template>
    <div>

        <!-- <div
            style="width: 100%;height: 25px;background-color: #184FBA;"
        >

        </div> -->
        
        <router-view class="mainview">
        </router-view>

        <van-tabbar v-model="active" style="background-color: #F7F8F7;" active-color="#184FBA">
                <van-tabbar-item icon="fire" to="guzhang" :replace=true :dot="true">故障</van-tabbar-item>
                <van-tabbar-item icon="cart" to="xunjian" :replace=true >巡检</van-tabbar-item>
                <van-tabbar-item icon="friends" to="wode" :replace=true >我的</van-tabbar-item>
        </van-tabbar>
        
    </div>
</template>

<script>

import websocket from './websocket'

export default {

    components: {
        websocket
    },

    data (){
        return {
            active: 1,
            title: "故障列表"
        }
    },

    watch: {
        active (newval, oldval) {
            this.switchpage(newval)
        }
    },

    mounted (){
        this.$router.push("xunjian")
    },

    methods: {

        switchpage(newval){
            
            switch (Number(newval)) {
                case 0:
                    this.$router.push("guzhang")
                    
                    break;
                case 1:
                    this.$router.push("xunjian")
                    break;
                case 2:
                    this.$router.push("wode")
                    break;
            
                default:

                    break;
            }
        }
    }

}
</script>

<style lang="scss" scoped>

.mainview{
    height: calc(100vh - 113px);
}

.buttombar{
    buttom: 0;
}
</style>

