<template>
	<view class="login-page" :style="{height:windowHeight}">
		<button open-type="getUserInfo" lang="zh_CN"  @getuserinfo="getUserInfoBtn" class="loginInfoBtnS">
			<!-- <view class="loginBox">
				
			</view> -->
			<view class="iconfont IUicon-weixinfang"></view>
			<view class="loginInfoBtnS_txt">
				欢迎登录小仙世界
			</view>
			
			
	 </button>
	 <view class="detailText">
	 	<view class="detailText_tit">
	 		小仙世界规则
	 	</view>
	 	<view class="detailText_txt">
	 		1. 小仙世界一旦开启将不会结束
	 	</view>
	 	<view class="detailText_txt">
	 		2. 身份权限只能开启一次，永久记录你的唯一身份验证
	 	</view>
	 	<view class="detailText_txt">
	 		3. 小仙世界的主旨是为了爱与相伴，请认真对待进入生活的每一天
	 	</view>
	 </view>
	</view>
</template>


<script src="@/assets/js/index.js"></script>

<style scoped>
	@import url('@/assets/css/index.css');	
</style>
