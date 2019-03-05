<template>
    <div>

        <van-row class="showdong_add_item1">
            <van-col span="24">
                <div class="title">
                    现场图片:
                </div>
                <div style="display: flex;align-items: center;flex-wrap: wrap; width: 100%;margin: 5px;">
                    <img v-for="item in filess" :src="item.content" alt="" style="width: 100px; height: 100px;margin: 5px;">
                    <van-icon name="delete" size="50px" @click="delall" color="#409EFF"/>
                    <van-uploader :after-read="onRead">
                        <van-icon name="plus" size="50px" color="#409EFF"/>
                    </van-uploader>
                    <!-- <van-button @click="test">aaaa</van-button> -->
                </div>

            </van-col>
        </van-row>

        <van-row class="showdong_add_ite" style="background-color: white;margin: 5px;">
            <van-col span="24">
                <div class="title" style="font-size: 20px;margin: 5px;">
                    问题描述:
                </div>
                <van-checkbox-group v-model="questionres">
                    <van-checkbox
                        v-for="item in questions"
                        :key="item"
                        :name="item"
                        style="margin: 10px;"
                    >
                        {{item}}
                    </van-checkbox>
                </van-checkbox-group>
            </van-col>
        </van-row>

        <van-row class="showdong_add_item1">
            <van-col span="24">
                <div class="title">
                    备注:
                </div>
                <van-cell-group>
                    <van-field type="textarea" rows="10" v-model="inputval" placeholder="请输入描述" />
                </van-cell-group>
            </van-col>
        </van-row>

    </div>
</template>

<script>

import axios from 'axios'
import 'es6-promise-always'
import config from '../config'


export default {

    data(){
        return {
            domainconfig: ''
        }
    },

    props: [
        'questions'
    ],

    mounted(){
        this.domainconfig = config.imguploaddomain
    },

    data(){
        return {
            show: false,
            inputval: "",
            questionres: [],
            files: {},
            filess: [],
            loading: false

        }
    },

    methods: {

        test(){

        },

        delall(){
            this.files = {}
            this.filess = []

        },

        uploadimgs(){

            // this.loading = true
            let _this = this

            Object.keys(this.files).map(item => {
                let formdata = new FormData()
                formdata.append('file64', this.files[item].file.content.split(",")[1]);
                formdata.append('fileName', this.files[item].finimgurl);
                formdata.append('fileLength', this.files[item].file.file.size);
                
                // let config = {
                    // headers:{'Content-Type':'multipart/form-data'}
                // };
                // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'

                axios.create().post(_this.domainconfig, formdata).then(res => {
                    
                    if (res.data.code == 200){
                        _this.$toast("上传" + _this.files[item].finimgurl + "成功")
                    }else{
                        _this.$toast("上传失败")
                    }
                }).catch((err) => {
                    _this.$toast("上传失败" + err)
                }).always((err) =>  {
                    // console.log(err);
                    // _this.loading = false
                })
            })

        },

        onRead(file){
            this.files[file.file.name]  = { file: file}
            this.filess.push( file )
        },

    }
}
</script>

<style lang="scss" scoped>

.showdong_add_item1{

    background-color: white;
    margin: 5px;

    .title{
        margin: 5px;
        font-size: 20px;
    }

    .van-col{
    }

    .van-checkbox{

        // background-color: red;

        // padding: 5px;
        margin: 10px;
        font-size: 16px;
        .van-icon{
            margin: 0px;
        }
    }

    .van-icon{
        margin: 20px;
    }

}

</style>
