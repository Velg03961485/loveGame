
export default{
    getTokenValue(options) {  //1.获取用户的token
		let {
			success,
			fail,
			complete
		} = options
		var _this = this;
		uni.login({ //获取微信用户的code值
			provider: 'weixin',
			success(r) {
				if (r.code) {
					uni.getUserInfo({ //获取微信用户的encryptedData，iv值
						provider: 'weixin',
						success(res) {		
							let data={
								code: r.code,
								signature: res.signature,
								encrypted_data: res.encryptedData,
								iv: res.iv,
								userInfo:res.userInfo
							}											
							uniCloud.callFunction({
								name: 'ace-login',
								data: data,
							}).then((result) => {
								console.log('微信授权成功',result);
								if(result.result && result.result.status===1){
									uni.setStorageSync('token', result.result.token);
									uni.setStorageSync('userInfo', result.result.userInfo);
									
									typeof success == "function" && success(result.result);
									
								}else{
									_this.uniShowToast({
										title: "用户登陆失败",
										icon: "none"
									})
								}
															
							}).catch((err) => {
								console.log(err);							
							})
												
						},
						fail:(err)=>{
							_this.uniShowToast({
								title: "获取用户信息失败",
								icon: "none"
							})
							complete ? complete() : false
						}
					});
				} else {
					_this.uniShowToast({
						title: "获取微信登录login的code失败！",
						icon: "none"
					})
					complete ? complete() : false
				}
			}
		});
	},
    uniShowToast(options) {  //2.提升框
		let {
			title,
			icon,
			mask,
			duration,
			image
		} = options
		uni.showToast({
			title: title,
			icon: icon ? icon : "success",
			image: image ? image : "",
			mask: mask ? mask : false,
			duration: duration ? duration : 1500,
			complete: () => {
				setInterval(() => {
					uni.hideToast();
				}, 30000)
			}
		});
	},
    isGetLocation(type = "scope.userInfo", success = null, fail = null) {  //3. 判断是否授权
		let _this = this
		uni.getSetting({
			success(res) {			
				if (!res.authSetting[type]) {
					_this.getAuthorizeInfo(type, success, fail)
				} else {
					if(type==='scope.getUserInfo'){
						if(_this.uniGetStorage("token")){
							success ? success() : false
						}else{
							_this.getTokenValue({
								success:()=>{
									success ? success() : false
								}				
							})
						}			
					}else{
						success ? success() : false
					}			
				}
			}
		});
	},
	getAuthorizeInfo(type, success, fail) {  //4. 进行授权
		let _this = this
		uni.authorize({
			scope: type,
			success() {
				if(type==='scope.getUserInfo'){
					if(_this.uniGetStorage("token")){
						success ? success() : false
					}else{
						_this.getTokenValue({
							success:()=>{
								success ? success() : false
							}				
						})
					}			
				}else{
					success ? success() : false
				}	
			},
			fail() {
				if (fail) {
					fail()
				} else {
					_this.uniShowToast({
						title: "你拒绝了授权!",
						icon: "none"
					})
					console.log("你拒绝了授权")
				}
			}
		})
	},
	
}