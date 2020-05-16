
const BASE_URL = "http://qguasf.natappfree.cc"
//配置前端请求拦截
export default {BASE_URL}

export const request = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_URL+options.url,//地址
			method:options.method || 'GET',//请求方式,默认get
			data:options.data || {},
			header:{
				Cookie:uni.getStorageSync("SESSION") || "",
				'content-type':options.dataType||"application/json"
			},//请求头
			success:(res)=>{
				// //获取数据失败
				// if(!res.data.success){
				// 	return uni.showToast({
				// 		title:'获取数据失败'
				// 	})
				// }
				//成功就返回
				resolve(res)
			},
			//接口失败
			fail:(err)=>{
				uni.showToast({
					title:'请求接口失败',
					icon :'none'
				})
				reject(err)
			}
		})
	})
}

