
const BASE_URL = "https://xcx.cimeec.com//mxshop"
// const BASE_URL = "http://j5gff9.natappfree.cc//mxshop"
//wxdf8604156199fc5e   服务器
//wx53f429bcff7189d6  hyl
//wxfd304748e109dadb  mt
//测试账号：15091224866

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

