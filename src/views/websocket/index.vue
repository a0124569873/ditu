<template>
  <div>

  </div>
</template>

<script>

import config from '../config'
import errcode from './errcode'

export default {
  data() {
	return {
	  websock: null,
	  wsbaseurl: ''
	};
  },
  created() {
	//页面刚进入时开启长连接
	this.wsbaseurl = config.wsbaseurl
	this.initWebSocket();
	
  },
  destroyed: function() {
	//页面销毁时关闭长连接
	this.websocketclose();
  },
  methods: {
	initWebSocket() {
	  //初始化weosocket
	  const wsuri = this.wsbaseurl + "websocket/1"; //ws地址

	  this.websock = new WebSocket(wsuri);
	  this.websock.onopen = this.websocketonopen;
	  this.websock.onerror = this.websocketonerror;
	  this.websock.onmessage = this.websocketonmessage;
	  this.websock.onclose = this.websocketclose;

	},

	websocketonopen() {
	  console.log("WebSocket连接成功");
	},
	websocketonerror(e) {
	  //错误
	  console.log("WebSocket连接发生错误");
	},
	websocketonmessage(e) {
		let received_msg = e.data
	  //数据接收
	  //注意：长连接我们是后台直接1秒推送一条数据，
	  //但是点击某个列表时，会发送给后台一个标识，后台根据此标识返回相对应的数据，
	  //这个时候数据就只能从一个出口出，所以让后台加了一个键，例如键为1时，是每隔1秒推送的数据，为2时是发送标识后再推送的数据，以作区分
	//   if(){
		if(received_msg != "连接成功" && received_msg != "error") {
			let data = JSON.parse(received_msg)
			if(data.directive == "deviceAlarm"){
				// console.log(JSON.stringify(data));
				if(data.data.errMsg == undefined) {
					data.data.errMsg = "故障已恢复";
				}
				
				let errorMessage = data.data.sectionName + "-" + data.data.name + "-"  + data.data.errMsg;

				if (errcode[data.data.errMsg] != undefined) {
					errorMessage += ('<br/>' + errcode[data.data.errMsg])
				}else{
					errorMessage += ('<br/>' + '未找到解决方案')
				}

				if ((typeof api) != 'undefined'){

					api.notification({
						sound:'default',
						notify: {
							title: '故障告警',
							content: errorMessage
						}
					});

					// api.notification();

				}
				

				// this.$dialog.alert({
				// 	message: errorMessage
				// })

				let warn = localStorage.getItem("warnrecord")

				if(warn == null){
					warn = '{}'
				}

				let timestamp = new Date().getTime()

				let warn_json = JSON.parse(warn)

				warn_json[timestamp] = {timestamp: timestamp, msg : errorMessage, name: data.data.name}

				let warn_str = JSON.stringify(warn_json)

				localStorage.setItem("warnrecord", warn_str)

			}
		}

	//   }

	},

	websocketsend(agentData) {
	  //数据发送
	  this.websock.send(agentData);
	},

	websocketclose(e) {
	  //关闭
	  console.log("connection closed (" + e + ")");
	}
  }
};
</script>