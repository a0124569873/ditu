<template>
    <div>
        <van-nav-bar :title="type == 'saoma' ? '扫码上报' : '手动上报'" @click-left="onClickLeft"  class="title-color">
            <van-icon name="arrow-left" slot="left" size="30px"/>
        </van-nav-bar>

        <saomaaddtitle :imgsrc.sync="imgsrc" :devicename.sync='devicename' :suidao.sync="suidao" :devicetype.sync="devicetype" v-if="type=='saoma'" />

        <shoudongaddtitle v-if="type == 'shoudong'" ref="shoudongcom" :typecode.sync="typecode" :suidaocode.sync="suidaocode"/>
        
        <addcom ref="addcom" :questions.sync="questions"/>

        <van-row class="showdong_add_item">
            <van-col span="24" style="text-align: center;">
                <van-button type="primary" style="width: 200px;" @click="upload">提交本次记录</van-button>
                <!-- <van-button type="primary" style="width: 200px;" @click="test">上报</van-button> -->
            </van-col>
        </van-row>

        <bottom-bar></bottom-bar>

    </div>
</template>

<script>

import addcom from './addcomponent'
import saomaaddtitle from './saoma_addtitle'
import shoudongaddtitle from './shoudong_addtitle'

import * as type from '../type'
import xunjianService from '../../services/xunjianService'

import lrz from 'lrz'

export default {

    components: {
        addcom,
        saomaaddtitle,
        shoudongaddtitle
    },

    data(){
        return {
            show: false,
            poptype:'',
            suidao: '',
            type: '',
            shebei: '',
            inputval: "",
            questions: ['请选择设备类型'],
            questionres: [],
            code: '',
            photos: [],
            imgsrc: '',
            devicename: '',
            devicetype: '',
            typecode: '',
            suidaocode: '',
            result: 'static/jietu/photo-suidao-fengji.png',

        }
    },

    watch: {
       typecode(n, o){
           if(n == ''){
               this.questions = ["请选择设备类型"]
           }else{
               console.log(n);
               if(type.typecode[n] != undefined){
                   this.questions = type.typecode[n].split(",")
               }else{
                   this.questions = ["设备类型未录入"]
               }
           }
           
       } 
    },

    mounted(){

        this.type = this.$route.query.type

        if (this.type == 'saoma'){
            let info = this.$route.query.info
            let json_info = JSON.parse(info)
            this.imgsrc = 'static/mapIcon/' + json_info.categoryCode + '--1.png'
            this.devicename = json_info.name
            this.code = json_info.code
            this.suidao = json_info.sectionName
            this.suidaocode = json_info.sectionCode
            this.devicetype = json_info.categoryName
            this.questions = type.typecode[json_info.categoryCode].split(",")
        }

        
    },

    methods: {

        encodeimg(file, suidaocode, codetimestamp, filename){

            lrz(file,{quality: 0.1}).then(res =>{
                let xunjianrecord = localStorage.getItem("xunjianrecord")
                let xjr_json = JSON.parse(xunjianrecord)
                xjr_json[suidaocode][codetimestamp]['imgs'][filename] = {
                    'file-name' : filename,
                    'file-size' : res.fileLen,
                    'file-content' : res.base64
                }

                let dst_str = JSON.stringify(xjr_json)
                localStorage.setItem('xunjianrecord', dst_str)
                
            })

        },

        updatetypecode(typecode){
            this.questions = type.typecode[typecode].split(",")
        },

        test(){
            console.log(this.typecode);
            
        },

        upload(){
            let _this = this

            if (this.type == 'shoudong') {
                this.code = this.$refs.shoudongcom.code
                this.devicename = this.$refs.shoudongcom.shebei
            }

            if(this.code == ''){
                this.$toast("请选择设备")
                return
            }

            if(this.suidaocode == ''){
                this.$toast("请选择隧道")
                return
            }

            if (this.$refs.addcom.filess.length != 0 || this.$refs.addcom.questionres.length != 0 || this.$refs.addcom.inputval != ''){

                let timestamp = new Date().getTime()

                let problem = this.$refs.addcom.questionres.join(",") + "|" + this.$refs.addcom.inputval
                let imgsurl_arr = []
                let img_arr = {}

                Object.keys(this.$refs.addcom.files).map(item => {

                    this.$refs.addcom.files[item].finimgurl = _this.code + "-" + new Date().getTime() +  "-" + this.$RN(0, 9999) +  "-" + this.$refs.addcom.files[item].file.file.name

                    this.encodeimg(this.$refs.addcom.files[item].file.file, this.suidaocode, this.code + timestamp, this.$refs.addcom.files[item].finimgurl)

                    imgsurl_arr.push(this.$refs.addcom.files[item].finimgurl)

                }) 
                let imgs = imgsurl_arr.join(",")

                let xunjianrecord = localStorage.getItem("xunjianrecord")
                if(xunjianrecord == null){
                    xunjianrecord = '{}'
                }

                let xjr_json = JSON.parse(xunjianrecord)

                if(xjr_json[this.suidaocode] == undefined){
                    xjr_json[this.suidaocode] = {}
                }

                xjr_json[this.suidaocode][this.code + timestamp] = {
                    timestamp: timestamp,
                    devicename: this.devicename,
                    equipCode: this.code,
                    symptom: problem,
                    imageUrl: imgs,
                    imgs: {}
                }

                let dst_str = JSON.stringify(xjr_json)
                localStorage.setItem('xunjianrecord', dst_str)
                // this.$toast("提交成功")
                this.$dialog.alert({message: "提交成功"})

            }else{
                this.$toast("请输入问题描述")
            }
        },

        readxjr(){

        },

        writexjr(){
            
        },

        onClickLeft(){
            this.$router.push("xunjian")
        }
    }
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
