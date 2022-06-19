<template>
	<view class="">
		
		<view class="wardRingView" :style="{height:swiperHeight}" >
				<!-- <image :src="globalUrl+ 'privateImg_42.png'"  mode="" class="wardRingViewTit"></image> -->
				<view class="wardRingViewTxt">
					快来试试你的手气吧～
				</view>
				<view class="wardRingViewRing">
					<view class="wardRingViewRingBox">
						<image src="https://7463-tcb-ermyacvce0236c-5dyig4816a0e4-1310385595.tcb.qcloud.la/iuDcloud/privateImg_44.png"  mode="" class="wardRingViewRingBox_a" :style="{
		
		transform: `rotate(${canvasAngle + targetAngle}deg)`,
		transitionDuration: `${transitionDuration}s`
		}"></image>
						<view class="wardRingViewRingBox_b">
							<image src="https://7463-tcb-ermyacvce0236c-5dyig4816a0e4-1310385595.tcb.qcloud.la/iuDcloud/privateImg_45.png"  mode="" class="wardRingViewRingBox_bIm1"></image>
							<image src="https://7463-tcb-ermyacvce0236c-5dyig4816a0e4-1310385595.tcb.qcloud.la/iuDcloud/privateImg_47.png"  mode="" class="wardRingViewRingBox_bIm2"></image>
						</view>
					</view>
					<image src="https://7463-tcb-ermyacvce0236c-5dyig4816a0e4-1310385595.tcb.qcloud.la/iuDcloud/privateImg_46.png"  mode="" class="wardRingViewBtn" @click="handleActionStart"></image>
				</view>
			</view>
		
		<!-- 奖品展示 -->
		<view class="wardView" :style="{height:swiperHeight}" v-if="wardResult">
			<!-- 五元优惠券 -->
			<image v-if="targetIndex == 1 || targetIndex == 5" :src="globalUrl+ 'privateImg_36.png'"  mode="" class="wardViewOne"></image>
			<!-- 八元优惠券 -->
			<image v-if="targetIndex == 3" :src="globalUrl+ 'privateImg_37.png'"  mode="" class="wardViewOne"></image>
			<!-- 十元优惠券 -->
			<image v-if="targetIndex == 7" :src="globalUrl+ 'privateImg_38.png'"  mode="" class="wardViewOne"></image>
			<!-- 毛巾 -->
			<view class="wardViewTwo" v-if="targetIndex == 4">
				<image @click="goAddAreaBtn(5,'毛巾')" :src="globalUrl+ 'privateImg_41.png'"  mode="" class="wardViewTwo_a"></image>
			</view>
			<!-- 保温杯 -->
			<view class="wardViewThree" v-if="targetIndex == 0">
				<image @click="goAddAreaBtn(1,'保温杯')" :src="globalUrl+ 'privateImg_41.png'"  mode="" class="wardViewTwo_a"></image>
			</view>
			<!-- 谢谢惠顾 -->
			<view class="wardViewFour" v-if="targetIndex == 2">
				<image @click="goCloseWardBtn(2,'谢谢')" :src="globalUrl+ 'privateImg_53.png'"  mode="" class="wardViewTwo_a"></image>
			</view>
		</view>
		
		
		
		
	</view>
	
</template>

<script src="@/assets/js/luckDraw.js">
</script>

<style>
	@import url('@/assets/css/luckDraw.css');
</style>