<template>
    <div>
        <van-nav-bar title="我的" class="title-color">
        </van-nav-bar>

        <van-row class="title-color" style="padding: 10px;">
            <van-col span="8">
                <div style="border-radius: 50%;margin: 0px 20px;">
                    <van-icon name="manager" size="100px" color="#409EFF"></van-icon>
                </div>
            </van-col>
            <van-col span="16" style="color: white;">
                <van-row>
                    <van-col style="font-size: 20px;margin: 10px;">
                        李&nbsp;&nbsp;思
                    </van-col>
                </van-row>
                <van-row>
                    <van-col style="margin: 10px;">
                        运维管理
                    </van-col>
                </van-row>
            </van-col>
        </van-row>

        <van-nav-bar style="margin: 5px 0px;">
            <div slot="left">
                我的上报
            </div>
            <div slot="right">
                <van-icon name="arrow" size="40px" @click="$router.push('shoudong_list')"></van-icon>
            </div>
        </van-nav-bar>

        <!-- <van-nav-bar style="margin: 5px 0px;">
            <div slot="left">
                测试页面
            </div>
            <div slot="right">
                <van-icon name="arrow" size="40px" @click="$router.push('test')"></van-icon>
            </div>
        </van-nav-bar> -->

        <van-nav-bar style="margin: 5px 0px;">
            <div slot="left">
                退出登录
            </div>
            <div slot="right">
                <van-icon name="arrow" size="40px" @click="denglu"></van-icon>
            </div>
        </van-nav-bar>
        <van-nav-bar style="margin: 5px 0px;">
            <div slot="left">
                告警记录
            </div>
            <div slot="right">
                <van-icon name="arrow" size="40px" @click="$router.push('warning')"></van-icon>
            </div>
        </van-nav-bar>

        <!-- <van-button @click="test">
            测试按钮
        </van-button> -->

    </div>
</template>

<script>

import axios from 'axios'

export default {

    data(){
        return {

        }
    },

    watch:{
        
    },

    methods: {

        test(){
            // this.$dialog.alert({message: "sdfsdfsdf"})
            // let params = {}
            // api.notification();
            // this.$dialog.alert({message: "sdfsdfsdf<br/>gferwer"})

            let aaa = {}

            // console.log(aaa['ss'] == undefined);

            console.log(localStorage.getItem("asdasd") == null);
            
            
        },

        denglu(){
            // this.$toast("sdfsdfsdfsdf")
            this.$router.push("/login")
        }

    }
}
</script>

<style lang='scss' scoped>

</style>
