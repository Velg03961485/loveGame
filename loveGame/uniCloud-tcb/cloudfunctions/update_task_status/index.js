'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	// 获取当前的任务信息 是否要更改任务状态
	// let body = JSON.parse(event);
	let callback = {};
	let task_time = event.taskTime;
	let key_word = event.keyWord;
	let id = event.id;
	const dbCmd = db.command
	const collection = db.collection('task_day');
	let isHasRes = await collection.where({
		task_time: dbCmd.eq(task_time)
	})
	.get();
	console.log(isHasRes)
	let hasResData = isHasRes.data[0];
	console.log(hasResData)
	if(hasResData[key_word] == 0){
		let arr = {};
		arr[key_word] = 1;
		console.log(arr);
		let res = await collection.where({
			task_time: dbCmd.eq(task_time)
		}).update(arr);
		console.log(res);
		callback = {
			data:'操作成功',
			mesg: 'success',
			code: 200,
		};
	}else{
		callback = {
			data:'任务已完成，请勿重复提交',
			mesg: 'error',
			code: 300,
		};
	}
	return callback;
};
