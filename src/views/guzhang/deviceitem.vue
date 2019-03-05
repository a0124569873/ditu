<template>
    <div style="margin: 3px">
        <van-row>
            <!-- <van-col span="6">
                <div style="margin: 10px auto;text-align: center;">
                    <img :src="imgpath" alt="" >
                </div>
            </van-col> -->
            <van-col span="24" style="margin: 10px auto;text-align: center;">
                <van-row>
                    <van-col span="8">隧道名称：</van-col>
                    <!-- <van-col span="8">&nbsp;</van-col> -->
                    <van-col span="16">{{item.sectionName}}</van-col>
                </van-row>
                <van-row>
                    <van-col span="8">设备名称</van-col>
                    <!-- <van-col span="8">&nbsp;</van-col> -->
                    <van-col span="16">{{item.name}}</van-col>
                </van-row>
                <van-row v-if="type == 'undeal'">
                    <van-col span="8">故障现象：</van-col>
                    <!-- <van-col span="8">&nbsp;</van-col> -->
                    <van-col span="16">{{item.errMsg}}</van-col>
                </van-row>
                <van-row v-if="type == 'deal'">
                    <van-col span="8">创建时间：</van-col>
                    <!-- <van-col span="8">&nbsp;</van-col> -->
                    <van-col span="16">{{item.createTime}}</van-col>
                </van-row>
            </van-col>
            
        </van-row>
    </div>
</template>

<script>
export default {
    props: [
        'item',
        'cur',
        'type'
    ],

    data(){
        return {
            imgpath: ''
        }
    },

    mounted() {
        // console.log(this.item);
        // console.log(this.$parent);

        // this.imgpath = "static/mapIcon/" + this.item.imgpath + "--1.png"
        
    },
}
</script>
