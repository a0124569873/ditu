<template>
    <div>
        <van-nav-bar :title="'本地记录'" @click-left="$router.push('xunjian')"  class="title-color">
            <van-icon name="arrow-left" slot="left" size="30px"/>
        </van-nav-bar>

        <van-list
        >
            <van-cell
                v-for="item in list"
                :title="item.devicename"
            />
        </van-list>
        
        <div style="text-align: center;margin: 10px;" v-if="list.length == 0">
            本地记录为空
        </div>

        <div style="text-align: center;">
            <van-button
                type="primary"
                size="large"
                style="margin: 10px 0px;width:80%"
                @click="uploadrecord"
            >
                上传记录
            </van-button>
        </div>


        <bottom-bar></bottom-bar>

    </div>
</template>
<script>

import xunjianService from '../../services/xunjianService'
import axios from 'axios'
import config from '../config'

export default {

    data(){
        return {
            list: [],
            tunnellist: {},
            domainconfig : '',
            msg: ''
        }
    },

    mounted(){

        let xjr = localStorage.getItem("xunjianrecord")
        if (xjr == null) {
            xjr = '{}'
        }
        let xjr_json = JSON.parse(xjr)

        Object.keys(xjr_json).map(item => {
            Object.keys(xjr_json[item]).map(suidaoitem_key => {
                this.list.push(xjr_json[item][suidaoitem_key])
            })
        })

        xunjianService.getAllTunnel().then(res => {
            res.map(item => {
                this.tunnellist[item.code] = item
            })
        })

        this.domainconfig = config.imguploaddomain
        
    },

    methods: {

        uploadrecord(){

            if(this.list.length == 0){
                this.$toast("本地记录为空")
                return
            }

            let _this = this

            let xjr = localStorage.getItem("xunjianrecord")
            if (xjr == null) {
                xjr = '{}'
            }
            let xjr_json = JSON.parse(xjr)

            Object.keys(xjr_json).map(item => {
                let timestamp = new Date().getTime()

                let equips = []

                 Object.keys(xjr_json[item]).map(eachsuidao_item_key => {

                    //上传记录
                    let params = {
                        equipCode : xjr_json[item][eachsuidao_item_key].equipCode,
                        serverity : '1',
                        symptom : xjr_json[item][eachsuidao_item_key].symptom,
                        timestamp : timestamp,
                        solutionCode : '1',
                        imageUrl : xjr_json[item][eachsuidao_item_key].imageUrl
                    }
                    xunjianService.addXunjianRecordItemItem(params).then(res => {
                        if(res == true){
                            _this.msg += `上传记录${xjr_json[item][eachsuidao_item_key].devicename}结束<br/>`
                            // _this.$toast(`上传记录${xjr_json[item][eachsuidao_item_key].devicename}结束`)
                        }
                    })

                    //上传图片
                    Object.keys(xjr_json[item][eachsuidao_item_key].imgs).map(imgitem_key =>{
                        let formdata = new FormData()
                        formdata.append('file64', xjr_json[item][eachsuidao_item_key].imgs[imgitem_key]['file-content'].split(",")[1]);
                        formdata.append('fileName', xjr_json[item][eachsuidao_item_key].imgs[imgitem_key]['file-name']);
                        formdata.append('fileLength', xjr_json[item][eachsuidao_item_key].imgs[imgitem_key]['file-size']);
                        
                        // let config = {
                            // headers:{'Content-Type':'multipart/form-data'}
                        // };

                        axios.create().post(_this.domainconfig, formdata).then(res => {
                            
                            if (res.data.code == 200){
                                // _this.$toast(`上传图片${xjr_json[item][eachsuidao_item_key].imgs[imgitem_key]['file-name']}成功`)
                                _this.msg += `上传图片${xjr_json[item][eachsuidao_item_key].imgs[imgitem_key]['file-name']}成功<br/>`
                            }else{
                                // _this.$toast(`上传图片${xjr_json[item][eachsuidao_item_key].imgs[imgitem_key]['file-name']}失败`)
                                _this.msg += `上传图片${xjr_json[item][eachsuidao_item_key].imgs[imgitem_key]['file-name']}失败<br/>`
                            }
                        }).catch((err) => {
                            // _this.$toast(`上传图片${xjr_json[item][eachsuidao_item_key].imgs[imgitem_key]['file-name']}失败${err}`)
                            _this.msg += `上传图片${xjr_json[item][eachsuidao_item_key].imgs[imgitem_key]['file-name']}失败${err}<br/>`
                            console.log(_this.msg);
                            
                        }).always((err) =>  {
                            // console.log(err);
                            // _this.loading = false
                        })
                    })

                    //拼接记录equits
                    equips.push( xjr_json[item][eachsuidao_item_key].devicename)
                })

                let params = {
                    timestamp: timestamp,
                    faultCount: xjr_json[item].length,
                    equipCount: xjr_json[item].length,
                    section: _this.tunnellist[item].name,
                    equips: equips.join(" "),
                    createDate: _this.$FT(timestamp),
                    sectionCode: item,
                    allCheck: '1'
                }
                
                xunjianService.addXunjianRecordItem(params).then(res => {
                    _this.msg += `隧道[${_this.tunnellist[item].name}]记录上传成功<br/>`
                    _this.$dialog.alert({message: _this.msg})
                    localStorage.setItem('xunjianrecord', '{}')
                    _this.list = []
                }).catch(res => {
                    _this.$toast(res)
                })

            })

        }
        
    },
}
</script>

<style lang="scss" scoped>

</style>
