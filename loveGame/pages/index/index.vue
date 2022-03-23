<template>
	<view class="login-page">
		<button open-type="getUserInfo" lang="zh_CN"  @getuserinfo="getUserInfoBtn" class="loginInfoBtnS">
			<!-- <image :src="globalUrl + 'weixinLogin.png'" mode="" class="loginInfoBtnS_img"></image> -->
			<icon type="IUicon-weixinfang" size="26"/>
			<!-- <image src="http://hbhb-develop-bucket.oss-cn-hangzhou.aliyuncs.com/cloudStore/v16Login.png" mode="" class="loginInfoBtnS_img"></image> -->
			<view class="loginInfoBtnS_txt">
				微信一键登录
			</view>
	 </button>
	</view>
</template>


<script src="@/assets/js/index.js"></script>

<style scoped>
	@import url('@/assets/css/index.css')	
</style>
