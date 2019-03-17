<template>
  <div>
    <!-- <div
            style="width: 100%;height: 25px;background-color: #184FBA;"
        >

    </div>-->
    <router-view class="mainview"></router-view>

    <van-tabbar v-model="active" style="background-color: #F7F8F7;" active-color="#184FBA">
      <van-tabbar-item icon="fire" to="guzhang" :replace="true" :dot="true">首页</van-tabbar-item>
      <van-tabbar-item icon="cart" to="xunjian" :replace="true">定位</van-tabbar-item>
      <van-tabbar-item icon="friends" to="wode" :replace="true">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import websocket from "./websocket";

import dituService from "../services/ditu";

export default {
  components: {
    websocket
  },

  data() {
    return {
      active: 1,
      title: "故障列表"
    };
  },

  watch: {
    active(newval, oldval) {
      this.switchpage(newval);
    }
  },

  mounted() {
    // setInterval(this.uploadposition, 2000);
  },

  methods: {
    uploadposition() {
      let _this = this;
      if (typeof api != undefined) {
        var bMap = api.require("bMap");
        bMap.getLocation(
          {
            accuracy: "100m",
            autoStop: true,
            filter: 1
          },
          function(ret, err) {
            _this.$toast({
              message: JSON.stringify(ret),
              duration: 1000,
              background: "#1989fa"
            });
            //   _this.$notify(JSON.stringify(ret));
            //   _this.$notify({
            //     message: JSON.stringify(ret),
            //     duration: 1000,
            //     background: "#1989fa"
            //   });
            if (ret.status) {
              dituService
                .location({ longitude: ret.lon, latitude: ret.lat })
                .then(res => {});
            } else {
              _this.$toast(err.code);
            }
          }
        );
      }
    },

    uploadposition1() {
      let _this = this;
      if (typeof api != undefined) {
        var bMap = api.require("aMap");
        bMap.getLocation(function(ret, err) {
          _this.$toast({
            message: JSON.stringify(ret),
            duration: 1000,
            background: "#1989fa"
          });
          //   _this.$notify(JSON.stringify(ret));
          //   _this.$notify({
          //     message: JSON.stringify(ret),
          //     duration: 1000,
          //     background: "#1989fa"
          //   });
          if (ret.status) {
            dituService
              .location({ longitude: ret.lon, latitude: ret.lat })
              .then(res => {});
          } else {
            _this.$toast(err.code);
          }
        });
      }
    },

    switchpage(newval) {
      switch (Number(newval)) {
        case 0:
          this.$router.push("guzhang");

          break;
        case 1:
          this.$router.push("xunjian");
          break;
        case 2:
          this.$router.push("wode");
          break;

        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mainview {
  height: calc(100vh - 113px);
}

.buttombar {
  buttom: 0;
}
</style>

