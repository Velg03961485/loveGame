<template>
	<view class="exchange-page">
		
		<view class="exchangeIt" v-for="(item,index) in exchangeData" :key="index">
			<image :src="imgData[item.image]" mode="aspectFill" class="exchangeItImg"></image>
			<view class="exchangeItDe">
				{{item.desc}}
			</view>
			<view class="exchangeItBtn">
				<view class="exchangeItBtnL">
					{{item.exchangeNum}}仙豆
				</view>
				<view class="exchangeItBtnR">
					兑换
				</view>
			</view>
		</view>
		
	</view>
</template>

<script src="@/assets/js/exchange.js">
</script>

<style>
	@import url('@/assets/css/exchange.css');
</style>