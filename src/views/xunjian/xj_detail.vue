<template>
    <div>
        <div class="bodycontaner">
            设备详情:
            {{deviceid}}
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return {
            deviceid: ""
        }
    },
    mounted(){
        this.deviceid = this.$route.query.deviceid
    }
}
</script>