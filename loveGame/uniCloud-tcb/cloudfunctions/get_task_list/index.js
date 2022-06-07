'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ', event)
	
	//返回数据给客户端
	// return event
	
	// const db = uniCloud.database(); //代码块为cdb
	const res = await db.collection('task_list').get()
	return res
};
