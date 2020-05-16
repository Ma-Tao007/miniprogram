<template>
	<view>{{option}}
	
		sda
	</view>
</template>

<script>
	export default {
		components: {
			// uniLoadMore
		},
		data() {
			return {
				courseList:courseList,
			}
		},
		onLoad: function(option) {
			
			
		},
		onShow() {
			console.log("数组",uni.getStorageSync('course'))
		},
		methods: {
			
		}
	}
</script>

<style>
</style>
