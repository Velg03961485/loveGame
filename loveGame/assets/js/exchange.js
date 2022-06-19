
import exc_1 from "@/static/exc_1.png";
import exc_2 from "@/static/exc_2.png";
import exc_3 from "@/static/exc_3.png";
import exc_4 from "@/static/exc_4.png";
import exc_5 from "@/static/exc_5.png";
import exchangeData from "@/pages/home/exchangeData.json";

export default{
	data(){
		return{
			exc_1:exc_1,
			imgData:{
				exc_1:exc_1,
				exc_2:exc_2,
				exc_3:exc_3,
				exc_4:exc_4,
				exc_5:exc_5,
			},
			// exchangeData:exchangeData,
			exchangeData:[],
			token:'',
		}
	},
	onLoad(){
		this.$data.token = uni.getStorageSync('token');
		console.log(this.exchangeData);
		this.getListData();
	},
	methods:{
		
		// 获取可兑换列表
		getListData(){
			uniCloud.callFunction({
			    name: 'get_exchange_list',
			    data: { 
					token:this.token
				}
			  })
			  .then(res => {
					console.log(res)
					let Data = res.result.data;
					this.exchangeData = Data;
				});
		},
		
		// 兑换
		takeExchangePost(item,index){
			if(item.isExchange == 1){
				return;
			}
			uniCloud.callFunction({
			    name: 'update_exchange_status',
			    data: { 
					token:this.token,
					keyWord:item.keyWord,
					id:item._id,
				}
			  })
			  .then(res => {
					console.log(res)
					let Data = res.result.data;
					uni.showToast({
					    title: Data,
						icon:'none',
					});
					if(res.result.mesg == 'success'){
						this.getListData();
					}
					// let Data = res.result.data;
					// this.exchangeData = Data;
				});
		},
		
	},
}