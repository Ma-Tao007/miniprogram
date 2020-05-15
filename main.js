import Vue from 'vue'
import App from './App'
import { request } from './utils/request.js'
   
	

//全局定义
Vue.prototype.$request = request


Date.prototype.format = function(num) {
	let date = new Date(num);
	//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	let y = date.getFullYear();
	let MM = date.getMonth() + 1;
	MM = MM < 10 ? ('0' + MM) : MM; //月补0
	let d = date.getDate();
	d = d < 10 ? ('0' + d) : d; //天补0
	let h = date.getHours();
	h = h < 10 ? ('0' + h) : h; //小时补0
	let m = date.getMinutes();
	m = m < 10 ? ('0' + m) : m; //分钟补0
	let s = date.getSeconds();
	s = s < 10 ? ('0' + s) : s; //秒补0
	return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
}


Vue.filter('formatter', function (value,fileName,record) {
	// console.log("#####",record)
	if(fileName.formatter){		
		return fileName.formatter(value,record)
	}  
  return value
})
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
