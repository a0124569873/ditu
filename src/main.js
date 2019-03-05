// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//引入vue和vuerouter
import Vue from 'vue'
import App from './App'
import router from './router'

//引入vant框架
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

//引入全局axios
import axios from 'axios'
Vue.prototype.$http = axios

//注册svg-icon-font组件
import '@/assets/iconfont/iconfont'
import IconSvg from "./components/common/IconSvg.vue"; // svg组件
Vue.component("icon-svg", IconSvg);

//引入底栏组件
import BottomBar from "./components/common/BottomBar.vue"
Vue.component("bottom-bar", BottomBar);

//引入全局过滤器
import * as filters from "./filters/index"; // 全局过滤器
// 注册全局实用程序过滤器（register global utility filters）.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

//引入全局样式
import './assets/theme/index.scss'

Vue.config.productionTip = false

/**
 * 生成随机数字
 * @param {*} min 最小边界
 * @param {*} max 最大边界
 */
function randomNum(min,max){ 
  switch(arguments.length){ 
      case 1: 
          return Math.floor(Math.random()*minNum+1); 
      break; 
      case 2: 
          return Math.floor(Math.random()*(max-min+1)+min); 
      break; 
          default: 
              return 0; 
          break; 
  } 
}
Vue.prototype.$RN = randomNum

/**
 * 修改time格式 node环境会返回 24小时制 浏览器环境会返回 12小时制
 * @param {*} timestamp 
 */
function formattime(timestamp) {
    let newDate = new Date()
    newDate.setTime(timestamp)
    let res = newDate.toLocaleString()
    if (res.includes("下午")) {
        let finres = res.replace("下午", '')
        let finres_arr = finres.split(" ")
        let timee = finres_arr[1].split(":")
        timee[0] = (Number(timee[0]) + 12) + ''
        finres_arr[1] = timee.join(":")
        res = finres_arr.join(" ")
    }else{
        res = res.replace("上午", '')
    }
    return res
}
Vue.prototype.$FT = formattime

/**
 * 判断字符串是否为json
 * @param {*} str 
 */
function isJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj=JSON.parse(str);
            if(typeof obj == 'object' && obj ){
                return true;
            }else{
                return false;
            }

        } catch(e) {
            console.log('error：'+str+'!!!'+e);
            return false;
        }
    }
    console.log('It is not a string!')
}
Vue.prototype.$isJSON = isJSON

// 引入vue-amap
import AMap from 'vue-amap';
Vue.use(AMap);

// 初始化vue-amap
AMap.initAMapApiLoader({
  // 申请的高德key
  key: 'zxn-123456',
  // 插件集合
  plugin: ['']
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
