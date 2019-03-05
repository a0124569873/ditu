<template>
    <div>
        <van-row>
            <van-col span="12" style="text-align: center;">设备名称：</van-col>
            <van-col span="12" style="text-align: center;">{{item.equName}}</van-col> 
        </van-row>
        <van-row>
            <van-col span="12" style="text-align: center;">巡检时间：</van-col>
            <van-col span="12" style="text-align: center;">{{Number(item.timestamp)/1000 | formatTime}}</van-col> 
        </van-row>
    </div>
</template>
<script>

export default {

    props:[
        'item'
    ],

    data(){
        return {
            list: []
        }
    },

    mounted(){

    }
}
</script>
<style lang="scss" scoped>

</style>
