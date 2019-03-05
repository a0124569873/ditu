<template>
    <div>
        <van-checkbox-group v-model="result">
            <van-checkbox
                v-for="item in list"
                :key="item"
                :name="item"
            >
                复选框 {{ item }}
            </van-checkbox>

            <van-button v-for="item,index in listarr">
                {{item}}{{index}}
            </van-button>

            {{suidao['AAA'].list.aaa}}

            <van-button @click="testclick">
                fdgdgdfg
            </van-button>

        </van-checkbox-group>
    </div>
</template>
<script>
export default {
    data(){
        return {
            suidao: {
                'AAA': {
                    ccc: 999,
                    list: {
                        aaa: 111,
                        bbb: 222
                    }
                },
                'BBB': {
                    ccc: 999,
                    list: {
                        aaa: 111,
                        bbb: 222
                    }
                }
            },
            result: [],
            list: [
                '1',
                '2',
                '3'
            ],

            listarr: {
                aaa: {aaa: 111, bbb: 222},
                bbb: {aaa: 111, bbb: 222},
            }

        }
    },

    methods: {

        testclick(){
            this.suidao['AAA'].list = {
                aaa: 999,
                bbb: 555
            }
        },

        paizhao1(){
            let _this = this;
            api.getPicture({
                sourceType: 'album',//library
                encodingType: 'jpg',
                mediaValue: 'pic',
                destinationType: 'url',
                allowEdit: false,
                quality: 60,
                targetWidth:640,
                saveToPhotoAlbum: true
            }, function(ret, err){ 
                if (ret.data) {
                    alert(JSON.stringify(ret))
                    // alert(ret.data);
                    _this.imgpath = ret.data
                    // _this.$toast(ret.data)
                    document.getElementById("pic").innerHTML="<img src=" + ret.data + "/>"
                            
                }
            });
        },

        paizhao(){
            let _this = this;
            var FNPhotograph = api.require('FNPhotograph');
            FNPhotograph.open({
                path: 'fs://savePath',
                album: true ,
                quality: 'medium'
            }, function(ret){


                _this.retstr += ret.eventType

                if(ret.eventType == "takePhoto"){
                    // _this.dialog.alert({ message: JSON.stringify(ret) })
                    _this.retstr += JSON.stringify(ret)
                    FNPhotograph.close()
                }
                
            });
        },
        
    }
}
</script>
<style lang="scss" scoped>
.van-checkbox{
    font-size: 20px;
    margin: 20px;
}
</style>
