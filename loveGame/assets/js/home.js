
import weatherData from "@/pages/home/weatherData.json"

    export default {
        name: "index",
      data(){
          return{
				globalUrl:'http://hbhb-develop-bucket.oss-cn-hangzhou.aliyuncs.com/cloudStore/',
				windowHeight:'',
				myInfo:{
					nickName:'',
					headUrl:'',
				},
				adaptation: false,
				
				areaId:'',
				weatherInfo:{},
				weatherData:weatherData,
          }
      },
	  onShow(){
	  		  /* setTimeout(function() {
	  		  	wx.showTabBar();
	  		  }, 500) */
			  // this.$data.adaptation = this.signAdaptation();
			  console.log(this.$data.adaptation)
			  this.areaId = uni.getStorageSync('areaId')
	  },
	  onLoad() {
			  uni.getSystemInfo({
				success:  (res) => {     // 需要使用箭头函数，swiper 高度才能设置成功
					// 获取windowHeight可以获取的高度，窗口高度减去导航栏高度
					console.log(res)
					this.windowHeight = res.windowHeight  + 'px'
					console.log(this.windowHeight)
				
				}
			  });
			this.getweatherInfo();
			let _this = this;
			uni.getUserInfo({
			  provider: 'weixin', 
			  success: function (infoRes) {
				  console.log(infoRes.userInfo);
				_this.$data.myInfo.nickName = infoRes.userInfo.nickName;
				_this.$data.myInfo.headUrl = infoRes.userInfo.avatarUrl;
			  },
			 
			});
			console.log(this.weatherData)
	
	  },
      created() {

      },
      methods:{


			// 个人信息
			goMyInfoBtn(){
				let openId = uni.getStorageSync('openId');
				if(openId === '' || openId === null || openId === undefined){
					// 这时候需要用户重新登录
					uni.reLaunch({
					    url: '/pages/login/login'
					});
					return;
				}else{
					uni.navigateTo({
					    url: '../my/myInfo'
					});
				}
				
			},
			
			// 获取天气预报
			getweatherInfo(){
				uni.request({
					url: 'http://wthrcdn.etouch.cn/weather_mini?city=杭州',
					method: 'GET',
					success: res => {
						// console.log(res)
						// console.log(res.data.data.forecast[0])
						// console.log("今天的天气",res.data.data.forecast[0].type);
						// console.log("今天最高温度",res.data.data.forecast[0].high);
						// console.log("今天最低温度",res.data.data.forecast[0].low);
						// console.log("目前气温",res.data.data.wendu);
						let exchangeInfo = this.takePassWeather(res.data.data.forecast[0].type);
						console.log(exchangeInfo)
						this.weatherInfo = {
							todayDate:res.data.data.forecast[0].date,
							todayWe:res.data.data.forecast[0].type,
							temperature:res.data.data.forecast[0].low + '~' + res.data.data.forecast[0].high,
							currentTem:res.data.data.wendu,
							tips:res.data.data.ganmao,
							icon:exchangeInfo.icon,
						};
						console.log(this.weatherInfo)
						// console.log(this.takePassWeather(this.weatherInfo.todayWe))
						
						// console.log("明天的天气",res.data.data.forecast[1].type);
						// console.log("明天最高温度",res.data.data.forecast[1].high);
						// console.log("明天最低温度",res.data.data.forecast[1].low);
					},
					fail: () => {
						this.openmsg("警告","天气接口获取失败")
					},
					complete: () => {}
				});
			},
			
			// 通过json数据查找 当天的天气信息
			takePassWeather(val){
				let queryData = [];
				queryData = this.weatherData.filter(function (data) {
					return data.name == val
				});
				return queryData[0];
			},

			// 抽奖中心
			goLuckDrawBtn(){
				uni.navigateTo({
				    url: '/pages/home/luckDraw'
				});
				
			},
			
			// 兑换中心
			goExchangeBtn(){
				uni.navigateTo({
				    url: '/pages/home/exchange'
				});
			},
			

      }
    }