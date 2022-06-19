'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ', event)
	// console.log(event.postTime)
	let callback = {};
	// 接口传值
	let task_time = event.postTime;
	// 根据传入的时间查询 当天的任务表是否存在
	const dbCmd = db.command
	const collection = db.collection('task_day');
	let isHasRes = await collection.where({
		task_time: dbCmd.eq(task_time)
	})
	.get();
	// console.log(isHasRes)
	const res = await db.collection('task_list').get();
	let taskDayArr = isHasRes.data[0];
	let taskData = res.data;
	// 如果没有查询到数据 则往数据库新增一条当天的默认数据
	if(isHasRes.data.length == 0){
		let res = await collection.add({
			task_time: task_time,
			wash_isover: 0,
			sleep_isover: 0,
			eat_isover: 0,
			facial_isover: 0,
			shovel_isover: 0,
			read_isover: 0,
			ve_juice_isover: 0,
			jump_isover: 0,
		});
		callback = {
			data:taskData,
			mesg: 'success',
			code: 200,
		};
	}else{
		// 如果查询到数据 和 任务列表对比 任务当天的任务是否完成
		for(let i = 0; i < taskData.length; i++){
			taskData[i].taskIsOver = taskDayArr[taskData[i].keyWord];
			taskData[i].taskTime = task_time;
		}
		console.log(taskData)
		callback = {
			data:taskData,
			mesg: 'success',
			code: 200,
		};
	}
	return callback;
};
