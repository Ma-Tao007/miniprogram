<template>
	<view class="content">
		<view style='text-align: center; height: 50%;margin-bottom: 40px;'>
			<image class="logo" mode="aspectFit" src="/static/ynlogo01.png"></image><br>
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
			<view class='input_bottom'>
				<label class='repass'  @click="changePass(rempass)">
					<checkbox class='checkbox' style="transform:scale(0.8)" :checked="rempass"/>记住用户名
				</label>
				<label @click="playPhone()" class='forgetPass'>
					忘记密码
				</label>
			</view>

			<view class="loginBtnView">
				<button class="loginBtn" :disabled="btnlogin" form-type='submit' :loading="btnlogin">登录</button>
				<!--   -->
			</view>
		</form>
	</view>
</template>

<script>
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
				btnlogin: false
			}
		},
		onShow(){
			var UserInfo = uni.getStorageSync("UserInfo")
			this.passwordValue = UserInfo.password
			this.username = UserInfo.username
			this.$refs.uninput.setValue(this.username);
			if(this.username!='' && this.username){
				this.rempass = true
			}
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
				uni.request({
					url: requestUtils.BASE_URL + "/login/login.do",
					data: {
						"mobile": this.username,
						"password": hex_md5(this.passwordValue),
						"ValCode": '1234',
						"kind": "1"
					},
					success: (res) => {
						if (res.data.success) {
							uni.setStorageSync('SESSION', res.header["Set-Cookie"].split(";")[0]);
							//在跳转之前询问是否记住密码
							if (this.rempass) {
								//这里将登录信息存到缓存中
								uni.setStorageSync('UserInfo', {username:this.username,password:this.passwordValue});
							}
							uni.reLaunch({
								url: '/pages/waitoffer/waitoffer'
							});

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
							this.btnlogin = false
						}
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
