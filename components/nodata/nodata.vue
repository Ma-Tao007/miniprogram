<template>
	<view class="nonedata">
		<image src="../../static/nodata.png" mode="widthFix"></image>
		<text>暂无数据</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.nonedata{
		margin-top: 200upx;
		text-align: center;
	}
	.nonedata image{
		width: 200upx;
		height: 200upx;
	}
	.nonedata text{
		display: block;
		font-size: 30upx;
		color: rgb(153,153,153);
	}
</style>
