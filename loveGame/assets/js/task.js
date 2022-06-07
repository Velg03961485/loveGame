

import taskData from "@/pages/task/taskData.json"

export default{
	data(){
		return{
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			listHeight:'',
			
			
			// taskData:taskData,
			taskData:[],
		}
	},
	onLoad(){
		// console.log(this.taskData)
		console.log(this.taskData)
		uni.getSystemInfo({
			success: (res) => { // 需要使用箭头函数，swiper 高度才能设置成功
			console.log(res)
				// 获取swiperHeight可以获取的高度，窗口高度减去导航栏高度
				this.listHeight = res.windowHeight - 150  + 'px'
			}
		});
		this.getListData();
		
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
		},
		
		
		getListData(){
			uniCloud.callFunction({
			    name: 'get_task_list',
			    data: {  }
			  })
			  .then(res => {
					console.log(res)
					let Data = res.result.data;
					this.taskData = Data;
				});
		},
		
		// 任务完成
		takeOverBtn(item,index){
			if(item.taskIsOver == 1){
				
			}else{
				this.taskData[index].taskIsOver = 1;
			}
			
		},
	},
}