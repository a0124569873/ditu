<template>
    <div>
        <van-nav-bar title="巡检记录设备详情" @click-left="$router.push(`shoudong_record_list_items_list?timestamp=${timestamp}`)" class="title-color">
            <van-icon name="arrow-left" slot="left" size="30px"/>
        </van-nav-bar>

        <div>
            <div class="card">
                <van-row class="detail_row" type="flex" justify="center">
                    <van-col>
                        <img :src="logoimgpath" alt="">
                    </van-col>
                </van-row>
                <van-row class="detail_row" type="flex" justify="center">
                    <van-col>
                        {{name}}
                    </van-col>
                </van-row>
                <van-row class="detail_row row-tag" type="flex" justify="center" gutter="">
                    <van-col>
                        <van-tag type="primary">{{suidao}}</van-tag>
                    </van-col>
                    <van-col>
                        <!-- <van-tag type="primary"></van-tag> -->
                    </van-col>
                    <van-col>
                        <van-tag type="primary">{{zhuanghao}}</van-tag>
                    </van-col>
                </van-row>
            </div>
            <div class="">

                <van-row class="showdong_add_item1">
                    <van-col span="24">
                        <div class="title">
                            现场图片[{{images.length}}]:
                        </div>
                        <div style="display: flex;align-items: center;flex-wrap: wrap; width: 100%;margin: 5px;">
                            <img v-for="item in images" :src="item" alt="" style="width: 100px; height: 100px;margin: 5px;border: 1px solid #000;" @click="imgclick">
                            <!-- <div v-for="item in images">
                                {{item}}
                            </div> -->
                        </div>

                    </van-col>
                </van-row>

                <van-row class="showdong_add_item1">
                    <van-col span="24">
                        <div class="title">
                            问题描述:
                        </div>
                        <div style="display: flex;align-items: center;flex-dirction: column; width: 100%;margin: 5px;">
                            <van-tag v-for="item in questionsres" style="margin: 20px;">{{item}}</van-tag><br/>
                        </div>
                    </van-col>
                </van-row>

                <van-row class="showdong_add_item1">
                    <van-col span="24">
                        <div class="title">
                            备注:
                        </div>
                        <div style="margin: 10px;">
                            {{beizhu}}
                        </div>
                    </van-col>
                </van-row>
                
            </div>
            <div class="card">
                
            </div>

        </div>

        <bottom-bar></bottom-bar>

        


    </div>
</template>

<script>

import config from '../config'
import xunjianService from '../../services/xunjianService'
import { ImagePreview } from 'vant';

export default {

    data(){
        return {

            beizhu: "",

            questionsres: [
            ],

            itemData: {
            },

            images: [
            ],

            imgdomain: '',

            name:'',

            logoimgpath: '',

            suidao: '',

            zhuanghao: '',

            timestamp: '',


        }
    },

    mounted(){

        this.imgdomain = config.imgdomain

        let _this = this

        let timestamp = this.$route.query.timestamp
        this.timestamp = timestamp
        let equipCode = this.$route.query.equipCode

        let params = {
            timestamp: timestamp,
            equipCode: equipCode
        }

        xunjianService.getXunjianItemsItem(params).then(res => {
            let appearance_arr = res.detectResult.appearance.split("|")
            _this.beizhu = appearance_arr[1]
            _this.questionsres = appearance_arr[0].split(",")
            _this.name = res.detectResult.equName
            _this.suidao = res.detectResult.sectionName
            _this.logoimgpath = 'static/mapIcon/' + res.detectResult.dataType + '--1.png'
            res.detectResult.imageUrl.split(",").map(item =>{
                _this.images.push(_this.imgdomain + item)
            })
            _this.zhuanghao = res.detectResult.pileNo
            

        })
    },

    methods: {
        imgclick(){
            ImagePreview(this.images);
        }
    }
}
</script>

<style lang="scss" scope>

.showdong_add_item1{

    background-color: white;
    margin: 5px;

    .title{
        margin: 5px;
        font-size: 20px;
    }

    .van-col{
        // font-size: 20px;
    }

    .van-checkbox{
        padding: 5px;
        font-size: 16px;
    }

    .van-icon{
        margin: 20px;
    }

}

.card{
    margin: 5px 0px;
    background-color: white;
    padding: 5px;
}

.detail_row {
    margin: 10px;
    .van-col {
        margin: 0px 20px;
    }
}

.row-tag {
    .van-col {
        margin: 0px 20px;
    }
}

/* .van-nav-bar__title {
    color: black;
} */

</style>

