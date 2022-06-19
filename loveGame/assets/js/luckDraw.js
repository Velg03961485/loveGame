




export default{
	data(){
		return{
			swiperHeight:'',
			globalUrl:'https://zhanma-hz.oss-cn-hangzhou.aliyuncs.com/static/zhanma/pic/',
			
			menuData:[
				{name:'杭州',id:1},
				{name:'嘉兴',id:2},
				{name:'湖州',id:3},	
			],
			menuIndex:0,
			
			wardResult:false,
			
			// 抽奖
			choujiangView:false,
			prizeIndex:0,
			// 旋转到奖品目标需要的角度
			targetAngle: 90,
			// 旋转动画时间 单位 s
			transitionDuration: 0,
			// 是否正在旋转
			isRotate: false,
			// 当前停留在那个奖品的序号
			stayIndex:0,
			// 当前中奖奖品的序号
			targetIndex: 0,
			ringCount:8,
			duration:8,
			pointerPosition:'edge',
			canChouJiang:true,
			
			// 机会用完
			promptView:false,
			
			
			
			
			token:'',
		}
	},
	computed:{
		canvasAngle() {
			// 根据奖品列表计算 canvas 旋转角度
		  // let prizeCount = this.prizeList.length
		  let prizeCount = 8
		  let prizeClip = 360 / prizeCount
		  let result = 0
		
		  let diffNum = 90 / prizeClip
		  if (this.pointerPosition === 'edge') {
		    result = -(prizeClip * diffNum)
		  } else {
		    result = -(prizeClip * diffNum + prizeClip / 2)
		  }
		  console.log(result)
		  return result
		},
	},
	watch: {
	  // 监听获奖序号的变动
	  prizeIndex(newVal, oldVal) {
	    if (newVal > -1) {
	      this.targetIndex = newVal
	      this.onRotateStart()
	    } else {
	      console.info('旋转结束，prizeIndex 已重置')
	    }
	  }
	},
	onLoad(){
		this.$data.token = uni.getStorageSync('token');
		uni.getSystemInfo({
			success:  (res) => {     // 需要使用箭头函数，swiper 高度才能设置成功
				// 获取swiperHeight可以获取的高度，窗口高度减去导航栏高度
				console.log(res)
				this.swiperHeight = res.screenHeight  + 'px'
				console.log(this.swiperHeight)
			}
		});
		
	},
	onShow(){
		
	},
	methods:{
	
		
		// 开始旋转
		onRotateStart() {
		  // if (this.isRotate) return
		  console.log('执行');
		  this.isRotate = true
		  // 奖品总数
		  // let prizeCount = this.prizeList.length
		  let prizeCount = 8
		  let baseAngle = 360 / prizeCount
		  let angles = 0
		  console.log(this.targetAngle)
		  if (this.targetAngle === 0) {
		    // 第一次旋转
		    // 因为第一个奖品是从0°开始的，即水平向右方向
		    // 第一次旋转角度 = 270度 - (停留的序号-目标序号) * 每个奖品区间角度 - 每个奖品区间角度的一半 - canvas自身旋转的度数
		    angles = (270 - (this.targetIndex - this.stayIndex) * baseAngle - baseAngle / 2) - this.canvasAngle
			console.log(angles)
		  } else {
		    // 后续旋转
		    // 后续继续旋转 就只需要计算停留的位置与目标位置的角度
		    angles = -(this.targetIndex - this.stayIndex) * baseAngle
			console.log(angles)
		  }
		  // 更新目前序号
		  console.log(this.targetIndex)
		  this.stayIndex = this.targetIndex
		  console.log(this.stayIndex)
		  // 转 8 圈，圈数越多，转的越快
		  this.targetAngle += angles + 360 * this.ringCount
		console.log(this.targetAngle)
			this.targetAngle = this.targetAngle - 22.5
		  // 计算转盘结束的时间，预加一些延迟确保转盘停止后触发结束事件
		  console.log(this.transitionDuration)
		  let endTime = this.transitionDuration * 1000 + 100
		  let endTimer = setTimeout(() => {
		    clearTimeout(endTimer)
		    endTimer = null
		
		    this.isRotate = false
		    // this.$emit('draw-end')
		  }, endTime)
		
		  let resetPrizeTimer = setTimeout(() => {
		    clearTimeout(resetPrizeTimer)
		    resetPrizeTimer = null
		
		    // 每次抽奖结束后都要重置父级附件的 
			this.$data.prizeIndex = 0;
			// 如果是再来一次 可以继续抽奖
		    if(this.targetIndex == 6){
				this.$data.canChouJiang = true;
			}else{
				this.$data.choujiangView = false;
				this.$data.canChouJiang = false;
				// this.$data.wardResult = true;
			}
			
		  }, endTime + 50)
		},
		// 点击 开始抽奖 按钮
		handleActionStart() {
			
		  // if(this.$data.canChouJiang === false){
			 //  uni.showToast({
			 //      title: '您的抽奖机会已用完~',
			 //  	icon:'none',
			 //      duration: 3000
			 //  });
			 //  return;
		  // }
		  // this.$data.canChouJiang = false;
		  // 抽到的奖品
		  let _this = this;
		  // _this.targetIndex = parseFloat(res.data.prizeId) - 1;
		  // _this.targetIndex = 3;
		  uniCloud.callFunction({
		      name: 'get_luck_draw',
		      data: { 
		  		token:_this.token
		  	}
		    })
		    .then(res => {
		  		console.log(res)
		  		let Data = res.result.data;
		  		_this.targetIndex = Data;
				console.log(_this.targetIndex)
				_this.onRotateStart();
		  	});
		  
		 
		 
		},
		
		
		
		// 机会用完关闭
		takeCloseProBtn(){
			this.$data.promptView = false;
		},
		
		
		// 实物去添加地址
		goAddAreaBtn(val,prizeName){
			uni.navigateTo({
			    url: '/pages/light/area?prizeId=' + val + '&prizeName=' + prizeName
			});
		},
		// 谢谢惠顾 关闭
		goCloseWardBtn(){
			this.$data.wardResult = false;
		},
		
		
	},
	mounted() {
	  this.$nextTick(() => {
	    let stoTimer = setTimeout(() => {
	      clearTimeout(stoTimer)
	      stoTimer = null
					
					if (this.canvasCached) {
						// this.checkCacheImg()
					} else {
						// this.onCreateCanvas()
					}
	      this.transitionDuration = this.duration
	    }, 50)
	  })
	}
}