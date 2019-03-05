<template>
    <div>
        <van-nav-bar title="故障详情" @click-left="onClickLeft" class="title-color">
            <van-icon name="arrow-left" slot="left" size="30px"/>
        </van-nav-bar>

        <div>
            <div class="card">
                <van-row class="detail_row" type="flex" justify="center">
                    <van-col>
                        <img src="static/mapIcon/SDFJ-1.gif" alt="">
                    </van-col>
                </van-row>
                <van-row class="detail_row" type="flex" justify="center">
                    <van-col>
                        隧道风机FJ03
                    </van-col>
                </van-row>
                <van-row class="detail_row row-tag" type="flex" justify="center" gutter="">
                    <van-col>
                        <van-tag type="primary">西黄隧道</van-tag>
                    </van-col>
                    <van-col>
                        <van-tag type="primary">西坪-寺湾</van-tag>
                    </van-col>
                    <van-col>
                        <van-tag type="primary">K30+21</van-tag>
                    </van-col>
                </van-row>
            </div>
            <div class="">

                <van-row class="showdong_add_item1">
                    <van-col span="24">
                        <div class="title">
                            现场图片:
                        </div>
                        <div style="display: flex;align-items: center;flex-wrap: wrap; width: 100%;margin: 5px;">
                            <img v-for="item in images" :src="item.src" alt="" style="width: 200px; height: 155px;margin: 5px;">
                        </div>

                    </van-col>
                </van-row>

                <van-row class="showdong_add_item1">
                    <van-col span="24">
                        <div class="title">
                            问题描述:
                        </div>
                        <div style="display: flex;align-items: center;flex-dirction: column; width: 100%;margin: 5px;">
                            <van-tag v-for="item in questionsres" style="margin: 20px;">{{item.name}}</van-tag><br/>
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
export default {

    data(){
        return {

            beizhu: "测试备注",

            questionsres: [
                {name: '外观有破损', code: '001'},
                {name: '外观不好看', code: '002'},
                {name: '噪音太大', code: '003'},
            ],

            itemData: {

            },

            images: [
                {src: 'static/jietu/photo-suidao-fengji.png'},
                {src: 'static/jietu/photo-suidao-fengji.png'},
                {src: 'static/jietu/photo-suidao-fengji.png'},
                {src: 'static/jietu/photo-suidao-fengji.png'},
            ]
        }
    },

    mounted(){
        this.itemData.code = this.$route.query.gz_id
    },

    methods: {
        onClickLeft(){
            this.$router.push("shoudong_list")
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

