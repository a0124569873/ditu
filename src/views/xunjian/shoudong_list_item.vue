<template>
    <div style="margin: 3px">
        <van-row>
            <van-col span="12">
                <div style="text-align: center;">
                    巡检时间：
                </div>
            </van-col>
            <van-col span="12">
                <div style="text-align: center;">
                    {{item.createDate}}
                </div>
            </van-col>
        </van-row>
        <van-row>
             <van-col span="12">
                <div style="text-align: center;">
                    巡检设备数量:
                </div>
            </van-col>
            <van-col span="12">
                <div style="text-align: center;">
                    {{item.equipCount}}
                </div>
            </van-col>
        </van-row>
        <van-row>
            <van-col style="text-align: center;">
                <van-tag v-for="nameitem in item.equips.split(' ')" style="margin: 3px;" type="success">{{nameitem}}</van-tag>
            </van-col>
        </van-row>
    </div>
</template>

<script>
export default {

    props:[
        'item'
    ]
    
}
</script>
