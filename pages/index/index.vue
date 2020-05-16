<template>
	<view class="content">
		<view style='text-align: center; height: 50%;margin-bottom: 40px;'>
			 <image class="logo" mode="aspectFit" src="/static/logo1.png"></image><br>
			
		</view>
		<form @submit="login">
			<view class="myno">
				<!-- 学号 -->
				<view class="weui-cell weui-cell_input form_lable">
					<image class="nameImage" src="../../static/yh.png" ></image>
					<!-- <view class="weui-cell__hd">
			              <view class="weui-label">学号</view>
			          </view> -->
					<view class="weui-cell__bd">
						<s-input ref="uninput" label='false' :pvalue='username||""'  class="weui-input"  @inputValue="getInputValue" placeholder="用户名/手机号" />
					</view>
					
				</view>
			</view>
			<view class="mypwd">
				<!-- 密码 -->
				<view class="weui-cell weui-cell_input form_lable">
					<image class="nameImage" src="../../static/mm.png"></image>
					<!-- <view class="weui-cell__hd">
			              <view class="weui-label">密码</view>
			          </view> -->
					<view class="weui-cell__bd">
						<input class="weui-input" name='password' type="password" :hidden='password=="text"' placeholder="密码" v-model="passwordValue" />
						<input class="weui-input" name='password' type="text" :hidden='password=="password"' v-model="passwordValue" placeholder="密码" />
					</view>
					<image class="show" @click="pass" :hidden='password=="text"' style="width: 20px;height: 20px;" src="../../static/by.png" ></image>
					<image class="show" @click="pass" :hidden='password=="password"' style="width: 20px;height: 20px;" src="../../static/yj.png" ></image>
				</view>
			</view>

			<view class="loginBtnView">
				<button class="loginBtn" :disabled="btnlogin" form-type='submit' :loading="btnlogin">登录</button>
				<!--   -->
			</view>
		</form>
	</view>
</template>

<script>
	const teacherList = [
		{number:20160001,name:'刘教师'},
		{number:20160002,name:'王教师'},
		{number:20160003,name:'20160003'},
		]
	import {hex_md5} from '../../static/js/md5.js'
	import requestUtils from '../../utils/request.js'
	import SInput from '@/components/s-input/s-input.vue'
	export default {
		components:{
			SInput
		},
		data() {
			return {
				password:"password",
				username:'',
				passwordValue:'',
				rempass: false,
				title: 'Hello',
				btnlogin: false,
				teacherList:teacherList
			}
		},
		onShow(){
			// var UserInfo = uni.getStorageSync("UserInfo")
			// this.passwordValue = UserInfo.password
			// this.username = UserInfo.username
			// this.$refs.uninput.setValue(this.username);
			// if(this.username!='' && this.username){
			// 	this.rempass = true
			// }
			console.log("页面加载")
		},
		methods: {
			changePass(rempass){
				this.rempass = !rempass
			},
			getInputValue(value){
				this.username = value
			},
			pass(){
				this.password = (this.password == "password"?"text":"password")
			},
			login(e) {
				this.btnlogin = true
				//判断是否已经输入用户名和密码
				if (!this.username || !this.passwordValue) {
					uni.showToast({
						title: '请输入登录信息',
						icon: 'none'
					})
					this.btnlogin = false
					return
				}
				//判断用户名和密码
				var flag = false
				var flagObj = {}
				for(var i=0;i<this.teacherList.length;i++){
					var teacher = this.teacherList[i]
					if(teacher.number==this.username){
						flag = true;
						flagObj = teacher
						break;
					}
				}
				if(!flag){
					this.btnlogin = false
					uni.showToast({
						title:'用户名不存在',
						icon :'none'
					})
					
					return
				}else{
					if(this.passwordValue!=flagObj.number){
						this.btnlogin = false
						uni.showToast({
							title:'密码错误',
							icon :'none'
						})
						
						return
					}
				}
			
				uni.request({
					url: requestUtils.BASE_URL + "/mine/",
					data: {
						"number": this.username,
						"identity": "pbkdf2_sha256$150000$MvL7Co1rzuxz$rN3c8XYyG7Z+STKFHbMEjuGlJhQPxT6YBTQwMpfvbfI=",
					},
					method:"post",
					success: (res) => {
						console.log(res)
							//返回结果有7个数组，每一个代表一种含义
							//全部存到缓存中通过教师number去存储
							//登录教师信息
							uni.setStorageSync('teacher',flagObj)
							//课程信息
							uni.setStorageSync('coursemessage',res.data[1])
							//知识点
							uni.setStorageSync('knowledge',res.data[2])
							//课程表
							//课程表需要过滤是当前登录教师的
							uni.setStorageSync('course',res.data[3])
							//课件表
							uni.setStorageSync('course_file',res.data[4])
							//课程和教师关联表
							uni.setStorageSync('course_teacher',res.data[5])
							//课程和知识点关联表
							uni.setStorageSync('course_knowledge',res.data[6])
							uni.reLaunch({
											url: '/pages/course/course'
										})
						
							this.btnlogin = false
						
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
			}
		}
	}
</script>

<style>
	/* 引入的weui样式 */
	.weui-cell{
		padding: 16rpx 15px;
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		margin: auto 0px;
	}
	.weui-cell__bd{
		width: 50%;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;

	}
	.weui-input{
		width: 100%;
		border: 0;
		outline: 0;
		-webkit-appearance: none;
		background-color: transparent;
		font-size: inherit;
		color: inherit;
		height: 1.47058824em;
		line-height: 1.47058824;
	}
	/* 记住密码 */
	.repass{
		color: #888888;
	}
	/* 忘记密码 */
	.forgetPass{
		color: #888888;
		float: right;
	}

	/*按钮*/
	.loginBtnView {
		margin-top: 0px;
		margin-bottom: 0px;
		padding-bottom: 0px;
		width: 80%;
		margin: auto;
	}

	.input_bottom {
		width: 80%;
		margin: 20rpx auto;
	}

	.loginBtn {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		margin-top: 20px;
		color: #fff;
		background-color: #7e8ef0;
		border: 0.1rpx solid #ccc;
		border-radius: 40rpx;
	}

	.myno {
		margin-top: 50rpx;
		width: 80%;
		height: 80rpx;
		margin: 0 auto;
		border: 1px solid #ccc;
		border-radius: 50rpx;

	}

	.mypwd {
		width: 80%;
		height: 80rpx;
		margin: 0 auto;
		border: 1px solid #ccc;
		border-radius: 50rpx;
		margin-top: 20rpx;
	}

	.nameImage {
		width: 20px;
		height: 20px;
		margin-right: 10px;
	}

	.tip {
		width: 60%;
		height: 250rpx;
		text-align: center;
		margin: 100rpx auto 20rpx;
		color:#888888;
	}

	.content {

	}

	.logo {
		height: 200upx;
		width: 600rpx;
		margin-top: 100upx;
	}

	.title {
		width: 20%;
		float: left;
		text-align: right
	}

	.submitBtn {
		margin-top: 80upx;
	}
	
</style>
