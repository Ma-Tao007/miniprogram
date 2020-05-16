<template>
	<view style="padding: 15rpx 30rpx;">
		<view @tap="goBid(course)" v-for="course in courseList" :key="course.course_id">
			<view class='record_contain'>
				<view class="field">
					<view class='key'>课程名称：</view>
					<view class='value'>{{ course.title }}</view>
				</view>
				<view class="field">
					<view class='key'>上课方式：</view>
					<view class='value'>{{ course.teaching_methods }}</view>
				</view>
				<view class="field">
					<view class='key'>课程类型：</view>
					<view class='value'>{{ course.required }}</view>
				</view>
				<view style="clear: both;"></view>
			</view>
		</view>
		
	</view>
</template>

<script>
	var courseList = [
		{course_id:1,title:'数据结构',teaching_methods:'上机',required:'选修'},
		{course_id:2,title:'java开发',teaching_methods:'无',required:'必修'},
		{course_id:3,title:'python',teaching_methods:'上机',required:'选修'}]
		
	export default {
		components: {
			// uniLoadMore
		},
		data() {
			return {
				courseList:courseList,
			}
		},
		destroyed() {
		        uni.removeStorageSync('course');
		    },
		methods: {
			goBid(course){
				//通过点击课程跳转，带值跳转
				 uni.navigateTo({
				       // ? 后面加要传的参数， 多个参数用 & 隔开 
				       url: '/pages/coursedetail/coursedetail'
				    })
					//需要传的参数
					uni.setStorageSync('course', course);
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
		width: 30%;
		float: left;
		margin-top:4px;
		font-weight:$uni-font-weight;
	}
	.value{
		float: right;
		width: 65%;
		margin-top:4px
	}
</style>
