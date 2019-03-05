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
            <div class="card">
                <van-row class="detail_row" type="flex" justify="center">
                    <van-col>
                        故障时间
                    </van-col>
                    <van-col>
                        2019-2-19 20:20:20
                    </van-col>
                </van-row>
                <van-row class="detail_row" type="flex" justify="center">
                    <van-col>
                        故障现象
                    </van-col>
                    <van-col>
                        故障现象1<br/>
                        故障现象2
                    </van-col>
                </van-row>
                <van-row class="detail_row" type="flex" justify="center">
                    <van-col>
                        状&nbsp;&nbsp;态
                    </van-col>
                    <van-col>
                        未处理
                    </van-col>
                </van-row>
            </div>
            <div class="card">
                <van-row class="detail_row" type="flex" justify="center">
                    <van-col>
                        历史故障记录
                    </van-col>
                </van-row>
                <van-row class="detailrow" v-for="item in [1, 2, 3]" type="flex" justify="center">
                    <van-col span="12">
                        2019-2-20 20:20:20
                    </van-col>
                    <van-col span="12">
                        故障现象1<br/>
                        故障现象2
                    </van-col>
                </van-row>
            </div>

        </div>

        


    </div>
</template>

<script>
export default {

    data(){
        return {
            itemData: {

            }
        }
    },

    mounted(){
        this.itemData.code = this.$route.query.gz_id
    },

    methods: {
        onClickLeft(){
            this.$router.push("guzhang")
        }
    }
}
</script>

<style lang="scss" scope>
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

