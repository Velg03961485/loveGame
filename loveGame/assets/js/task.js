

import taskData from "@/pages/task/taskData.json"
import moment from 'moment';
import 'moment/locale/zh-cn';
const throttleFun = require("@/config/throttle.js");
export default{
	data(){
		return{
			moment,
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			listHeight:'',
			
			
			// taskData:taskData,
			taskData:[],
			postTime:'',
			token:'',
		}
	},
	onLoad(){
		// console.log(this.taskData)
		// console.log(this.taskData)
		this.$data.token = uni.getStorageSync('token');
		uni.getSystemInfo({
			success: (res) => { // 需要使用箭头函数，swiper 高度才能设置成功
			console.log(res)
				// 获取swiperHeight可以获取的高度，窗口高度减去导航栏高度
				this.listHeight = res.windowHeight - 150  + 'px'
			}
		});
		console.log(this.moment(new Date).format('Y-MM-DD'))
		this.postTime = this.moment(new Date).format('Y-MM-DD');
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
			if(this.token == '' || !this.token){
				this.taskData = taskData;
			}else{
				uni.showLoading({
					title: '加载中'
				});
				uniCloud.callFunction({
				    name: 'get_task_list',
				    data: { 
						postTime:this.postTime,
						token:this.token,
					}
				  })
				  .then(res => {
						uni.hideLoading();
						console.log(res)
						let Data = res.result.data;
						this.taskData = Data;
					});
			}
			
		},
		
		// 任务完成
		// takeOverBtn(item,index){
			
			
		// },
		
		takeOverBtn:throttleFun.throttle(function(item,index){
			console.log('1')
			if(this.$data.token == '' || !this.$data.token){
				uni.navigateTo({
				    url: '/pages/index/index'
				});
				return;
			}
			if(item.taskIsOver == 1){
				
			}else{
				uniCloud.callFunction({
					name: 'update_task_status',
					data: { 
						taskTime:this.postTime,
						keyWord:item.keyWord,
						id:item._id,
						token:this.token,
					}
				  })
				  .then(res => {
						console.log(res)
						let Data = res.result.data;
						if(res.result.code == 200){
							uni.showToast({
							    title: Data,
								icon:'none',
							});
							setTimeout(()=>{
								this.taskData = [];
								this.getListData();
							},1000)
							
						}
					});
			}
		},3000)
		
	},
}