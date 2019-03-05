<template>
    <div>
        <van-nav-bar title="自动巡检记录" @click-left="onClickLeft"  class="title-color">
            <van-icon name="arrow-left" slot="left" size="30px"/>
        </van-nav-bar>

        <van-list
            v-if="true"
            style="margin-top: 2px;"
            
            >
            <van-cell v-for="item in guzhanglist" :key="item.code" @click="clickdetail(item)">
                <deviceitem />
            </van-cell>
        </van-list>

    </div>
</template>

<script>

import deviceitem from './zidong_list_item'

export default {

    components: {
        deviceitem
    },

    data(){
        return {
            active: 0,
            guzhanglist: [
                {cdoe: 0},
                {cdoe: 0},
                {cdoe: 0},
                {cdoe: 0},
                {cdoe: 0},
                {cdoe: 0},
            ]
        }
    },

    watch: {
        active(newval, oldval){
            this.switchTab(newval)
        },
    },

    methods: {

        switchTab(val){
            switch (val) {
                case 0:
                    console.log(this.active);
                    
                    break;
                case 1:
                    console.log(this.active);

                    break;
            
                default:
                    break;
            }
        },

        clickdetail(item){
            this.$router.push(`zidong_detail?gz_id=${item.code}`)
        },

        onClickLeft(){
            this.$router.push("xunjian")
        }
    }

}
</script>

<style scoped>
.testvant {
    margin: 10px;
}

</style>
