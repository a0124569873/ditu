<template>
  <div class="bodycontaner1">
    <div>
      <van-nav-bar title="定位" class="title-color"></van-nav-bar>
      <van-search
        v-model="searchvalue"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="onSearch"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>

      <el-amap vid="amapDemo" class="zxndemo">
        <el-amap-marker v-for="marker in locations" :position="marker.position"></el-amap-marker>
      </el-amap>

      <bottom-bar></bottom-bar>
    </div>
  </div>
</template>

<script>
import { listobj, scan } from "../data";

import dituService from "../../services/ditu";

export default {
  data() {
    return {
      scankeys: [
        "categoryCode",
        "categoryName",
        "code",
        "name",
        "sectionCode",
        "sectionName"
      ],
      locations: [],
      searchvalue: ""
    };
  },

  mounted() {
    this.getposition();
  },

  methods: {
    getposition() {
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
            _this.$toast(JSON.stringify(ret));
            if (ret.status) {
              _this.locations.push({
                position: [ret.lon, ret.lat],
                name: "我的位置"
              });
            } else {
              _this.$toast(err.code);
            }
          }
        );
      }
    },

    getposition1() {
      let _this = this;

      if (typeof api != undefined) {
        var bMap = api.require("aMap");
        bMap.getLocation(function(ret, err) {
        //   _this.$toast(JSON.stringify(ret));
          if (ret.status) {
            _this.locations.push({
              position: [ret.lon, ret.lat],
              name: "我的位置"
            });
          } else {
            _this.$toast(err.code);
          }
        });
      }
    },

    onSearch() {
      let _this = this;
      _this.$toast("2222");
      _this.locations = [];
      _this.getposition();
      dituService
        .search({ key: _this.searchvalue })
        .then(res => {
          _this.$toast(JSON.stringify(res));
          if (res.code == 2) {
            res.data.map(item => {
              _this.locations.push({
                position: [item.longitude, item.latitude],
                name: item.name
              });
            });
          }
        })
        .catch(res => {
          _this.$toast(JSON.stringify(res));
        });
    },

    test() {
      // let timestamp = new Date().getTime()
      // let newDate = new Date()
      // newDate.setTime(timestamp)
      // let res =  newDate.toLocaleString()

      // console.log(res);

      // api.alert({
      //     title: 'testtitle',
      //     msg: 'testmsg',
      // }, function(ret, err) {

      // });

      // api.notification({
      //     sound:'default',
      //     notify: {
      //     title: '通知标题',
      //         content: '通知内容'
      //     }
      // });

      let localconfig = localStorage.getItem("localconfig");

      console.log(localconfig == null);
    },

    find() {
      this.$router.push("add_record?type=shoudong");
    },

    openscan() {
      let _this = this;

      if (typeof api == "undefined") {
        let info =
          '{"categoryCode":"COVIJCQ","categoryName":"CO/VI检测器","code":"000001YRKCOVI","name":"右洞入口段CO/VI检测器","sectionCode":"CU1X1Q5","sectionName":"实验室隧道一"}';
        _this.$router.push(`add_record?info=${info}&type=saoma`);
        return;
      }

      var FNScanner = api.require("FNScanner");
      FNScanner.open(
        {
          autorotation: true
        },
        function(ret, err) {
          if (ret && ret.eventType == "success") {
            if (!_this.checkscanjson(ret.content)) {
              _this.$toast("二维码内容错误");
              return;
            }

            let info = ret.content;
            // let info = '{"categoryCode": "COVIJCQ","categoryName": "CO/VI检测器","code": "001001YCKCOVI","name": "CO/VI检测器YCKCOVI","sectionCode": "CU4933Y","sectionName": "西簧隧道"}'
            _this.$router.push(`add_record?info=${info}&type=saoma`);
          } else {
            if (err != "") {
              _this.$toast("扫码失败" + JSON.stringify(err));
            }
          }
        }
      );
    },

    checkscanjson(content) {
      if (!this.$isJSON(content)) {
        return false;
      }

      let con_json = JSON.parse(content);
      let res = true;
      this.scankeys.map(item => {
        if (con_json[item] == undefined) {
          res = false;
        }
      });
      return res;
    }
  }
};
</script>

<style lang="scss" scoped>
.xunjian_col {
  text-align: center;
}

.xunjiantabbar {
  .van-nav-bar__title {
    color: black;
    margin-top: 2px;
  }
}

.xunjiancard {
  margin: 5px;
  background-color: white;
  padding: 10px;
}

.xunjiancardsd {
  margin: 5px 0px 0px 0px;
  background-color: white;
  padding: 10px;
}

.xunjiancardsd1 {
  margin: 0px 0px 5px 0px;
  background-color: white;
  padding: 10px;
}

.zxndemo {
  //   height: 100%;
  height: calc(100vh - 146px);
}
</style>
