


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
						
						this.weatherInfo = {
							todayDate:res.data.data.forecast[0].date,
							todayWe:res.data.data.forecast[0].type,
							temperature:res.data.data.forecast[0].low + '~' + res.data.data.forecast[0].high,
							currentTem:res.data.data.wendu,
							tips:res.data.data.ganmao,
						};
						console.log(this.weatherInfo)
						
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

			// 分享奖励
			goShareBtn(){
				let openId = uni.getStorageSync('openId');
				if(openId === '' || openId === null || openId === undefined){
					// 这时候需要用户重新登录
					uni.reLaunch({
					    url: '/pages/login/login'
					});
					return;
				}
				uni.navigateTo({
				    url: '../my/myShare'
				});
			},
			
			// 地址管理
			address_manage(){
				let openId = uni.getStorageSync('openId');
				if(openId === '' || openId === null || openId === undefined){
					// 这时候需要用户重新登录
					uni.reLaunch({
					    url: '/pages/login/login'
					});
					return;
				}
				uni.navigateTo({
				    url: '../my/myArea'
				});
			},
			
			// 我的套餐卡
			goMyPackCardBtn(){
				let openId = uni.getStorageSync('openId');
				if(openId === '' || openId === null || openId === undefined){
					// 这时候需要用户重新登录
					uni.reLaunch({
					    url: '/pages/login/login'
					});
					return;
				}
				uni.navigateTo({
				    url: '../my/myCombo'
				});
			},
			
			
			// 我的收藏
			goMyCollectBtn(){
				let openId = uni.getStorageSync('openId');
				if(openId === '' || openId === null || openId === undefined){
					// 这时候需要用户重新登录
					uni.reLaunch({
					    url: '/pages/login/login'
					});
					return;
				}
				uni.navigateTo({
				    url: '../my/myCollectBtn'
				});
			},
			
			// 我的云豆
			goMyPacketBtn(){
				let openId = uni.getStorageSync('openId');
				if(openId === '' || openId === null || openId === undefined){
					// 这时候需要用户重新登录
					uni.reLaunch({
					    url: '/pages/login/login'
					});
					return;
				}
				uni.navigateTo({
				    url: '../packet/myPacket'
				});
			},
			
			// 意见反馈
			feedback(){
				let openId = uni.getStorageSync('openId');
				if(openId === '' || openId === null || openId === undefined){
					// 这时候需要用户重新登录
					uni.reLaunch({
					    url: '/pages/login/login'
					});
					return;
				}
				uni.navigateTo({
				    url: '../my/myOpinion'
				});
			},
			
			// 抢芸豆
			packet_manage(){
				let openId = uni.getStorageSync('openId');
				if(openId === '' || openId === null || openId === undefined){
					// 这时候需要用户重新登录
					uni.reLaunch({
					    url: '/pages/login/login'
					});
					return;
				}
				uni.navigateTo({
				    url: '/pages/packet/packet'
				});
			},
			
			
			// 关于我们
			about(){
				let openId = uni.getStorageSync('openId');
				if(openId === '' || openId === null || openId === undefined){
					// 这时候需要用户重新登录
					uni.reLaunch({
					    url: '/pages/login/login'
					});
					return;
				}
				uni.navigateTo({
				    url: '../my/myAbout'
				});
			},
			increaseNoticeTimes(){
				wx.requestSubscribeMessage({
				  tmplIds: ['y3RcreQuXc3WgkT3p97kcLUwGnx025fsV_enOFeQy80','y3RcreQuXc3WgkT3p97kcLUwGnx025fsV_enOFeQy80'],
				  success (res) { }
				})
			},
			
			
			// 去广场页面
			goMissionSquareBtn() {
				uni.reLaunch({
					url: "/pages/community/missionSquare?id=" + this.areaId
				})
			},
			
			
			// 去首页
			goHomepageBtn() {
				uni.reLaunch({
					url: "/pages/community/homePage"
				})
			},

      }
    }