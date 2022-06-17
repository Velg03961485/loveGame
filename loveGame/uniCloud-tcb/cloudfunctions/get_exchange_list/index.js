'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let callback = {};
	let openId = event.token;
	const dbCmd = db.command;
	// 获取兑换列表
	// const collection = db.collection('task_day');
	db.collection('exchange_list')
	.get()
	.then((res)=>{
		let exchangeList = res.data;
		// 查询当前对象 兑换的商品
		const exchangeUserDB = db.collection('exchange_data_user');
		exchangeDataDB.where({
			openId: dbCmd.eq(openId)
		})
		.get()
		.then((exres)=>{
			if(exres.data.length == 0){
				exchangeUserDB.add({
					openId: openId,
					
				});
				callback = {
					data:exchangeList,
					mesg: 'success',
					code: 200,
				};
			}else{
				let exchangeBackArr = exres.data[0];
				for(let i = 0; i < exchangeList.length; i++){
					exchangeList[i].isExchange = exchangeBackArr[exchangeList[i].keyWord];
				}
			}
		})
		callback = {
			data: exchangeList,
			mesg: 'success',
			code: 200,
		};
	})
	
	return callback;
};
