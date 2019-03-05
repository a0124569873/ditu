<template>
    <div>
        <van-row class="showdong_add_item" type="flex" justify="center">
            <van-col>
                    <img :src="imgsrc" alt="">
                </van-col>
            </van-row>
        <van-row class="showdong_add_item">
            <van-col span="24">
                <div>{{devicename}}</div>
            </van-col>
        </van-row>
        <van-row class="showdong_add_item">
            <van-col span="12">所在隧道</van-col>
            <van-col span="12">
                <div>{{suidao}}</div>
            </van-col>
        </van-row>
        <van-row class="showdong_add_item">
            <van-col span="12">设备分类</van-col>
            <van-col span="12">
                <div>{{devicetype}}</div>
            </van-col>
        </van-row>
    </div>
</template>
<script>
export default {
    props: [
        'imgsrc',
        'devicename',
        'suidao',
        'devicetype'
    ]
}
</script>
<style lang="scss" scoped>
.showdong_add_item{
    padding: 10px;
    background-color: white;
    margin: 0px;
    text-align: center;
}
</style>
