<template>
    <div style="margin: 3px">
        <van-row>
            <van-col span="6">
                <div style="margin: 10px auto;text-align: center;">
                    <img :src="imgpath" alt="" >
                </div>
            </van-col>
            <van-col span="18">
                <van-row>
                    <van-col span="8">隧道风机--{{item.code}}</van-col>
                    <van-col span="8">&nbsp;</van-col>
                    <van-col span="8">1天前</van-col>
                </van-row>
                <van-row>
                    <van-col span="8">西黄隧道</van-col>
                    <van-col span="8">西坪-寺湾</van-col>
                    <van-col span="8">K20+45</van-col>
                </van-row>
                <van-row>
                    <van-col span="8">故障现象：图像偏色</van-col>
                    <van-col span="8">&nbsp;</van-col>
                    <van-col span="8">已上报</van-col>
                </van-row>
            </van-col>
            
        </van-row>
    </div>
</template>

<script>
export default {
    props: ['item', 'cur'],

    data(){
        return {
            imgpath: ''
        }
    },

    mounted() {
        // console.log(this.item);
        // console.log(this.$parent);

        this.imgpath = "static/mapIcon/" + this.item.imgpath + "--1.png"
        
    },
}
</script>
