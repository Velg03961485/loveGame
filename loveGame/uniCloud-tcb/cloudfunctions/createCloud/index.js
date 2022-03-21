'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const collection = db.collection('uni-id-users')
	const res = await collection.limit(1).get() // 获取表中的10条数据，结果为json格式
	return res // 返回json给客户端
	
	//返回数据给客户端
	// return event
};
