
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
				
				token:'',
				userXiandou:{
					xiandou:0,
					exchangeNum:0,
				},
          }
      },
	  onShow(){
	  		
			this.getCurrentUserInfo();
	  },
	  onLoad() {
		  this.$data.token = uni.getStorageSync('token');
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

			// 获取当前用户的仙豆和兑换数据
			getCurrentUserInfo(){
				if(this.$data.token == '' || !this.$data.token){
					
				}else{
					uniCloud.callFunction({
					    name: 'update_xiandou',
					    data: { 
							token:this.token,
						}
					  })
					  .then(res => {
							uni.hideLoading();
							console.log(res)
							let Data = res.result.data;
							this.userXiandou = Data;
						});
				}
				
			},
			
			
			// 获取天气预报
			getweatherInfo(){
				
				uniCloud.callFunction({
				    name: 'post_api_function',
				    data: { 
						data:{
							city:'杭州'
						},
						apiUrl:'http://wthrcdn.etouch.cn/weather_mini',
					}
				  })
				  .then(res => {
						
						
						let Data = res.result;
						// console.log(res.result)
						// console.log(res.data.data.forecast[0])
						// console.log("今天的天气",res.data.data.forecast[0].type);
						// console.log("今天最高温度",res.data.data.forecast[0].high);
						// console.log("今天最低温度",res.data.data.forecast[0].low);
						// console.log("目前气温",res.data.data.wendu);
						let exchangeInfo = this.takePassWeather(Data.data.data.forecast[0].type);
						// console.log(exchangeInfo)
						this.weatherInfo = {
							todayDate:Data.data.data.forecast[0].date,
							todayWe:Data.data.data.forecast[0].type,
							temperature:Data.data.data.forecast[0].low + '~' + Data.data.data.forecast[0].high,
							currentTem:Data.data.data.wendu,
							tips:Data.data.data.ganmao,
							icon:exchangeInfo.icon,
						};
						console.log(this.weatherInfo)
						// console.log(this.takePassWeather(this.weatherInfo.todayWe))
						
						// console.log("明天的天气",res.data.data.forecast[1].type);
						// console.log("明天最高温度",res.data.data.forecast[1].high);
						// console.log("明天最低温度",res.data.data.forecast[1].low);
						
					});
				
				
				// uni.request({
				// 	url: 'https://wthrcdn.etouch.cn/weather_mini?city=杭州',
				// 	method: 'GET',
				// 	success: res => {
				// 		// console.log(res)
				// 		// console.log(res.data.data.forecast[0])
				// 		// console.log("今天的天气",res.data.data.forecast[0].type);
				// 		// console.log("今天最高温度",res.data.data.forecast[0].high);
				// 		// console.log("今天最低温度",res.data.data.forecast[0].low);
				// 		// console.log("目前气温",res.data.data.wendu);
				// 		let exchangeInfo = this.takePassWeather(res.data.data.forecast[0].type);
				// 		console.log(exchangeInfo)
				// 		this.weatherInfo = {
				// 			todayDate:res.data.data.forecast[0].date,
				// 			todayWe:res.data.data.forecast[0].type,
				// 			temperature:res.data.data.forecast[0].low + '~' + res.data.data.forecast[0].high,
				// 			currentTem:res.data.data.wendu,
				// 			tips:res.data.data.ganmao,
				// 			icon:exchangeInfo.icon,
				// 		};
				// 		console.log(this.weatherInfo)
				// 		// console.log(this.takePassWeather(this.weatherInfo.todayWe))
						
				// 		// console.log("明天的天气",res.data.data.forecast[1].type);
				// 		// console.log("明天最高温度",res.data.data.forecast[1].high);
				// 		// console.log("明天最低温度",res.data.data.forecast[1].low);
				// 	},
				// 	fail: () => {
				// 		// this.openmsg("警告","天气接口获取失败")
				// 	},
				// 	complete: () => {}
				// });
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
				if(this.$data.token == '' || !this.$data.token){
					uni.navigateTo({
					    url: '/pages/index/index'
					});
					return;
				}
				uni.navigateTo({
				    url: '/pages/home/luckDraw'
				});
				
			},
			
			// 兑换中心
			goExchangeBtn(){
				if(this.$data.token == '' || !this.$data.token){
					uni.navigateTo({
					    url: '/pages/index/index'
					});
					return;
				}
				uni.navigateTo({
				    url: '/pages/home/exchange'
				});
			},
			

      }
    }