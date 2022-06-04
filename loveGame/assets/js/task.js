

export default{
	data(){
		return{
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			listHeight:'',
			
			taskData:[
				{
					taskName:'十点半洗漱',
					taskClass:'IUt-icon-xishu',
					taskScore:'10',
					taskDetail:'当天需要十点半去洗漱，在半小时内完成洗漱，当前任务才算成功，成功后可获得10仙豆',
					taskTime:new Date(),
					taskIsOver:1,
				}
			],
		}
	},
	onload(){
		
		uni.getSystemInfo({
			success: (res) => { // 需要使用箭头函数，swiper 高度才能设置成功
			console.log(res)
				// 获取swiperHeight可以获取的高度，窗口高度减去导航栏高度
				this.listHeight = res.windowHeight - 150  + 'px'
			}
		});
		
	},
	methods:{
		changeIndicatorDots(e) {
			this.indicatorDots = !this.indicatorDots
		},
		changeAutoplay(e) {
			this.autoplay = !this.autoplay
		},
		intervalChange(e) {
			this.interval = e.target.value
		},
		durationChange(e) {
			this.duration = e.target.value
		}
	},
}