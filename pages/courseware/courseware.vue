<template>
	<view style="padding: 15rpx 30rpx;">
		<view v-for="cour in course_ss" :key="cour.teacher_id">
			<view class='record_contain'>
				<view class="field">
					<view class='key'>课件名称：</view>
					<view class='value'>{{ cour.name || '无' }}</view>
				</view>
				<view class="field">
					<view class='key'>课件大小：</view>
					<view class='value'>{{ cour.size || '无' }}</view>
				</view>
				<view class="field">
					<view class='key'>下载次数：</view>
					<view class='value'>{{ cour.download_num || 0 }}</view>
				</view>
				<view class="field">
					<view class='key'>合并次数：</view>
					<view class='value'>{{ cour.merge_nums || 0 }}</view>
				</view>
				<view class="field">
					<view class='key'>文件下载：</view>
					<view class='value' @click="downFile(cour.file)">下载</view>
				</view>
				<view style="clear: both;"></view>
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
				course_ss:[],
			}
		},
		onShow() {
			this.course_ss = []
			var coursefiles = uni.getStorageSync('course_file')
			var teacher = uni.getStorageSync('teacher')
			var course_file = []
			for(var i=0;i<coursefiles.length;i++){
				if(teacher.number==coursefiles[i].teacher_id){
					this.course_ss.push(coursefiles[i])
				}
			}
			console.log("文件:",this.course_ss)
		},
		methods: {
			downFile(url){
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
	.record_contain{
		color: #606266;
	}
	.record_contain{
		border: 1px solid #C0C0C0;
		border-radius: 10rpx;
		padding:20rpx;
		margin: 10rpx;
	}
	.field{
		/* margin-top: 15rpx; */
		font-size: 32rpx;
	}
	.key{
		width: 25%;
		float: left;
		margin-top:4px;
		font-weight:$uni-font-weight;
	}
	.value{
		float: right;
		width: 70%;
		margin-top:4px
	}
</style>
