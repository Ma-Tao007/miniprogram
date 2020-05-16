<template>
	<view>
	<view>
		<view class='tab_bar' v-for="coursemessage in coursemessages">
			<view class='tab'>{{coursemessage.name}}</view>
			<view class='tab' @click="downFile(coursemessage.outline)">课程大纲</view>
			<view class='tab' @click="downFile(coursemessage.plan)">教学实施计划</view>
			<view class='tab' @click="downFile(coursemessage.name)">版本内容</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		components: {
			// uniLoadMore
			
		},
		data() {
			return {
				coursemessages:[],
				courseid:0,
			}
		},
		onLoad: function(option) {
			this.coursemessages = []
			this.courseid = option.courseid;
			//课程信息
			var coursemessages = uni.getStorageSync('coursemessage')
			//找到对应的课程信息
			for(var i=0;i<coursemessages.length;i++){
				if(coursemessages[i].course_id==this.courseid){
					this.coursemessages.push(coursemessages[i])
				}
			}
			console.log("课程信息",this.coursemessage)
		},
		methods: {
			downFile(url){
				// const downloadTask = uni.downloadFile({
				// 			url: url, //仅为示例，并非真实的资源
				// 			success: (res) => {
				// 				if (res.statusCode === 200) {
				// 					console.log('下载成功');
				// 				}
				// 				let that = this;
				// 				uni.saveFile({
				// 					tempFilePath: res.tempFilePath,
				// 						success: function(red) {
				// 							that.luj = red.savedFilePath
				// 							console.log(red)
				// 						}
				// 					});
				// 				}
				// 			});
				
				// 			downloadTask.onProgressUpdate((res) => {
				// 				console.log('下载进度' + res.progress);
				// 				console.log('已经下载的数据长度' + res.totalBytesWritten);
				// 				console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
				// 		});
				uni.downloadFile({
				        url: 'http://qguasf.natappfree.cc/media/'+url,
				        header: {},
				        success: function(res) {
				            var filePath = res.tempFilePath;
				            console.log(filePath);
				            uni.openDocument({
				                filePath: filePath,
				                success: function(res) {
				                    console.log('打开文档成功')
				                },
				                fail: function(res) {
				                    console.log(res);
				                },
				                complete: function(res) {
				                    console.log(res);
				                }
				            })
				        },
				        fail: function(res) {
				            console.log(url);
				            console.log('文件下载失败');
				        },
				        complete: function(res) {},
				    })
			}	
		}
	}
</script>

<style scoped>
	.tab{
		width: 100%;
		text-align: center;
		margin-top: 10px;
		margin-bottom: 20px;
	}
	.tab_bar{
		border: 1px #C0C0C0 solid;
		width: 80%;
		margin: auto;
		margin-top: 10px;
		margin-bottom: 10px;
	}
</style>
