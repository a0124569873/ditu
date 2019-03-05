<template>
    <div style="width: 100%;height: 100%;background-color: white;">
        <div style="padding: 50px;">&nbsp;</div>
        <van-row type="flex" justify="center" style="margin-bottom: 100px;">
            <van-col style="font-size: 20px;">
                登&nbsp;&nbsp;&nbsp;录
            </van-col>
        </van-row>
        <van-row type="flex" justify="center">
            <van-col span="16">
                <van-field
                    v-model="formdata.username"
                    required
                    clearable
                    label="用户名"
                    right-icon="question-o"
                    placeholder="请输入用户名"
                    @click-right-icon="$toast('question')"
                />
            </van-col>
        </van-row>
        <van-row type="flex" justify="center">
            <van-col span="16">
                <van-field
                    v-model="formdata.password"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                    required
                />
            </van-col>
        </van-row>
        <van-row type="flex" justify="center" style="margin-top: 100px;">
            <van-col>
                <van-button type="primary" style="width: 200px;" @click="login">登录</van-button>
            </van-col>
        </van-row>
    </div>
</template>
<script>
export default {

    data(){
        return {
            formdata: {
                username: '',
                password: ''
            }
        }
    },

    methods: {
        login(){
            this.$router.push("xunjian")
        },
    }
}
</script>
<style lang="scss" scoped>



</style>
