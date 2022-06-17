'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let callback = {};
	const dbCmd = db.command;
	// 获取兑换列表
	const collection = db.collection('task_day');
	db.collection('exchange_list')
	.get()
	.then((res)=>{
		// 查询当前对象 兑换的商品
		callback = {
			data:res.data,
			mesg: 'success',
			code: 200,
		};
	})
	
	return callback;
};
