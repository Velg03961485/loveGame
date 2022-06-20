<template>
	<view class="">
		
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item>
					<view class="swiper-item">
						<image class="swiperImg" src="https://7463-tcb-ermyacvce0236c-5dyig4816a0e4-1310385595.tcb.qcloud.la/iuDcloud/swp_3.jpeg" mode="aspectFill"></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image class="swiperImg" src="https://7463-tcb-ermyacvce0236c-5dyig4816a0e4-1310385595.tcb.qcloud.la/iuDcloud/swp_2.jpeg" mode="aspectFill"></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image class="swiperImg" src="https://7463-tcb-ermyacvce0236c-5dyig4816a0e4-1310385595.tcb.qcloud.la/iuDcloud/swp_1.jpeg" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="taskList" :style="{height:listHeight}">
			
			<view class="taskItem" v-for="(item,index) in taskData" :key="index" @click="takeOverBtn(item,index)">
				<view class="taskItemOne">
					<view class="taskItemOne_1" :class="item.taskClass"></view>
					<view class="taskItemOne_2">
						{{item.taskName}}
					</view>
					<view class="taskItemOne_2">
						({{item.taskScore}}
						<view class="taskItemOne_3 IUt-icon-shiwutubiao-39-copy"></view>
						)
					</view>
				</view>
				<view class="taskItemTwo">
					任务描述:{{item.taskDetail}}
				</view>
				<view class="taskItemThree">
					<view class="taskItemThreeL">任务时间：{{item.taskTime}}</view>
					<view class="taskItemThreeR" :class="item.taskIsOver == 1 ? 'IUt-icon-checked' : ''">
						
					</view>
				</view>
			</view>
			
		</view>
		
		
	</view>
</template>

<script src="@/assets/js/task.js">
</script>

<style>
	@import url('@/assets/css/task.css');
</style>