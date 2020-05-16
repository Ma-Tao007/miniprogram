<template>
	<view style="padding: 15rpx 30rpx;">
		<view v-for="course in courseList" :key="course.course_id">
			<view class='record_contain'>
				<view class="field">
					<view class='key'>课程名称：</view>
					<view class='value'>{{ course.title || '无' }}</view>
				</view>
				<view class="field">
					<view class='key'>上课方式：</view>
					<view class='value'>{{ course.teaching_methods || '无' }}</view>
				</view>
				<view class="field">
					<view class='key'>课程必修：</view>
					<view class='value'>{{ course.required || '无' }}</view>
				</view>
				<view class="field">
					<view class='key'>教学教材：</view>
					<view class='value'>{{ course.teaching_material || '无' }}</view>
				</view>
				<view class="field">
					<view class='key'>课时分配：</view>
					<view class='value'>{{ course.time_allocation || '无' }}</view>
				</view>
				<view style="clear: both;"></view>
				<view style="margin-top: 10px;">
					<view><button type="primary" @tap="showKejian()">显示课件</button></view>
					<view><button type="default" @tap="goBid(course)">显示课程信息</button></view>
				</view>
				
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
				courseList:[],
			}
		},
		onShow() {
			this.courseList = []
			var courses = uni.getStorageSync('course')
			var teacher = uni.getStorageSync('teacher')
			var course_teacher = uni.getStorageSync('course_teacher')
			var course_ss = []
			for(var i=0;i<course_teacher.length;i++){
				if(teacher.number==course_teacher[i].teacher_id){
					course_ss.push(course_teacher[i])
				}
			}
			
			for(var i=0;i<course_ss.length;i++){
				for(var j=0;j<courses.length;j++){
					if(course_ss[i].courese_id==courses[j].course_id){
						this.courseList.push(courses[j])
					}
				}
			}
		},
		methods: {
			goBid(course){
				//通过点击课程跳转，带值跳转
				 uni.navigateTo({
				       // ? 后面加要传的参数， 多个参数用 & 隔开 
				       url: '/pages/coursedetail/coursedetail?courseid='+course.course_id
				    })
			},
			showKejian(){
				uni.navigateTo({
				      // ? 后面加要传的参数， 多个参数用 & 隔开 
				      url: '/pages/courseware/courseware'
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
