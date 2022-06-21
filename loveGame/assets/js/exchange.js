


export default{
	data(){
		return{
			// exc_1:exc_1,
			remoteUrl:'',
			
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