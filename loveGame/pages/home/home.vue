<template>
	<view class="home-page" :style="{height:windowHeight}">
	
		<view class="homeOne">
			<image src="https://7463-tcb-ermyacvce0236c-5dyig4816a0e4-1310385595.tcb.qcloud.la/iuDcloud/home_1.png" mode="" class="homeHeader"></image>
			<view class="homeInfo">
				<view class="homeInfo_h">
					<image :src="myInfo.headUrl" mode="" class="homeInfo_hC" @click="takeEditorBtn"></image>
				</view>
				<view class="homeInfo_name">
					{{myInfo.nickName}}
				</view>
				<view class="homeInfo_ti">
					欢迎进入小仙娱乐世界
				</view>
				<view class="homeInfo_ce">
					<view class="homeInfo_ceI">
						<view class="homeInfo_ceINum">
							{{userXiandou.xiandou}}
						</view>
						<view class="homeInfo_ceITxt">
							我的仙豆
						</view>
					</view>
					<view class="homeInfo_ceLine"></view>
					<view class="homeInfo_ceI">
						<view class="homeInfo_ceINum">
							{{userXiandou.exchangeNum}}
						</view>
						<view class="homeInfo_ceITxt">
							我的兑换
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="homeTwo">
			<view class="homeTwoTit">
				娱乐中心
			</view>
			<view class="homeTwoLi">
				<view class="homeTwoLiIt" @click="goExchangeBtn">
					<view class="homeTwoLiIt_img  IUt-icon-duihuan">
						
					</view>
					<view class="homeTwoLiIt_txt">
						兑换中心
					</view>
				</view>
				<view class="homeTwoLiIt" @click="goLuckDrawBtn">
					<view class="homeTwoLiIt_img IUt-icon-zhuanpanshezhi">
						
					</view>
					<view class="homeTwoLiIt_txt">
						抽奖中心
					</view>
				</view>
				<view class="homeTwoLiIt">
					<view class="homeTwoLiIt_img IUt-icon-dazhuanpan">
						
					</view>
					<view class="homeTwoLiIt_txt">
						节日福利
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="homeThree">
			<view class="homeTwoTit">
				天气小贴士
			</view>
			<view class="homeTwoB">
				<view class="homeTwoBL">
					<view class="homeTwoBLImg">
						<view class="homeTwoBLImg_1" :class="weatherInfo.icon">
							
						</view>
						<view class="homeTwoBLImg_2">
							{{weatherInfo.todayWe}} ({{weatherInfo.currentTem}}℃)
						</view>
					</view>
					<view class="homeTwoBLTxt">
						<view class="homeTwoBLTxt_time">
							{{weatherInfo.todayDate}}
						</view>
						<view class="homeTwoBLTxt_wendu">
							{{weatherInfo.temperature}}
						</view>
						<view class="homeTwoBLTxt_tps">
							{{weatherInfo.tips}}
						</view>
					</view>
				</view>
				
			</view>
		</view>
		
		<!-- 修改头像弹窗 -->
		<view class="editorHead" v-if="editorHeadShow" :style="{height:windowHeight}">
			<view class="editorHeadCe">
				<view class="editorHeadCeTop">
					请完善个人信息
				</view>
				<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
				  <image class="avatar" :src="avatarUrl"></image>
				</button> 
				<view class="editorHeadCeIn">
					<view class="editorHeadCeInTit">
						昵称
					</view>
					<input type="nickname" class="weui-input" placeholder="请输入昵称"/>
				</view>
				<view class="editorHeadCeBot">
					<view class="editorHeadCeBotL" @click="takeCancelBtn">
						取消
					</view>
					<view class="editorHeadCeBotR" @click="takeSureBtn">
						确认修改
					</view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script src="@/assets/js/home.js">
</script>

<style>
	@import url('@/assets/css/home.css');
</style>