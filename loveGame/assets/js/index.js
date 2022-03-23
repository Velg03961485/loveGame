const jwt = require('jwt-js') //引入jwt-simple中的
console.log(jwt)

export default {
		data() {
			return {
				postInfo:{
					code:'',
				},
			}
		},
		onLoad() {
			// this.getListData();
		},
		onShow() {
			this.codeReload();
		},
		methods: {
			codeReload(){
				wx.login({
					success: res => {
						console.log(res.code)
						// 发送 res.code 到后台换取 openId, sessionKey, unionId
						this.$data.postInfo.code = res.code;
				
				
					},
					fail: res => {
						// 如果用户没有授权获取可以获取信息，这里应该提出警告，并且是不允许进行绑定微信的
						console.log(res)
					}
				})
			},
			
			
			getUserInfoBtn(e){
				var _this=this;		
				if (e.detail.userInfo){	
					this.loading=true
					uni.getSetting({
						success(res1) {    	   
						console.log("res1",res1)
						if (!res1.authSetting['scope.userInfo']) {//未授权getUserInfo            	
							uni.authorize({
							scope: 'scope.getUserInfo',
							success(res2) {	  
								_this.$tool.getTokenValue({
									success:(res)=>{
										// 第一次授权的时候触发
										console.log(res);
									},
									complete:()=>{
										_this.loading=false	
									}
								})
							},
							fail(err){  
								_this.$tool.uniShowToast({
									title: "您拒绝了授权，无法获取小程序信息，请前往授权",
									icon: "none"
								})
								_this.loading=false	
							}
							})
						}else{
							//已授权	---用户第一次授权后的再次登录
							_this.$tool.getTokenValue({
								success:(res)=>{
									console.log(res);
									console.log('开导开导开的课  登录成功')
									
								},
								complete:()=>{
									_this.loading=false	
								}
							})
						}
						}
					})												
				} else {
					_this.$tool.uniShowToast({
						title: "用户拒绝了授权",
						icon: "none"
					})
				}
			},		
						handler(){
							let _this=this
							uni.openSetting({
							  success(res) {
							    console.log(res.authSetting)
								if(res.authSetting['scope.userLocation']){
									
								}
							  }
							})
						},
			
			
			// 登录
			// getUserInfoBtn(e){
			// 	console.log(e);
			// 	if(e.detail.errMsg == "getUserInfo:ok"){
			// 		console.log('授权成功了')
			// 		// uniCloud.callFunction({
			// 		//     name: 'wxLogin',
			// 		//     data: { code: this.$data.postInfo.code }
			// 		//   })
			// 		//   .then(res => {
			// 		// 		console.log(res)
			// 		// 	});
			// 	}
			// },
			
			
			getListData(){
				uniCloud.callFunction({
				    name: 'createCloud',
				    data: { a: 1 }
				  })
				  .then(res => {
						console.log(res)
					});
			},

		}
	}