'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let callback = {};
	let openId = event.token;
	const dbCmd = db.command;
	// 获取兑换列表
	// const collection = db.collection('task_day');
	let exchangeListaRes =  await db.collection('exchange_list').get()
	let exchangeList = exchangeListaRes.data;
	console.log(exchangeList)
	// 查询当前对象 兑换的商品
	const exchangeUserDB =  db.collection('exchange_data_user');
	let exres = await exchangeUserDB.where({
		openId: dbCmd.eq(openId)
	}).get()
	
	if(exres.data.length == 0){
		let postAdd = await exchangeUserDB.add({
			openId: openId,
			travel:0,
			jewelry:0,
			Bag:0,
			Perfume:0,
			NB:0,
		});
		callback = {
			data:exchangeList,
			mesg: 'success',
			code: 200,
		};
		// return callback;
	}else{
		let exchangeBackArr = exres.data[0];
		console.log(exchangeBackArr)
		for(let i = 0; i < exchangeList.length; i++){
			exchangeList[i].isExchange = exchangeBackArr[exchangeList[i].keyWord];
		}
		callback = {
			data: exchangeList,
			mesg: 'success',
			code: 200,
		};
		// console.log(callback)
		// resolve(callback);
		// return callback;
	}
	// console.log(callback)
	return callback;
};
